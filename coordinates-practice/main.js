const targetImage = document.querySelector(".target");
const targetText = document.querySelector(".target__text");
const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");
const getRect = targetImage.getBoundingClientRect();
const rectWidth = getRect.width / 2;
const rectHeight = getRect.height / 2;

function getTarget(e) {
  const x = e.clientX;
  const y = e.clientY;

  targetImage.style.transform = `translate(${x - rectWidth}px,${
    y - rectHeight
  }px)`;

  targetText.innerHTML = `${x}px, ${y}px`;
  targetText.style.transform = `translate(${x}px,${y}px)`;

  vertical.style.transform = `translateX(${x}px)`;
  horizontal.style.transform = `translateY(${y}px)`;
}

function init() {
  window.addEventListener("mousemove", getTarget);
  console.log(getRect);
}

init();
