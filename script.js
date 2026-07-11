// ==========================================
// DATA CERITA
// ==========================================

// FASE 1: Prolog (Kehancuran)
const prologStory = [
  {
    name: "Narator",
    text: "Tahun 2026. Era di mana manusia lebih memilih menatap layar gawai mereka...",
    bg: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1000",
    effect: "anim-dystopia",
  },
  {
    name: "Narator",
    text: "Media sosial perlahan menyedot warna dan ingatan dari dunia nyata. Budaya kita dilupakan.",
    bg: "https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=1000",
    effect: "anim-fade", // Animasi luntur jadi abu-abu
  },
];

// FASE 3: Ajakan (Akan dipanggil setelah bikin karakter)
// Kita pakai {NAMA} dan {SUKU} sebagai teks dinamis yang akan diganti otomatis
const actionStory = [
  {
    name: "Roh Penjaga",
    text: "Syukurlah kamu datang, pahlawan {NAMA} dari keturunan {SUKU}!",
    bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000",
    effect: "anim-magic",
  },
  {
    name: "Roh Penjaga",
    text: "Monster kelabu sedang memakan sisa-sisa artefak kita. Arahkan kameramu sekarang, dan hancurkan mereka!",
    bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000",
    effect: "anim-magic",
  },
];

// VARIABEL GLOBAL
let currentStep = 0;
let isTyping = false;
let activeStory = prologStory; // Mulai dari prolog
let playerData = { nama: "", suku: "" };

const storyText = document.getElementById("story-text");
const nextBtn = document.getElementById("next-btn");
const dialogBox = document.getElementById("dialog-box");
const bgElement = document.getElementById("story-bg");
const dialogName = document.getElementById("dialog-name");
const regContainer = document.getElementById("reg-container");
const uiLayer = document.getElementById("game-ui-layer");

// Efek Mesin Ketik
function typeWriter(text, i, callback) {
  if (i < text.length) {
    storyText.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1, callback), 40);
  } else {
    callback();
  }
}

// Menjalankan Cerita
function showStory() {
  isTyping = true;
  storyText.innerHTML = "";
  nextBtn.style.display = "none";

  // Ganti kata {NAMA} dan {SUKU} dengan data pemain
  let rawText = activeStory[currentStep].text;
  rawText = rawText.replace("{NAMA}", playerData.nama);
  rawText = rawText.replace("{SUKU}", playerData.suku);

  dialogName.innerText = activeStory[currentStep].name;
  bgElement.style.backgroundImage = `url('${activeStory[currentStep].bg}')`;
  bgElement.className = activeStory[currentStep].effect;

  typeWriter(rawText, 0, () => {
    isTyping = false;
    nextBtn.style.display = "block";
  });
}

// Tombol Lanjut Cerita
nextBtn.addEventListener("click", () => {
  if (isTyping) return;
  currentStep++;

  if (currentStep < activeStory.length) {
    showStory();
  } else {
    // Cek ini akhir dari Prolog atau akhir dari Action?
    if (activeStory === prologStory) {
      // Selesai Prolog -> Buka Layar Pemilihan Karakter
      dialogBox.style.display = "none";
      regContainer.style.display = "block";
    } else {
      // Selesai Action -> Masuk Kamera AR
      uiLayer.style.opacity = "0";
      setTimeout(() => (uiLayer.style.display = "none"), 1500);
    }
  }
});

// Mulai Game (Jalankan Prolog)
showStory();

// ==========================================
// LOGIKA PEMILIHAN KARAKTER (FASE 2)
// ==========================================
const charCards = document.querySelectorAll(".char-card");

charCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Hapus class selected dari semua kartu
    charCards.forEach((c) => c.classList.remove("selected"));
    // Tambahkan ke yang diklik
    card.classList.add("selected");
    playerData.suku = card.getAttribute("data-suku");
  });
});

function konfirmasiKarakter() {
  const inputNama = document.getElementById("player-name").value;
  if (inputNama === "" || playerData.suku === "") {
    alert("Isi namamu dan pilih salah satu asal sukamu!");
    return;
  }

  playerData.nama = inputNama;

  // Tutup Layar Karakter, Buka Cerita Ajakan (Action)
  regContainer.style.display = "none";
  dialogBox.style.display = "block";

  // Ganti data cerita ke fase Action
  activeStory = actionStory;
  currentStep = 0;
  showStory();
}

// ==========================================
// LOGIKA GAMEPLAY AR & KUIS
// ==========================================
const artefak = document.querySelector("#artefak");
const monster = document.querySelector("#monster");
const quizContainer = document.querySelector("#quiz-container");

artefak.addEventListener("click", () => {
  quizContainer.style.display = "block";
});

function jawabKuis(isBenar) {
  quizContainer.style.display = "none";
  if (isBenar) {
    alert(`BENAR! Serangan khas ${playerData.suku} diluncurkan!`);
    monster.setAttribute("scale", "0.4 0.4 0.4");
    monster.setAttribute("color", "#2ecc71");
  } else {
    alert("SALAH! Monster masih menyerang!");
  }
}
