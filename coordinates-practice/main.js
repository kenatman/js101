const targetImage = document.querySelector(".target");
const targetText = document.querySelector(".target__text");
const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");

function getTarget(e) {
  const x = e.clientX;
  const y = e.clientY;

  targetImage.style.position = `absolute`;
  targetImage.style.left = `${x - 60}px`;
  targetImage.style.top = `${y - 60}px`;

  targetText.innerHTML = `${x}px, ${y}px`;
  targetText.style.position = `absolute`;
  targetText.style.left = `${x + 60}px`;
  targetText.style.top = `${y + 60}px`;

  vertical.style.left = `${x}px`;
  horizontal.style.top = `${y}px`;
}

function init() {
  window.addEventListener("mousemove", getTarget);
}

init();
