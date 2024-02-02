import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./utils.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import { cardsContent, formValidaProfile, formValidaPlace } from "./const.js";

export const buttonAdd = document.querySelector(".profile__button-add");
export const nameProfession = document.querySelector(".popup__input-name");
export const profesion = document.querySelector(".popup__input-profesion");
export const buttonEdit = document.querySelector(".profile__button-edit");
const imagePopup = new PopupWithImage(".popup_image");

const popupWithFormAdd = new PopupWithForm(".popup__add", formSubmitHandlerAdd);
const popupWithFormEdit = new PopupWithForm(".popup__edit", formSubmitHandler);
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__profession",
});
new FormValidator(validationConfig, formValidaPlace);

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
buttonAdd.addEventListener("click", popupButtonAdd);
buttonEdit.addEventListener("click", openProfile);

function popupButtonAdd(event) {
  event.preventDefault();
  popupWithFormAdd.open(); //add
}

function openProfile() {
  const userData = userInfo.getUserInfo();
  nameProfession.value = userData.name;
  profesion.value = userData.job;
  new FormValidator(validationConfig, formValidaProfile);
  popupWithFormEdit.open();
}

function formSubmitHandler(formValues) {
  userInfo.setUserInfo({
    name: formValues["input-name"],
    job: formValues["input-job"],
  });
  console.log(formValues);
  popupWithFormEdit.close();
}

function formSubmitHandlerAdd(formValues) {
  const newCard = new Card(
    formValues["input-nameadd"],
    formValues["input-url"],
    "#template__card",
    imagePopup.open
  ).createCardElement();
  defaultCardList.setItem(newCard);
  popupWithFormEdit.close();
}

defaultCardList.renderItems();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
