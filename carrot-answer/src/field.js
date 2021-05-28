`use strict`;

import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export const itemType = Object.freeze({
  carrot: `carrot`, //
  bug: "bug",
});
export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(`.game__field`);
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
    // this.onClick = this.onClick.bind(this);
    // 클래스 안의 함수를 콜백으로 전달할 때는 전달되는 함수의 클래스 정보가 무시됨. 따라서 바인드 처리를 해야하는데
    // 1. function.bind(this)
    // 2. 전달되는 함수를 () => {}  expression 형태로 하면 자동으로 바인딩 됨.
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerHTML = ``;
    this._addItem(`carrot`, this.carrotCount, `img/carrot.png`);
    this._addItem(`bug`, this.bugCount, `img/bug.png`);
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const item = document.createElement(`img`);
      item.setAttribute(`class`, className);
      item.setAttribute(`src`, imgPath);
      item.style.position = `absolute`;
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      this.field.appendChild(item);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
    }
  }

  onClick = (e) => {
    const target = e.target;
    if (target.matches(`.carrot`)) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(itemType.carrot);
    } else if (target.matches(`.bug`)) {
      this.onItemClick && this.onItemClick(itemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
