const artefak = document.querySelector("#artefak");
const monster = document.querySelector("#monster");
const quizContainer = document.querySelector("#quiz-container");

artefak.addEventListener("click", () => {
  quizContainer.style.display = "block";
});

function jawabKuis(isBenar) {
  quizContainer.style.display = "none";
  if (isBenar) {
    alert("BENAR! Serangan diluncurkan!");
    monster.setAttribute(
      "animation__scale",
      "property: scale; to: 0.05 0.05 0.05; dur: 1000; easing: easeOutElastic",
    );
    monster.setAttribute(
      "animation__rotate",
      "property: rotation; to: 0 1080 0; dur: 1000",
    );
  } else {
    alert("SALAH! Monster menangkis seranganmu!");
  }
}
