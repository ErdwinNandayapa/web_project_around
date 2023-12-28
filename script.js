const profileForm = document.querySelector(".popup__form");
const nombre = document.querySelector(".popup__input-name");
const profesion = document.querySelector(".popup__input-profesion");
const profile__name = document.querySelector(".profile__name");
const profile__profession = document.querySelector(".profile__profession");
const popup = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const fix = document.querySelector(".body"); //quitar scroll
const buttoncerrar = document.querySelector(".popup__button-typeclose");
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
  //popup.classList.toggle("popup-close");
  //fix.classList.toggle("fix");
  //popup.classList.toggle("popup_open");
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

  // Elimina todos los demás popups
  // const allPopups = document.querySelectorAll(".popup");
  // allPopups.forEach(function (popupElement) {
  //   if (popupElement !== popup) {
  //     popupElement.remove();
  //   }
  // });

  // Quita el scroll
  fix.classList.toggle("fix");
});
