import { createPopupImage, closeButtonCards, buttonLike } from "./utils.js";

export default class Card {
  constructor(name, link, selector) {
    this.name = name;
    this.link = link;
    this.selector = selector;
  }

  _eventListener(clone) {
    this.clone
      .querySelector(".button__type-like")
      .addEventListener("click", buttonLike);

    this.clone
      .querySelector(".button__delete")
      .addEventListener("click", closeButtonCards);
    this.clone
      .querySelector(".images__card")
      .addEventListener("click", createPopupImage);
    return clone;
  }

  createCardElement() {
    this.card = document.querySelector(this.selector);
    this.clone = this.card.content.cloneNode(true);
    this._setAttributes();
    this._setTextContent();
    this._eventListener();
    return this.clone;
  }
  _setAttributes() {
    const img = this.clone.querySelector("img");
    img.setAttribute("src", this.link);
    img.setAttribute("alt", this.name);
  }
  _setTextContent() {
    this.clone.querySelector(".card__text").textContent = this.name;
  }
}
