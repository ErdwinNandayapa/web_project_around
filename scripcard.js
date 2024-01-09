import "./validate.js";
import { fix } from "./script.js";
const $cards = document.querySelector(".cards");
const $template = document.querySelector("#template__card").content;
const $fragment = document.createDocumentFragment();
const buttonAdd = document.querySelector(".profile__button-add");

buttonAdd.addEventListener("click", popupButtonAdd);

function closePopupAdd(event) {
  event.preventDefault();
  if (
    event.target.classList.contains("popup") ||
    event.key === "Escape" ||
    event.target.classList.contains("popup__button-typecloseadd")
  ) {
    const popupButtonClose = document.querySelector("#popup__add");
    const popupContent = document.querySelector(".popup__content-add");
    popupContent.classList.add("popup-closeTransition");
    let element = document.querySelector(".popup-closeTransition");

    element.addEventListener("animationend", (e) => {
      if (e.animationName === "zoomOut") {
        popupContent.classList.remove("popup-closeTransition");
        popupButtonClose.classList.remove("popup_open");
      }
    });

    fix.classList.remove("fix");
  }
}

function popupButtonAdd(event) {
  event.preventDefault();

  const popupButtonAdd = document.querySelector("#popup__add");
  popupButtonAdd.classList.toggle("popup_open");
  fix.classList.toggle("fix");
  const popupFormAdd = document.querySelector(".popup__form-add");
  const buttonClose = document.querySelector(".popup__button-typecloseadd");

  buttonClose.addEventListener("click", closePopupAdd);
  popupButtonAdd.addEventListener("click", closePopupAdd);
  document.addEventListener("keydown", closePopupAdd);
  popupFormAdd.addEventListener("submit", createCardinput);
}

function createCardinput(event) {
  event.preventDefault();
  const name = document.querySelector(".popup__input-name-add");
  const link = document.querySelector(".popup__input-linkadd");
  const popupButtonAdd = document.querySelector("#popup__add");
  const popupFormAdd = document.querySelector(".popup__form-add");
  const element = {
    name: name.value,
    link: link.value,
  };
  const newCard = createCard(element);
  $cards.prepend(newCard);

  popupButtonAdd.classList.toggle("popup_open");
  fix.classList.toggle("fix");
  popupFormAdd.reset();
  popupFormAdd.removeEventListener("submit", (event) => createCardinput(event));
}

const cardsContent = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function createCard(element) {
  const $card = $template.querySelector(".card");
  const $clone = document.importNode($card, true);
  $clone.querySelector("img").setAttribute("src", element.link);
  $clone.querySelector("img").setAttribute("alt", element.name);
  $clone.querySelector(".card__text").textContent = element.name;
  $fragment.appendChild($clone);

  $clone
    .querySelector(".button__type-like")
    .addEventListener("click", function (evet) {
      evet.target.classList.toggle("button__like");
    });

  $clone
    .querySelector(".button__delete")
    .addEventListener("click", function (evet) {
      evet.target.parentElement.parentElement.remove();
    });
  $clone
    .querySelector(".images__card")
    .addEventListener("click", createPopupImage);
  return $clone;
}
cardsContent.forEach((element) => {
  createCard(element);
});

$cards.appendChild($fragment);

function createPopupImage(evet) {
  const popupImage = document.querySelector(".popup_image");
  const popupImageSrc = document.querySelector(".popup__element");
  const popup__title = popupImageSrc.nextElementSibling;
  const buttonClose = document.querySelector(".button_close");

  popupImageSrc.src = evet.target.src;
  popupImageSrc.alt = evet.target.alt;
  popup__title.textContent = evet.target.alt;

  popupImage.classList.toggle("popup_open");
  fix.classList.toggle("fix");

  buttonClose.addEventListener("click", closeAnimationendPopuOpen);
  popupImage.addEventListener("click", closeAnimationendPopuOpen);
  document.addEventListener("keydown", closeAnimationendPopuOpen);
}

function closeAnimationendPopuOpen(event) {
  if (
    event.target.classList.contains("popup") ||
    event.key === "Escape" ||
    event.target.classList.contains("button_close")
  ) {
    const popupContent = document.querySelector(".popup__content-image");
    const popupImage = document.querySelector(".popup_image");
    popupContent.classList.add("popup-closeTransition");
    let element = document.querySelector(".popup-closeTransition");
    element.addEventListener("animationend", (e) => {
      if (e.animationName === "zoomOut") {
        //     //  cerrar el evento o realizar cualquier acción que necesites.
        popupImage.classList.remove("popup_open");
        popupContent.classList.remove("popup-closeTransition");
      }
    });
    fix.classList.remove("fix");
    const buttonClose = document.querySelector(".button_close");
    buttonClose.removeEventListener("click", closeAnimationendPopuOpen);
    document.removeEventListener("keyup", closeAnimationendPopuOpen);
  }
}
