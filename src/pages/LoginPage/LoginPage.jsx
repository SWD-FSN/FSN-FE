import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import BlurText from "../../blocks/TextAnimations/BlurText/BlurText";
import GradientText from "../../blocks/TextAnimations/GradientText/GradientText";
import Iridescence from "../../blocks/Backgrounds/Iridescence/Iridescence.jsx";
import FsocialLogo from "../../assets/images/f_social.jpg";

import BackgroundImage from "../../assets/images/login_picture.jpg"; // Import your local image
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Paper,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { object } from "yup";


const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Đăng nhập thành công:", result.user);
      navigate("/home");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      console.log("Login success:", result.access_token);
      toast.success("Login successful!");
      const decodedToken = jwtDecode(result.access_token);
      const userinfor = {
        email: decodedToken.email,
        role: decodedToken.role,
        user_id: decodedToken.user_id,
      }
      localStorage.setItem("userInfo", JSON.stringify(userinfor));



      console.log("Decoded token:", decodedToken.email);
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login failed!");
    }
  };


  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        component={Paper}
        elevation={6}
        square
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <IconButton
          sx={{ alignSelf: "flex-end" }}
          onClick={() => navigate("/")}
        >
          <IoMdClose size={24} />
        </IconButton>
        <img
          src={FsocialLogo}
          alt="Fsocial Logo"
          style={{ width: "100px", marginBottom: "20px" }}
        />
        <Typography component="h1" variant="h5">
          Hello!
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%", maxWidth: "400px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="register" variant="body2">
              Register Account
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 2,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FcGoogle />}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          p: 4,
          overflow: "hidden",
        }}
      >
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <BlurText
            text="Welcome to F-Social Network"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-4xl mb-8"
            style={{ color: "black", fontWeight: "bold" }} // Set text color to black and bold
          />
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class text-2xl"
          >
            This is a Social Networking Platform for Students
            <br />
            Organized by the Group 7 - SWD392 of Mr. CHIENNV
          </GradientText>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
