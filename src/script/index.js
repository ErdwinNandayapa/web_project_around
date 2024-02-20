import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./utils.js";
import Section from "./Section.js";
import {
  cardsContent,
  formValidaProfile,
  formValidaPlace,
  buttonAdd,
  nameProfession,
  profesion,
  buttonEdit,
  imagePopup,
  popupWithFormAdd,
  popupWithFormEdit,
  userInfo,
} from "./const.js";

import { api } from "./Api.js";

// Use the api object to make requests
api.getCards().then((cards) => {
  cards.forEach((card) => {
    const { name, link } = card;
    console.log(name, link);
  });
});
// api.getUserInfo().then((userInfo) => console.log(userInfo));
// api
//   .updateUserInfo("Marie Skłodowska Curie", "Físico y químicos")
//   .then((updatedUserInfo) => console.log(updatedUserInfo));

function popupButtonAdd(event) {
  event.preventDefault();
  popupWithFormAdd.open();
}

function openProfile() {
  const userData = userInfo.getUserInfo();
  nameProfession.value = userData.name;
  profesion.value = userData.job;
  new FormValidator(validationConfig, formValidaProfile);
  popupWithFormEdit.open();
}

export function formSubmitHandler(formValues) {
  userInfo.setUserInfo({
    name: formValues["input-name"],
    job: formValues["input-job"],
  });
  popupWithFormEdit.close();
}

export function formSubmitHandlerAdd(formValues) {
  const newCard = new Card(
    formValues["input-nameadd"],
    formValues["input-url"],
    "#template__card",
    imagePopup.open
  ).createCardElement();
  defaultCardList.setItem(newCard);
  popupWithFormEdit.close();
}

buttonAdd.addEventListener("click", popupButtonAdd);
buttonEdit.addEventListener("click", openProfile);

api.getCards().then((cards) => {
  const defaultCardList = new Section(
    {
      data: cards, //  obtenidos de la API
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
  popupWithFormEdit.setEventListeners();
  popupWithFormAdd.setEventListeners();
});
new FormValidator(validationConfig, formValidaPlace);
// defaultCardList.renderItems();
// popupWithFormEdit.setEventListeners();
// popupWithFormAdd.setEventListeners();
