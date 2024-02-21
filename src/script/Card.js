import { closeButtonCards, buttonLike } from "./utils.js";
import { api } from "../utils/Api.js";

export default class Card {
  constructor(name, link, id, likes, selector, handleCardClick) {
    this.name = name;
    this.link = link;
    this.selector = selector;
    this._handleCardClick = handleCardClick;
    this.id = id;
    this.likes = likes;
  }

  _eventListener(clone) {
    this.clone
      .querySelector(".button__type-like")
      .addEventListener("click", buttonLike);

    this.clone
      .querySelector(".button__delete")
      .addEventListener("click", () => this._deleteCard());

    this.clone.querySelector(".images__card").addEventListener("click", () => {
      this._handleCardClick(this.name, this.link);
    });

    return clone;
  }
  _deleteCard() {
    if (!confirm("Are you sure?")) return;
    const deleteButton = document.querySelector(".button__delete");
    const cardElement = deleteButton.closest(".card");
    api
      .deleteCard(this.id)
      .then(() => {
        console.log(cardElement);
        cardElement.remove();
      })
      .catch((error) => console.error("Error al eliminar la tarjeta:", error));
  }
  //esto esta aprueba y error
  _likeCard() {
    const isLiked = this.likeButton.classList.contains("button__like-active"); // Asume que `likeButton` es una referencia al botón de "me gusta" preguntar button__type-like
    api
      .likeCard(this.id, isLiked)
      .then((data) => {
        this.likeButton.classList.toggle("button__like-active", !isLiked); // Actualiza la clase basada en la nueva respuesta
        this.likeCountElement.textContent = data.likes.length; // Asume que `likeCountElement` es una referencia al elemento que muestra el conteo de "me gusta"
      })
      .catch((error) =>
        console.error("Error al actualizar el me gusta:", error)
      );
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
