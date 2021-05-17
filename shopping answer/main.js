const items = document.querySelector(`.items`);
const input = document.querySelector(`.footer__input`);
const addBtn = document.querySelector(`.footer__button`);

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text === ``) {
    input.focus();
    return;
  }
  // 2. 새로운 아에템을 만듦(텍스트 + 삭제 버튼)
  const item = createItem(text);
  // 3. items 컨테이너 안에 새로운 아이템 추가
  items.appendChild(item);
  // 4. 새로운 아이템으로 스크롤링
  item.scrollIntoView({ block: `center` });
  // 5. 인풋을 초기화한다.
  input.value = ``;
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement(`li`);
  itemRow.setAttribute(`class`, `item__row`);

  const item = document.createElement(`div`);
  item.setAttribute(`class`, `item`);

  const itemName = document.createElement(`span`);
  itemName.setAttribute(`class`, `item__name`);
  itemName.innerText = text;

  const delBtn = document.createElement(`button`);
  delBtn.setAttribute(`class`, `item__delete`);
  delBtn.innerHTML = ` <i class="fas fa-trash-alt"></i>`;
  // delBtn.addEventListener("click", () => {
  //   items.removeChild(itemRow);
  // });

  items.addEventListener("click", (e) => {
    if (e.target.tagName == `I`) {
      items.removeChild(e.target.parentNode.parentNode.parentNode);
    }
  });

  const itemDivider = document.createElement(`div`);
  itemDivider.setAttribute(`class`, `item__divider`);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);
  item.appendChild(itemName);
  item.appendChild(delBtn);

  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (event) => {
  if (event.key === `Enter`) {
    onAdd();
  }
});
