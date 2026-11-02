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
        // const response = await fetch(`http://localhost:3000/search?q=${query}`);
        const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
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

