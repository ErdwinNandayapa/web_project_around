import "./validate.js";
const profileForm = document.querySelector(".popup__form");
const nameProfession = document.querySelector(".popup__input-name");
const profesion = document.querySelector(".popup__input-profesion");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
export const fix = document.querySelector(".body"); //quitar scroll
const buttonClose = document.querySelector(".popup__button-typeclose");

buttonEdit.addEventListener("click", openProfile);
profileForm.addEventListener("submit", addProfilenameText);
popup.addEventListener("click", closeProfiles);

buttonClose.addEventListener("click", closeProfiles);

function openProfile() {
  nameProfession.value = profileName.textContent;
  profesion.value = profileProfession.textContent;
  //abrir popup
  popup.classList.toggle("popup_open");
  fix.classList.toggle("fix");
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
    fix.classList.remove("fix");
  }
}

function addProfilenameText(event) {
  event.preventDefault();
  profileName.textContent = nameProfession.value;
  profileProfession.textContent = profesion.value;
  profileForm.reset();

  popup.classList.toggle("popup_open");
  fix.classList.toggle("fix");
}
