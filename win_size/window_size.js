const screen = document.querySelector(".screen");
const outer = document.querySelector(".outer");
const inner = document.querySelector(".inner");
const client = document.querySelector(".client");

display();

function display() {
  screen.innerHTML = `Window.screen : ${window.screen.width}, ${window.screen.height}`;
  outer.innerHTML = `Window.outer : ${window.outerWidth}, ${window.outerHeight}`;
  inner.innerHTML = `Window.inner : ${window.innerWidth}, ${window.innerHeight}`;
  client.innerHTML = `documentElement.clientWidth : ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}`;
}

function init() {
  window.addEventListener("resize", display);
}

init();
