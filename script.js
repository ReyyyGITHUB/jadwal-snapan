// Data jadwal pelajaran untuk setiap hari
const jadwalData = {
    senin: [
        { time: "07:00 - 10:00", subject: "INFORMATIKA" },
        { time: "10:15 - 11:45", subject: "PPLG" },
        { time: "11:45 - 13:00", subject: "PPLG" }
    ],
    selasa: [
        { time: "07:00 - 08:30", subject: "IPAS" },
        { time: "08:30 - 10:00", subject: "B. INDONESIA" },
        { time: "10:15 - 11:45", subject: "B. JAWA" },
        { time: "11:45 - 13:00", subject: "PENDIDIKAN OLAHRAGA" }
    ],
    rabu: [
        { time: "07:00 - 08:30", subject: "MATEMATIKA" },
        { time: "08:30 - 10:00", subject: "B. INGGRIS" },
        { time: "10:15 - 11:45", subject: "GIM" },
        { time: "11:45 - 13:00", subject: "PPLG" }
    ],
    kamis: [
        { time: "07:00 - 08:30", subject: "SENI MUSIK" },
        { time: "08:30 - 10:00", subject: "PPKN" },
        { time: "10:15 - 11:45", subject: "B. INGGRIS" },
        { time: "11:45 - 13:00", subject: "MATEMATIKA" },
        { time: "13:00 - 14:30", subject: "IPAS" }
    ],
    jumat: [
        { time: "07:00 - 08:30", subject: "AGAMA ISLAM" },
        { time: "08:30 - 10:00", subject: "B. JAWA" },
        { time: "10:15 - 11:45", subject: "IPAS" },
        { time: "11:45 - 13:00", subject: "SEJARAH" }
    ]
};

// Nama hari dalam bahasa Indonesia
const namaHari = {
    senin: "Senin",
    selasa: "Selasa",
    rabu: "Rabu",
    kamis: "Kamis",
    jumat: "Jumat"
};

// DOM Elements
const daySelect = document.getElementById('daySelect');
const checkButton = document.getElementById('checkButton');
const resultContainer = document.getElementById('result');

// Fungsi untuk mendapatkan hari saat ini
function getCurrentDay() {
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const today = new Date().getDay();
    return days[today];
}

// Fungsi untuk menampilkan jadwal - INSTANT
function displaySchedule(day) {
    if (!day) {
        showError("Silakan pilih hari terlebih dahulu!");
        return;
    }

    const schedule = jadwalData[day];
    if (!schedule) {
        showError(`Jadwal untuk hari ${namaHari[day]} tidak ditemukan!`);
        return;
    }

    // Buat HTML untuk jadwal - no animation delays
    let scheduleHTML = `<h3>Jadwal ${namaHari[day]}</h3>`;
    
    schedule.forEach((item) => {
        scheduleHTML += `
            <div class="schedule-item">
                <div class="time">${item.time}</div>
                <div class="subject">${item.subject}</div>
            </div>
        `;
    });

    // Tampilkan hasil instantly
    resultContainer.innerHTML = scheduleHTML;
    resultContainer.classList.remove('hidden');
}

// Fungsi untuk menampilkan error - INSTANT
function showError(message) {
    resultContainer.innerHTML = `
        <div style="text-align: center; color: #e74c3c; font-weight: 500;">
            <p>${message}</p>
        </div>
    `;
    resultContainer.classList.remove('hidden');
}

// Removed animation functions - INSTANT DISPLAY

// Event listener untuk tombol check - INSTANT
checkButton.addEventListener('click', () => {
    const selectedDay = daySelect.value;
    displaySchedule(selectedDay);
});

// Event listener untuk perubahan pilihan hari - INSTANT
daySelect.addEventListener('change', () => {
    resultContainer.classList.add('hidden');
    resultContainer.innerHTML = '';
});

// Event listener untuk keyboard navigation
daySelect.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkButton.click();
    }
});

// Auto-select hari ini saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    const currentDay = getCurrentDay();
    
    // Jika hari ini adalah hari sekolah, auto-select
    if (jadwalData[currentDay]) {
        daySelect.value = currentDay;
        
        // Tampilkan notifikasi instantly
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #7D938A;
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 14px;
                box-shadow: 0 4px 15px rgba(125, 147, 138, 0.3);
                z-index: 1000;
            `;
            notification.textContent = `Hari ini: ${namaHari[currentDay]}`;
            
            document.body.appendChild(notification);
            
            // Hapus notifikasi setelah 2 detik
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 2000);
        }, 500);
    }
});

// Removed notification animations for speed

// Fungsi untuk mendapatkan jadwal hari berikutnya
function getNextDaySchedule() {
    const currentDay = getCurrentDay();
    const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
    const currentIndex = days.indexOf(currentDay);
    
    if (currentIndex === -1 || currentIndex === 4) {
        return 'senin'; // Jika weekend atau Jumat, return Senin
    }
    
    return days[currentIndex + 1];
}

// Tambahkan fitur shortcut keyboard
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + 1-5 untuk pilih hari
    if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '5') {
        e.preventDefault();
        const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
        const dayIndex = parseInt(e.key) - 1;
        daySelect.value = days[dayIndex];
        checkButton.click();
    }
    
    // Enter untuk submit
    if (e.key === 'Enter' && document.activeElement !== daySelect) {
        checkButton.click();
    }
    
    // Escape untuk reset - INSTANT
    if (e.key === 'Escape') {
        daySelect.value = '';
        resultContainer.classList.add('hidden');
        resultContainer.innerHTML = '';
    }
});

// Console log untuk developer
console.log(`
🎓 Website Jadwal Pelajaran X PPLG 2
📚 Shortcut Keyboard:
   • Ctrl/Cmd + 1-5: Pilih hari (Senin-Jumat)
   • Enter: Lihat jadwal
   • Escape: Reset pilihan

📅 Data jadwal tersedia untuk:
${Object.keys(namaHari).map(day => `   • ${namaHari[day]}`).join('\n')}
`);
