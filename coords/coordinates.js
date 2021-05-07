const divClick = document.querySelector(".div__click");
const clientObj = divClick.getBoundingClientRect();

const by = document.querySelector(".by");
const to = document.querySelector(".to");
const special = document.querySelector(".special");

function findCoords(e) {
  console.log(clientObj);
  console.log(`client : ${e.clientX}, ${e.clientY}`);
  console.log(`page : ${e.pageX}, ${e.pageY}`);
}

function init() {
  divClick.addEventListener("click", (e) => {
    findCoords(e);
  });
  by.addEventListener("click", (e) => {
    window.scrollBy(0, 100);
  });
  to.addEventListener("click", (e) => {
    window.scrollTo(0, 100);
  });
  special.addEventListener("click", (e) => {
    divClick.scrollIntoView();
  });
}

init();
