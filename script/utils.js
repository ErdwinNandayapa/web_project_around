import { sectionBody, closeAnimationendPopuOpen } from "./index.js";

export function createPopupImage(evet) {
  const popupImage = document.querySelector(".popup_image");
  const popupImageSrc = document.querySelector(".popup__element");
  const popup__title = popupImageSrc.nextElementSibling;
  const buttonClose = document.querySelector(".button_close");
  popupImageSrc.src = evet.target.src;
  popupImageSrc.alt = evet.target.alt;
  popup__title.textContent = evet.target.alt;

  popupImage.classList.toggle("popup_open");
  sectionBody.classList.add("fix");

  buttonClose.addEventListener("click", closeAnimationendPopuOpen);
  popupImage.addEventListener("click", closeAnimationendPopuOpen);
  document.addEventListener("keydown", closeAnimationendPopuOpen);
}

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
