import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./utils.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";

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
// export const popup = document.querySelector(".popup");
const popup = new Popup(".popup");
export const buttonEdit = document.querySelector(".profile__button-edit");
export const buttonClose = document.querySelector(".popup__button-typeclose");
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__profession",
});
const userData = userInfo.getUserInfo();

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

function popupButtonAdd(event) {
  event.preventDefault();
  const popupButtonAddId = document.querySelector("#popup__add");

  // popupButtonAddId.classList.toggle("popup_open"); //preguntar
  popup.open();
  sectionBody.classList.add("fix");
  const formElement2 = document.querySelector(".popup__form-add");
  new FormValidator(validationConfig, formElement2);

  const popupFormAdd = document.querySelector(".popup__form-add");

  const buttonClose = document.querySelector(".popup__button-typecloseadd");
  popupFormAdd.addEventListener("submit", createCardInput);
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
    "#template__card",
    imagePopup.open
  ).createCardElement();
  cards.prepend(newCard);

  popupButtonAddId.classList.toggle("popup_open");

  sectionBody.classList.remove("fix");
  popupFormAdd.reset();

  popupFormAdd.removeEventListener("submit", (event) => createCardInput(event));
  document.removeEventListener("keyup", closePopupAdd);
}

// formulario profile

buttonEdit.addEventListener("click", openProfile);

function openProfile() {
  nameProfession.value = userData.name;
  profesion.value = userData.job;

  const formElement = document.querySelector(".popup__form");
  new FormValidator(validationConfig, formElement);

  popup.open();
  sectionBody.classList.add("fix");
}

const imagePopup = new PopupWithImage(".popup_image");

const defaultCardList = new Section(
  {
    data: cardsContent,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#template__card",
        imagePopup.open
      );
      const cardElement = card.createCardElement();
      defaultCardList.setItem(cardElement);
    },
  },
  ".cards"
);

defaultCardList.renderItems();

function formSubmitHandler(formValues) {
  userInfo.setUserInfo({ name: nameProfession.value, job: profesion.value });
  popup.close();
  sectionBody.classList.remove("fix");
}
const popupWithForm = new PopupWithForm(".popup__edit", formSubmitHandler);

// Ahora puedes llamar a los métodos en la instancia
popupWithForm.setEventListeners();
