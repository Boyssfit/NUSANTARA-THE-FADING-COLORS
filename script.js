// --- LOGIKA CERITA ---
const storySteps = [
  "Tahun 2026. Warna Nusantara memudar...",
  "Generasi kita lupa akan jati diri.",
  "Kamu terpilih untuk memulihkan warna itu.",
  "Siapkan kameramu, portal akan segera terbuka!",
];

let currentStep = 0;
const storyText = document.getElementById("story-text");
const nextBtn = document.getElementById("next-btn");
const overlay = document.getElementById("story-overlay");

nextBtn.addEventListener("click", () => {
  if (currentStep < storySteps.length - 1) {
    currentStep++;
    storyText.innerText = storySteps[currentStep];
  } else {
    overlay.style.opacity = "0"; // Fade out cerita
    setTimeout(() => (overlay.style.display = "none"), 500);
  }
});

// --- LOGIKA GAME AR ---
const artefak = document.querySelector("#artefak");
const monster = document.querySelector("#monster");
const quizContainer = document.querySelector("#quiz-container");

artefak.addEventListener("click", () => {
  quizContainer.style.display = "block";
});

function jawabKuis(isBenar) {
  quizContainer.style.display = "none";
  if (isBenar) {
    alert("BENAR! Warna kembali sedikit demi sedikit!");
    monster.setAttribute("scale", "0.3 0.3 0.3");
    monster.setAttribute("color", "green");
  } else {
    alert("SALAH! Monster masih kuat.");
  }
}
