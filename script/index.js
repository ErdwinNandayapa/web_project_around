import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./utils.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";

export const buttonAdd = document.querySelector(".profile__button-add");
export const nameProfession = document.querySelector(".popup__input-name");
export const profesion = document.querySelector(".popup__input-profesion");
export const buttonEdit = document.querySelector(".profile__button-edit");
const popupFormAdd = new Popup("#popup__add");
const popup = new Popup(".popup");
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__profession",
});

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
  popupFormAdd.open(); //add
  const formElement2 = document.querySelector(".popup__form-add");
  new FormValidator(validationConfig, formElement2);
}
// formulario profile
buttonEdit.addEventListener("click", openProfile);
function openProfile() {
  const userData = userInfo.getUserInfo();
  nameProfession.value = userData.name;
  profesion.value = userData.job;
  const formElement = document.querySelector(".popup__form");
  new FormValidator(validationConfig, formElement);
  popup.open();
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
  userInfo.setUserInfo({
    name: formValues["input-name"],
    job: formValues["input-job"],
  });
  console.log(formValues);
  popup.close();
}
const popupWithFormEdit = new PopupWithForm(".popup__edit", formSubmitHandler);
popupWithFormEdit.setEventListeners();

function formSubmitHandlerAdd(formValues) {
  const newCard = new Card(
    formValues["input-nameadd"],
    formValues["input-url"],
    "#template__card",
    imagePopup.open
  ).createCardElement();
  defaultCardList.setItem(newCard);
  popup.close();
}

const popupWithFormAdd = new PopupWithForm("#popup__add", formSubmitHandlerAdd);
popupWithFormAdd.setEventListeners();
