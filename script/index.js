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
  const popup = new Popup("#popup__add");
  popup.open(); //add
  sectionBody.classList.add("fix");

  const formElement2 = document.querySelector(".popup__form-add");
  new FormValidator(validationConfig, formElement2);
}

// formulario profile

buttonEdit.addEventListener("click", openProfile);

function openProfile() {
  const popup = new Popup(".popup");
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

function formSubmitHandler(formValues, action) {
  if (action === "edit") {
    userInfo.setUserInfo({ name: nameProfession.value, job: profesion.value });
  } else if (action === "add") {
    const newCard = new Card(
      formValues["input input-nameadd"],
      formValues["input input-job"],
      "#template__card",
      imagePopup.open
    ).createCardElement();
    defaultCardList.setItem(newCard);
    console.log(formValues);
  }
  const popup = new Popup(".popup");
  popup.close();
  sectionBody.classList.remove("fix");
}
const popupWithFormEdit = new PopupWithForm(".popup__edit", (formValues) =>
  formSubmitHandler(formValues, "edit")
);
const popupWithFormAdd = new PopupWithForm("#popup__add", (formValues) =>
  formSubmitHandler(formValues, "add")
);

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
