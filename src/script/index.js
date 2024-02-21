import "../pages/index.css";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { validationConfig } from "./utils.js";
import Section from "./Section.js";
import {
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
  profileName,
  profileAbout,
  buttonSubmitCard,
  popupSubmitProfile,
} from "./const.js";

let defaultCardList;
import { api } from "../utils/Api.js";

function popupButtonAdd(event) {
  event.preventDefault();
  popupWithFormAdd.open();
}

api.getUserInfo().then((userData) => {
  profileName.textContent = userData.name;
  profileAbout.textContent = userData.about;
});

function openProfile() {
  popupSubmitProfile.textContent = "Guardando...";
  api.getUserInfo().then((userData) => {
    nameProfession.value = userData.name;
    profesion.value = userData.about;
    new FormValidator(validationConfig, formValidaProfile);
    popupWithFormEdit.open();
    popupSubmitProfile.textContent = "Guardar";
  });
}

export function formSubmitHandler(formValues) {
  const name = formValues["input-name"];
  const about = formValues["input-job"];

  api
    .updateUserInfo(name, about)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
    })
    .catch((error) => {
      console.error("Error al actualizar el perfil:", error);
    });

  popupWithFormEdit.close();
}

export function formSubmitHandlerAdd(formValues) {
  const name = formValues["input-nameadd"];
  const link = formValues["input-url"];

  buttonSubmitCard.textContent = "Guardando...";

  api
    .getNewCards(name, link)
    .then((newCardData) => {
      const newCard = new Card(
        newCardData.name,
        newCardData.link,
        "#template__card",
        imagePopup.open
      ).createCardElement();

      defaultCardList.setItem(newCard);

      popupWithFormEdit.close();
      buttonSubmitCard.textContent = "Create";
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
          item._id,
          item.likes,
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
