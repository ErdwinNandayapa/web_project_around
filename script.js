const profileForm = document.querySelector(".popup__form");
const nameprofession = document.querySelector(".popup__input-name");
const profesion = document.querySelector(".popup__input-profesion");
const profile__name = document.querySelector(".profile__name");
const profile__profession = document.querySelector(".profile__profession");
const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const fix = document.querySelector(".body"); //quitar scroll
const buttonClose = document.querySelector(".popup__button-typeclose");

//
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profile__name.textContent = nameprofession.value;
  profile__profession.textContent = profesion.value;
  //reset
  profileForm.reset();

  popup.classList.toggle("popup_open");
  fix.classList.toggle("fix");
});

buttonEdit.addEventListener("click", function () {
  //abrir popup
  popup.classList.toggle("popup_open");
  //quita el scroll
  fix.classList.toggle("fix");
});

buttonClose.addEventListener("click", function () {
  const popupcontent = document.querySelector(".popup__content");
  // Agrega la clase 'popup-close' para iniciar la animación de cierre
  popupcontent.classList.add("popup-close");
  // Después de un tiempo predeterminado (por ejemplo, 500 milisegundos), elimina la clase 'popup_open'
  setTimeout(function () {
    popup.classList.remove("popup_open");
  }, 500);
  setTimeout(function () {
    popupcontent.classList.remove("popup-close");
  }, 600);

  fix.classList.toggle("fix");
});
