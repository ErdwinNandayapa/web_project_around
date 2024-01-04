const profileForm = document.querySelector(".popup__form");
const nameProfession = document.querySelector(".popup__input-name");
const profesion = document.querySelector(".popup__input-profesion");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const fix = document.querySelector(".body"); //quitar scroll
const buttonClose = document.querySelector(".popup__button-typeclose");

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = nameProfession.value;
  profileProfession.textContent = profesion.value;
  profileForm.reset();

  popup.classList.toggle("popup_open");
  fix.classList.toggle("fix");
});

buttonEdit.addEventListener("click", function () {
  //abrir popup
  popup.classList.toggle("popup_open");
  fix.classList.toggle("fix");
});

buttonClose.addEventListener("click", function (event) {
  const popupContent = document.querySelector(".popup__content");
  // Agrega la clase 'popup-close' para iniciar la animación de cierre
  popupContent.classList.add("popup-closeTransition");

  //remover transicion
  let element = document.querySelector(".popup-closeTransition");
  element.addEventListener("animationend", (e) => {
    if (e.animationName === "zoomOut") {
      //     //  cerrar el evento o realizar cualquier acción que necesites.
      popup.classList.remove("popup_open");
      popupContent.classList.remove("popup-closeTransition");
    }
  });

  fix.classList.toggle("fix");
});
