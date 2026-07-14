const prologStory = [
  {
    name: "Narator",
    text: "Tahun 2026. Era di mana manusia lebih memilih menunduk menatap layar gawai mereka...",
    bg: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1000",
    effect: "anim-dystopia",
  },
  {
    name: "Narator",
    text: "Glitch Kelabu mulai merayap, menyedot warna dari Nusantara...",
    bg: "https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=1000",
    effect: "anim-fade",
  },
];

const actionStory = [
  {
    name: "Roh Penjaga",
    text: "Akhirnya... pahlawan {NAMA} dari keturunan {SUKU}!",
    bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000",
    effect: "anim-magic",
  },
  {
    name: "Roh Penjaga",
    text: "Arahkan kameramu, sentuh artefak itu, dan hancurkan monsternya!",
    bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000",
    effect: "anim-magic",
  },
];

let currentStep = 0;
let isTyping = false;
let activeStory = prologStory;
let playerData = { nama: "", suku: "" };

const storyText = document.getElementById("story-text");
const nextBtn = document.getElementById("next-btn");
const dialogBox = document.getElementById("dialog-box");
const bgElement = document.getElementById("story-bg");
const dialogName = document.getElementById("dialog-name");
const regContainer = document.getElementById("reg-container");

function typeWriter(text, i, callback) {
  if (i < text.length) {
    storyText.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1, callback), 40);
  } else {
    callback();
  }
}

function showStory() {
  isTyping = true;
  storyText.innerHTML = "";
  nextBtn.style.display = "none";
  let rawText = activeStory[currentStep].text
    .replace("{NAMA}", playerData.nama)
    .replace("{SUKU}", playerData.suku);
  dialogName.innerText = activeStory[currentStep].name;
  bgElement.style.backgroundImage = `url('${activeStory[currentStep].bg}')`;
  bgElement.className = activeStory[currentStep].effect;
  typeWriter(rawText, 0, () => {
    isTyping = false;
    nextBtn.style.display = "block";
  });
}

nextBtn.addEventListener("click", () => {
  if (isTyping) return;
  currentStep++;
  if (currentStep < activeStory.length) {
    showStory();
  } else {
    if (activeStory === prologStory) {
      dialogBox.style.display = "none";
      regContainer.style.display = "block";
    } else {
      // INI KODE UNTUK PINDAH KE HALAMAN KAMERA AR
      document.body.style.opacity = "0"; // Efek transisi gelap
      setTimeout(() => {
        window.location.href = "ar.html";
      }, 1000);
    }
  }
});

showStory();

const charCards = document.querySelectorAll(".char-card");
charCards.forEach((card) => {
  card.addEventListener("click", () => {
    charCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    playerData.suku = card.getAttribute("data-suku");
  });
});

function konfirmasiKarakter() {
  const inputNama = document.getElementById("player-name").value;
  if (inputNama === "" || playerData.suku === "") {
    alert("Isi namamu dan pilih sukumu!");
    return;
  }
  playerData.nama = inputNama;
  regContainer.style.display = "none";
  dialogBox.style.display = "block";
  activeStory = actionStory;
  currentStep = 0;
  showStory();
}
