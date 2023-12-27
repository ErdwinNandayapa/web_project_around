const profileForm = document.querySelector(".popup__form");
const nombre = document.querySelector(".popup__input-name");
const profesion = document.querySelector(".input__profesion");
const profile__name = document.querySelector(".profile__name");
const profile__profession = document.querySelector(".profile__profession");
const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const fix = document.querySelector(".body"); //quitar scroll
const buttoncerrar = document.querySelector(".button__type-close");
const buttonimage = document.querySelector(".images__card");

//
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profile__name.textContent = nombre.value;
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

buttoncerrar.addEventListener("click", function () {
  popup.classList.toggle("popup_open");
  fix.classList.toggle("fix");
});
