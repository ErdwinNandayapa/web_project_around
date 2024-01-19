import Card from "./Cards.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./utils.js";

export const cards = document.querySelector(".cards");
export const template = document.querySelector("#template__card").content;
export const fragment = document.createDocumentFragment();
export const buttonAdd = document.querySelector(".profile__button-add");
export const sectionBody = document.querySelector(".body"); //document body
export const profileForm = document.querySelector(".popup__form");
export const nameProfession = document.querySelector(".popup__input-name");
export const profesion = document.querySelector(".popup__input-profesion");
export const profileName = document.querySelector(".profile__name");
export const profileProfession = document.querySelector(".profile__profession");
export const popup = document.querySelector(".popup");
export const buttonEdit = document.querySelector(".profile__button-edit");
export const buttonClose = document.querySelector(".popup__button-typeclose");

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
buttonAdd.addEventListener("click", popupButtonAdd);

function closePopupAdd(event) {
  if (
    event.target.classList.contains("popup") ||
    event.key === "Escape" ||
    event.target.classList.contains("popup__button-typecloseadd")
  ) {
    const popupButtonClose = document.querySelector("#popup__add");
    const popupContent = document.querySelector(".popup__content-add");
    popupContent.classList.add("popup-closeTransition");
    const element = document.querySelector(".popup-closeTransition");

    element.addEventListener("animationend", (e) => {
      if (e.animationName === "zoomOut") {
        popupContent.classList.remove("popup-closeTransition");
        popupButtonClose.classList.remove("popup_open");
        document.removeEventListener("keyup", closePopupAdd);
      }
    });

    sectionBody.classList.remove("fix");
  }
}

function popupButtonAdd(event) {
  event.preventDefault();
  const popupButtonAddId = document.querySelector("#popup__add");
  popupButtonAddId.classList.toggle("popup_open");

  sectionBody.classList.add("fix");
  const popupFormAdd = document.querySelector(".popup__form-add");

  const buttonClose = document.querySelector(".popup__button-typecloseadd");
  popupFormAdd.addEventListener("submit", createCardInput);
  buttonClose.addEventListener("click", closePopupAdd);
  popupButtonAddId.addEventListener("click", closePopupAdd);
  document.addEventListener("keyup", closePopupAdd);
}

function createCardInput(event) {
  event.preventDefault();
  const name = document.querySelector(".popup__input-name-add");
  const link = document.querySelector(".popup__input-linkadd");
  const popupButtonAddId = document.querySelector("#popup__add");
  const popupFormAdd = document.querySelector(".popup__form-add");
  const element = {
    name: name.value,
    link: link.value,
  };
  const newCard = new Card(
    element.name,
    element.link,
    "#template__card"
  ).createCardElement();
  cards.prepend(newCard);

  popupButtonAddId.classList.toggle("popup_open");

  sectionBody.classList.remove("fix");

  popupFormAdd.reset();
  popupFormAdd.removeEventListener("submit", (event) => createCardInput(event));
}

export function closeAnimationendPopuOpen(event) {
  if (
    event.target.classList.contains("popup") ||
    event.key === "Escape" ||
    event.target.classList.contains("button_close")
  ) {
    const popupContent = document.querySelector(".popup__content-image");
    const popupImage = document.querySelector(".popup_image");
    popupContent.classList.add("popup-closeTransition");
    const element = document.querySelector(".popup-closeTransition");
    element.addEventListener("animationend", (e) => {
      if (e.animationName === "zoomOut") {
        //     //  cerrar el evento o realizar cualquier acción que necesites.
        popupImage.classList.remove("popup_open");
        popupContent.classList.remove("popup-closeTransition");
      }
    });

    sectionBody.classList.remove("fix");
    document.removeEventListener("keydown", closeAnimationendPopuOpen);
  }
}

// formulario profile

buttonEdit.addEventListener("click", openProfile);
profileForm.addEventListener("submit", addProfilenameText);
popup.addEventListener("click", closeProfiles);

buttonClose.addEventListener("click", closeProfiles);

function openProfile() {
  nameProfession.value = profileName.textContent;
  profesion.value = profileProfession.textContent;
  //abrir popup
  popup.classList.toggle("popup_open");

  sectionBody.classList.add("fix");
  document.addEventListener("keyup", closeProfiles);
}
function animationZoomOut(e) {
  if (e.animationName === "zoomOut") {
    const popupContent = document.querySelector(".popup__content");
    //     //  cerrar el evento o realizar cualquier acción que necesites.
    popup.classList.remove("popup_open");
    const element = document.querySelector(".popup-closeTransition");
    element.removeEventListener("animationend", animationZoomOut);
    popupContent.classList.remove("popup-closeTransition");
    document.removeEventListener("keyup", closeProfiles);
  }
}

function closeProfiles(event) {
  if (
    event.target.classList.contains("popup") ||
    event.key === "Escape" ||
    event.target.classList.contains("popup__button-typeclose")
  ) {
    const popupContent = document.querySelector(".popup__content");
    // Agrega la clase 'popup-close' para iniciar la animación de cierre
    popupContent.classList.add("popup-closeTransition");
    //remover transicion
    const element = document.querySelector(".popup-closeTransition");
    element.addEventListener("animationend", animationZoomOut);

    sectionBody.classList.remove("fix");
  }
}

function addProfilenameText(event) {
  event.preventDefault();
  profileName.textContent = nameProfession.value;
  profileProfession.textContent = profesion.value;
  profileForm.reset();

  popup.classList.toggle("popup_open");
  document.removeEventListener("keyup", closeProfiles);
  sectionBody.classList.remove("fix");
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".cards");
  cardsContent.forEach(function ({ name, link }) {
    const cardTemplate = new Card(name, link, "#template__card");
    const cardElement = cardTemplate.createCardElement();
    container.prepend(cardElement);
  });
});

const formElement = document.querySelector(".popup__form");
new FormValidator(validationConfig, formElement);
const formElement2 = document.querySelector(".popup__form-add");
new FormValidator(validationConfig, formElement2);
