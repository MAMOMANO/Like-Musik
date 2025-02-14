document.getElementById("searchBtn").addEventListener("click", function () {
    const query = document.getElementById("searchInput").value;
    searchSong(query);
});

async function searchSong(query) {
    if (!query) {
        alert("Masukkan Judul lagunya terlebih dahulu");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/search?q=${query}`);
        if (!response.ok) {
            throw new Error("Gagal mengambil data dari server");
        }

        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengambil data");
    }
}

let audioPlayers = [];

function displayResults(songs) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";
    audioPlayers = [];

    songs.forEach(song => {
        const songCard = document.createElement("div");
        songCard.classList = "bg-white p-4 rounded-lg shadow-md text-center";

        songCard.innerHTML = `
        <img src="${song.album.cover_medium}" class="w-full rounded-md transform hover:scale-105 transition duration-300">
        <h2 class="text-lg font-semibold mt-2">${song.title}</h2>
        <p class="text-gray-600">${song.artist.name}</p>
        <audio controls class="w-full mt-2">
            <source src="${song.preview}" type="audio/mpeg">
            Browser kamu tidak mendukung audio tag.
        </audio>
        `;

        const audioElement = songCard.querySelector("audio");
        audioElement.addEventListener("play", function () {
            audioPlayers.forEach(audio => {
                if (audio !== audioElement) {
                    audio.pause();
                }
            });
        });

        audioPlayers.push(audioElement);
        resultsContainer.appendChild(songCard);
    });
}


// document.getElementById("searchBtn").addEventListener("click", function () {
//     const query = document.getElementById("searchInput").value;
//     searchSong(query);
// });

// // Array untuk menyimpan elemen audio agar hanya satu lagu yang bisa dimainkan dalam satu waktu
// let audioPlayers = [];

// // 🔹 Fungsi untuk mencari lagu berdasarkan input pengguna
// async function searchSong(query) {
//     if (!query) {
//         alert("Masukkan judul lagunya terlebih dahulu!");
//         return;
//     }

//     try {
//         const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
//             method: "GET",
//             headers: {
//                 "X-RapidAPI-Key": "ceb7885ea4mshdcfd3eceeeb410cp1658c3jsndbd98e6f70df",
//                 "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
//             }
//         });

//         if (!response.ok) {
//             throw new Error("Gagal mengambil data dari API");
//         }

//         const data = await response.json();
//         displaySongs(data.data, "results"); // Menampilkan hasil pencarian
//     } catch (error) {
//         console.error("Error:", error);
//         alert("Terjadi kesalahan saat mengambil data.");
//     }
// }

// // 🔹 Fungsi untuk menampilkan rekomendasi lagu saat halaman dimuat
// async function loadRecommendations() {
//     const query = "Alan Walker"; // Bisa diganti dengan genre atau kategori tertentu

//     try {
//         const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
//             method: "GET",
//             headers: {
//                 "X-RapidAPI-Key": "ceb7885ea4mshdcfd3eceeeb410cp1658c3jsndbd98e6f70df",
//                 "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
//             }
//         });

//         if (!response.ok) {
//             throw new Error("Gagal mengambil rekomendasi lagu.");
//         }

//         const data = await response.json();
//         displaySongs(data.data, "recommendations"); // Menampilkan rekomendasi lagu
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// // 🔹 Fungsi utama untuk menampilkan lagu (baik pencarian maupun rekomendasi)
// function displaySongs(songs, containerId) {
//     const container = document.getElementById(containerId);
//     container.innerHTML = "";

//     audioPlayers = []; // Reset daftar audio saat memuat ulang

//     songs.forEach(song => {
//         const songCard = document.createElement("div");
//         songCard.classList = "bg-white p-4 rounded-lg shadow-md text-center";

//         songCard.innerHTML = `
//             <img src="${song.album.cover_medium}" class="w-full rounded-md transform hover:scale-105 transition duration-300">
//             <h2 class="text-lg font-semibold mt-2">${song.title}</h2>
//             <p class="text-gray-600">${song.artist.name}</p>
//             <audio controls class="w-full mt-2">
//                 <source src="${song.preview}" type="audio/mpeg">
//                 Browser kamu tidak mendukung audio tag.
//             </audio>
//         `;

//         const audioElement = songCard.querySelector("audio");

//         // Event listener untuk menghentikan audio lain saat satu lagu diputar
//         audioElement.addEventListener("play", function () {
//             audioPlayers.forEach(audio => {
//                 if (audio !== audioElement) {
//                     audio.pause();
//                 }
//             });
//         });

//         audioPlayers.push(audioElement);
//         container.appendChild(songCard);
//     });
// }

// // 🔹 Memuat rekomendasi lagu saat halaman dimuat
// document.addEventListener("DOMContentLoaded", loadRecommendations);
