import React, { useState } from "react";
import axios from "axios";

const GifSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);

  const API_KEY = "81A5C66hFteX2IbgfxrWUAFWYzSv9BFU"; // Thay bằng API key của bạn
  const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=10&q=`;

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await axios.get(`${API_URL}${searchTerm}`);
      setGifs(response.data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Search GIFs</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter keyword..."
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} style={{ margin: "5px", width: "150px" }} />
        ))}
      </div>
    </div>
  );
};

export default GifSearch;
