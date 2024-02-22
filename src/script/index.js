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
  popupWithFormAvatar,
  headerAvatar,
  avatar,
} from "./const.js";
let defaultCardList;
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import { api } from "../utils/Api.js";

// const popupSelector = "#popup__confirmacion";
// const confirmHandler = () => {
//   console.log("Confirmado!");
// };
// const miPopupConConfirmacion = new PopupWithConfirmation(
//   popupSelector,
//   confirmHandler
// );
// miPopupConConfirmacion.open();

function popupButtonAdd(event) {
  event.preventDefault();
  popupWithFormAdd.open();
}

api.getUserInfo().then((userData) => {
  profileName.textContent = userData.name;
  profileAbout.textContent = userData.about;
  avatar.src = userData.avatar;
});

function openProfile() {
  api.getUserInfo().then((userData) => {
    nameProfession.value = userData.name;
    profesion.value = userData.about;
    new FormValidator(validationConfig, formValidaProfile);
    popupWithFormEdit.open();
  });
}
function openProfileAvatar() {
  popupWithFormAvatar.open();
}

export function formSubmitHandlerAvatar(formValues) {
  const link = formValues["input-url"];
  buttonSubmitCard.textContent = "Guardando...";
  api
    .updateAvatar(link)
    .then((userData) => {
      avatar.src = userData.avatar;
      popupWithFormAvatar.close();
      buttonSubmitCard.textContent = "Save";
    })
    .catch((error) => {
      console.error("Error al actualizar el avatar:", error);
    });
}

export function formSubmitHandler(formValues) {
  const name = formValues["input-name"];
  const about = formValues["input-job"];
  popupSubmitProfile.textContent = "Guardando...";
  api
    .updateUserInfo(name, about)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
      popupSubmitProfile.textContent = "Guardar";
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
      const { name, link, _id, likes } = newCardData;
      const newCard = new Card(
        name,
        link,
        _id,
        likes,
        "#template__card",
        imagePopup.open
      ).createCardElement();

      defaultCardList.setItem(newCard);

      popupWithFormEdit.close();
      buttonSubmitCard.textContent = "Create";
      popupWithFormAdd.close();
    })
    .catch((error) => {
      console.error("Error al crear la carta:", error);
    });
}

buttonAdd.addEventListener("click", popupButtonAdd);
buttonEdit.addEventListener("click", openProfile);
headerAvatar.addEventListener("click", openProfileAvatar);

api.getInitialCards().then((cards) => {
  defaultCardList = new Section(
    {
      data: cards, //  obtenidos de la API
      renderer: (item) => {
        const { name, link, _id, likes } = item;
        const card = new Card(
          name,
          link,
          _id,
          likes,
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
