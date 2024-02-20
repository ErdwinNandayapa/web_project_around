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
let defaultCardList;

function popupButtonAdd(event) {
  event.preventDefault();
  popupWithFormAdd.open();
}

function openProfile() {
  api.getUserInfo().then((userData) => {
    nameProfession.value = userData.name;
    profesion.value = userData.about;
    new FormValidator(validationConfig, formValidaProfile);
    popupWithFormEdit.open();
  });
}

export function formSubmitHandler(formValues) {
  userInfo.setUserInfo({
    name: formValues["input-name"],
    job: formValues["input-job"],
  });
  popupWithFormEdit.close();
}

export function formSubmitHandlerAdd(formValues) {
  const name = formValues["input-nameadd"];
  const link = formValues["input-url"];

  // Llamar a getInitialCards de la API para crear la nueva carta
  api
    .getNewCards(name, link)
    .then((newCardData) => {
      // Crear la carta en el cliente con los datos devueltos por la API
      const newCard = new Card(
        newCardData.name,
        newCardData.link,
        "#template__card",
        imagePopup.open
      ).createCardElement();

      // Agregar la nueva carta a la lista de cartas
      defaultCardList.setItem(newCard);

      // Cerrar el popup de formulario
      popupWithFormEdit.close();
    })
    .catch((error) => {
      console.error("Error al crear la carta:", error);
    });
}

buttonAdd.addEventListener("click", popupButtonAdd);
buttonEdit.addEventListener("click", openProfile);

api.getInitialCards().then((cards) => {
  defaultCardList = new Section(
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
