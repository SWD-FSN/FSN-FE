const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { Sequelize } = require("sequelize");

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Notification = sequelize.define("Notification", {
  sender: Sequelize.STRING,
  recipient: Sequelize.STRING,
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  type: Sequelize.STRING,
  postId: Sequelize.STRING,
});

const userSockets = new Map();

io.on("connection", (socket) => {
  socket.on("register", (data) => {
    const { username } = data;
    userSockets.set(username, socket.id);
    console.log(`User ${username} registered with socket ${socket.id}`);
  });

  socket.on("notification", async (data) => {
    try {
      const notification = await Notification.create({
        sender: data.sender,
        recipient: data.recipient,
        title: data.title,
        body: data.body,
        type: data.type,
        postId: data.postId,
      });

      const recipientSocketId = userSockets.get(data.recipient);

      if (recipientSocketId) {
        io.to(recipientSocketId).emit("notification", {
          id: notification.id,
          sender: data.sender,
          title: data.title,
          body: data.body,
          type: data.type,
          timestamp: new Date(),
          postId: data.postId,
        });
      }
    } catch (error) {
      console.error("Error handling notification:", error);
    }
  });

  socket.on("disconnect", () => {
    for (const [username, socketId] of userSockets.entries()) {
      if (socketId === socket.id) {
        userSockets.delete(username);
        break;
      }
    }
    console.log("❌ Client disconnected:", socket.id);
  });
});

app.get("/notifications/:username", async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        recipient: req.params.username,
        read: false,
      },
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/notifications/:id/read", async (req, res) => {
  try {
    await Notification.update({ read: true }, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/notifications/unread-count/:username", async (req, res) => {
  try {
    const count = await Notification.count({
      where: {
        recipient: req.params.username,
        read: false,
      },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.sync();
    console.log("Database synced");

    httpServer.listen(PORT, () => {
    });
  } catch (error) {
  }
}

startServer();
