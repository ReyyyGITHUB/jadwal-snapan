// Data jadwal
const jadwalData = {
  senin: {
    ruang: "R Kelas 4",
    jadwal: [
      { mapel: "Pendidikan Agama", jam: "08.30 - 10.00", guru: "Miftahul Maf'ulah, S.Ag" },
      { mapel: "Bahasa Indonesia", jam: "10.15 - 11.45", guru: "Ever Nicolas, S.Pd" },
      { mapel: "Istirahat", jam: "12.00 - 12.15" },
      { mapel: "Bahasa Inggris", jam: "12.15 - 13.45", guru: "Kalim, S.Pd" },
      { mapel: "Pendidikan Olahraga", jam: "14.00 - 15.30", guru: "Dani Eko Prasetiyo, S.Pd" }
    ]
  },
  selasa: {
    ruang: "Lab PPLG 3",
    jadwal: [
      { mapel: "Informatika", jam: "08.30 - 10.00", guru: "Andreas Aris Suhartono, S.T" },
      { mapel: "Istirahat", jam: "10.00 - 10.15" },
      { mapel: "Pemrograman Dasar", jam: "10.15 - 11.45", guru: "Agung Setiawan, S.Kom" },
      { mapel: "Istirahat", jam: "12.00 - 12.15" },
      { mapel: "Pemrograman Dasar", jam: "14.00 - 15.30", guru: "Yari Imantis Abdillah, S.Pd" }
    ]
  },
  rabu: {
    ruang: "R Kelas 12",
    jadwal: [
      { mapel: "Bahasa Inggris", jam: "07.00 - 08.30", guru: "Kalim, S.Pd" },
      { mapel: "Matematika", jam: "08.30 - 10.00", guru: "Chofiriyah, S.Pd, M.Pd" },
      { mapel: "Istirahat", jam: "10.00 - 10.15" },
      { mapel: "Projek Penguatan Profil Pelajar Pancasila", jam: "10.15 - 11.45", guru: "Sri Astuti Setiani, S.Pd" },
      { mapel: "Seni Musik", jam: "12.15 - 13.45", guru: "Elin Surya Shabrina, S.Pd" },
      { mapel: "Sejarah", jam: "14.00 - 15.30", guru: "Sri Astuti Setiani, S.Pd" }
    ]
  },
  kamis: {
    ruang: "R Kelas 11",
    jadwal: [
      { mapel: "Matematika", jam: "07.00 - 08.30", guru: "Chofiriyah, S.Pd, M.Pd" },
      { mapel: "IPAS", jam: "10.15 - 11.45", guru: "Uly Fitrisia Ghani, S.Pd" },
      { mapel: "Istirahat", jam: "12.00 - 12.15" },
      { mapel: "Bahasa Jawa", jam: "12.15 - 13.45", guru: "Fanatut Khikmatil, S.Pd" },
      { mapel: "Bahasa Indonesia", jam: "14.00 - 15.30", guru: "Ever Nicolas, S.Pd" }
    ]
  },
  jumat: {
    ruang: "Lab PPLG 4",
    jadwal: [
      { mapel: "IPAS", jam: "07.00 - 08.30", guru: "Uly Fitrisia Ghani, S.Pd" },
      { mapel: "Pengembangan Game", jam: "08.30 - 10.00", guru: "Ahmad Zafir Hasmi, S.Pd" },
      { mapel: "Istirahat", jam: "10.00 - 10.15" },
      { mapel: "Komputer dan Komunikasi dalam Jaringan", jam: "10.15 - 11.45", guru: "Ahmad Zafir Hasmi, S.Pd" },
      { mapel: "Pemrograman Dasar", jam: "12.15 - 13.45", guru: "Agung Setiawan, S.Kom" }
    ]
  }
};
// DOM Elements
const checkJadwalBtn = document.getElementById('checkJadwalBtn');
const dropdown = document.getElementById('dropdown');
const chevron = document.getElementById('chevron');
const overlay = document.getElementById('overlay');
const jadwalModal = document.getElementById('jadwalModal');
const selectedDayElement = document.getElementById('selectedDay');
const selectedRoomElement = document.getElementById('selectedRoom');
const jadwalContainer = document.getElementById('jadwalContainer');
const closeModal = document.getElementById('closeModal');
const dayBtns = document.querySelectorAll('.day-btn');

// State
let isDropdownOpen = false;

// Event Listeners
checkJadwalBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target) && !checkJadwalBtn.contains(e.target)) {
    closeDropdown();
  }
});

dayBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedDay = btn.getAttribute('data-day');
    showJadwal(selectedDay);
    closeDropdown();
  });
});

closeModal.addEventListener('click', closeModalFunction);
overlay.addEventListener('click', closeModalFunction);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModalFunction();
  }
});

// Functions
function toggleDropdown() {
  isDropdownOpen = !isDropdownOpen;
  
  if (isDropdownOpen) {
    dropdown.classList.add('show');
    chevron.style.transform = 'rotate(180deg)';
  } else {
    dropdown.classList.remove('show');
    chevron.style.transform = 'rotate(0deg)';
  }
}

function closeDropdown() {
  isDropdownOpen = false;
  dropdown.classList.remove('show');
  chevron.style.transform = 'rotate(0deg)';
}

function openModal() {
  overlay.classList.add('show');
  jadwalModal.classList.add('show');
  document.body.classList.add('modal-open');
  
  // Small delay for smooth animation
  setTimeout(() => {
    const modalContent = jadwalModal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(1)';
  }, 10);
}

function closeModalFunction() {
  overlay.classList.remove('show');
  jadwalModal.classList.remove('show');
  document.body.classList.remove('modal-open');
  
  const modalContent = jadwalModal.querySelector('.modal-content');
  modalContent.style.transform = 'scale(0.95)';
}

function showJadwal(day) {
  const jadwalInfo = jadwalData[day];
  const jadwal = jadwalInfo.jadwal;
  const ruang = jadwalInfo.ruang;
  
  // Update modal header info
  selectedDayElement.textContent = `${day.charAt(0).toUpperCase() + day.slice(1)}`;
  selectedRoomElement.textContent = ruang;
  
  // Clear previous jadwal
  jadwalContainer.innerHTML = '';
  
  // Create jadwal items
  jadwal.forEach(item => {
    const jadwalItem = document.createElement('div');
    jadwalItem.className = 'jadwal-item';
    
    // Add special styling for istirahat
    if (item.mapel.toLowerCase() === 'istirahat') {
      jadwalItem.classList.add('istirahat');
    }
    
    jadwalItem.innerHTML = `
      <div class="jadwal-mapel">${item.mapel}</div>
      <div class="jadwal-jam">Jam pelajaran: ${item.jam}</div>
    `;
    
    jadwalContainer.appendChild(jadwalItem);
  });
  
  // Open modal
  openModal();
}

