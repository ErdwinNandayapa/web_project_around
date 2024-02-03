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
  console.log(formValues);
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
// Inicialización
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
new FormValidator(validationConfig, formValidaPlace);
defaultCardList.renderItems();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
