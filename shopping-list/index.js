const form = document.querySelector(`.form`);
const input = document.querySelector(`.input`);
const items = document.querySelector(`.contents`);
const submitBtn = document.querySelector(`.submitBtn`);
let toBuy = [];

function saveInStorage() {
  localStorage.setItem(`items`, JSON.stringify(toBuy));
}

function displayItems(item) {
  const li = document.createElement(`li`);
  const itemName = document.createElement(`span`);
  const delBtn = document.createElement(`span`);
  const id = toBuy.length + 1;

  itemName.textContent = item;
  delBtn.textContent = `❌`;
  li.id = id;

  items.appendChild(li);
  li.appendChild(itemName);
  li.appendChild(delBtn);

  const obj = { id: id, item: item };
  toBuy.push(obj);
  saveInStorage();
}

function submitItem(e) {
  e.preventDefault();
  const item = input.value;
  displayItems(item);
  input.value = "";
}

function loadItems() {
  const waitingToLoad = localStorage.getItem(`items`);
  if (toBuy !== null) {
    const parsedData = JSON.parse(waitingToLoad);
    parsedData.forEach((content) => displayItems(content.item));
  }
}

function init() {
  form.addEventListener("submit", submitItem);
  loadItems();
}

init();
