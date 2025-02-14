require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = "deezerdevs-deezer.p.rapidapi.com"; // Sesuaikan jika ada perubahan

// Route utama
app.get('/', (req, res) => {
    res.send("Server API berjalan. Gunakan endpoint '/search?q=judul_lagu' untuk mencari lagu.");
});

// Route pencarian lagu
app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Masukkan judul lagu!" });

    try {
        const response = await fetch(`https://${API_HOST}/search?q=${query}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": API_HOST
            }
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil data dari API");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data dari API!" });
    }
});

app.listen(3000, () => console.log('✅ Server berjalan di http://localhost:3000'));
