// Data jadwal
const jadwalData = {
  senin: {
    ruang: "Ruang 2",
    jadwal: [
      { mapel: "Matematika", jam: "07.00 - 08.30" },
      { mapel: "Bahasa Indonesia", jam: "08.30 - 10.00" },
      { mapel: "Istirahat", jam: "10.00 - 10.15" },
      { mapel: "Pemrograman Web", jam: "10.15 - 11.45" },
      { mapel: "Basis Data", jam: "12.15 - 13.45" }
    ]
  },
  selasa: {
    ruang: "Ruang 1",
    jadwal: [
      { mapel: "Bahasa Inggris", jam: "07.00 - 08.30" },
      { mapel: "Pemrograman Dasar", jam: "08.30 - 10.00" },
      { mapel: "Istirahat", jam: "10.00 - 10.15" },
      { mapel: "Sistem Operasi", jam: "10.15 - 11.45" },
      { mapel: "Jaringan Komputer", jam: "12.15 - 13.45" }
    ]
  },
  rabu: {
    ruang: "Ruang 3",
    jadwal: [
      { mapel: "PKN", jam: "07.00 - 08.30" },
      { mapel: "Pemrograman Berorientasi Objek", jam: "08.30 - 10.00" },
      { mapel: "Istirahat", jam: "10.00 - 10.15" },
      { mapel: "Design Grafis", jam: "10.15 - 11.45" },
      { mapel: "Multimedia", jam: "12.15 - 13.45" }
    ]
  },
  kamis: {
    ruang: "Lab Komputer",
    jadwal: [
      { mapel: "Agama", jam: "07.00 - 08.30" },
      { mapel: "Pemrograman Mobile", jam: "08.30 - 10.00" },
      { mapel: "Istirahat", jam: "10.00 - 10.15" },
      { mapel: "Struktur Data", jam: "10.15 - 11.45" },
      { mapel: "Algoritma", jam: "12.15 - 13.45" }
    ]
  },
  jumat: {
    ruang: "Aula",
    jadwal: [
      { mapel: "Olahraga", jam: "07.00 - 08.30" },
      { mapel: "Seni Budaya", jam: "08.30 - 10.00" },
      { mapel: "Istirahat", jam: "10.00 - 10.15" },
      { mapel: "Prakerin", jam: "10.15 - 11.45" }
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
