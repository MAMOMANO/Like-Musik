require("dotenv").config();
const express = require("express");
// const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(__dirname + "/src"));

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = "deezerdevs-deezer.p.rapidapi.com";

// Route utama
app.get("/", (req, res) => {
  //   res.send("Server API berjalan. Gunakan endpoint '/search?q=judul_lagu' untuk mencari lagu.");
  res.sendFile(__dirname + "/index.html");
});

// Route pencarian lagu
app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Masukkan judul lagu!" });

  try {
    const response = await fetch(`https://${API_HOST}/search?q=${query}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();

      console.log("Status API:", response.status);
      console.log("Pesan API:", errorData);

      throw new Error("Gagal mengambil data dari API");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error API:", error);

    res.status(500).json({ error: "Gagal mengambil data dari API!" });
  }
});

app.listen(3000, () =>
  console.log("✅ Server berjalan di http://localhost:3000"),
);
