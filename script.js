// Data jadwal (menggantikan file jadwal.txt)
const jadwalData = {
    senin: `07:00-10:00 - INFORMATIKA
10:15-11:45 - PPLG
11:45-13:00 - PPLG`,

    selasa: `07:00-08:30 - IPAS
08:30-10:00 - BINDO
10:15-11:45 - BJWA
11:45-13:00 - POR`,

    rabu: `07:00-08:30 - MTK
08:30-10:00 - BNG
10:15-11:45 - GIM
11:45-13:00 - PPLG`,

    kamis: `07:00-08:30 - SNM
08:30-10:00 - PPS
10:15-11:45 - BNG
11:45-13:00 - MTK
13:00-14:30 - IPAS`,

    jumat: `07:00-08:30 - PAG
08:30-10:00 - BJW
10:15-11:45 - IPAS
11:45-13:00 - SJR`
};

// Ambil elemen DOM
const daySelect = document.getElementById('daySelect');
const checkButton = document.getElementById('checkButton');
const resultArea = document.getElementById('result');

// Fungsi untuk mendapatkan jadwal
function getJadwal() {
    const selectedDay = daySelect.value;
    
    if (!selectedDay) {
        showResult("Silakan pilih hari dulu!");
        return;
    }
    
    if (jadwalData[selectedDay]) {
        const dayName = selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1);
        showResult(`Jadwal ${dayName}:\n\n${jadwalData[selectedDay]}`);
    } else {
        showResult(`Jadwal ${selectedDay} tidak ditemukan!`);
    }
}

// Fungsi untuk menampilkan hasil
function showResult(text) {
    resultArea.textContent = text;
    resultArea.style.display = 'block';
    
    // Animasi muncul
    setTimeout(() => {
        resultArea.classList.add('show');
    }, 10);
}

// Event listeners
checkButton.addEventListener('click', getJadwal);

// Event listener untuk Enter key pada select
daySelect.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getJadwal();
    }
});

// Reset animasi ketika pilihan berubah
daySelect.addEventListener('change', () => {
    resultArea.classList.remove('show');
    setTimeout(() => {
        resultArea.style.display = 'none';
        resultArea.textContent = '';
    }, 300);
});