const $cards = document.querySelector(".cards");
$template = document.querySelector("#template__card").content;
$fragment = document.createDocumentFragment();
const buttonAdd = document.querySelector(".profile__button-add");

buttonAdd.addEventListener("click", popupButtonAdd);

function closePopup(event) {
  event.preventDefault();
  const popupButtonClose = document.querySelector("#popup__add");

  const popupContent = document.querySelector(".popup__content-add");
  popupContent.classList.add("popup-closeTransition");

  let element = document.querySelector(".popup-closeTransition");
  element.addEventListener("animationend", (e) => {
    if (e.animationName === "zoomOut") {
      //     //  cerrar el evento o realizar cualquier acción que necesites.

      popupContent.classList.remove("popup-closeTransition");
      popupButtonClose.classList.remove("popup_open");
    }
  });

  fix.classList.toggle("fix");
}

function popupButtonAdd(event) {
  event.preventDefault();
  const popupButtonAdd = document.querySelector("#popup__add");
  popupButtonAdd.classList.toggle("popup_open");
  fix.classList.toggle("fix");
  const popupFormAdd = document.querySelector(".popup__form-add");
  const buttonClose = document.querySelector(".popup__button-typecloseadd");

  buttonClose.addEventListener("click", closePopup);

  popupFormAdd.addEventListener("submit", createCardinput);
}

function createCardinput(event) {
  event.preventDefault();
  const name = document.querySelector(".popup__input-name-add");
  const link = document.querySelector(".popup__input-linkadd");
  const popupButtonAdd = document.querySelector("#popup__add");
  const popupFormAdd = document.querySelector(".popup__form-add");
  const element = {
    name: name.value,
    link: link.value,
  };
  const newCard = createCard(element);
  $cards.prepend(newCard);

  popupButtonAdd.classList.toggle("popup_open");

  fix.classList.toggle("fix");
  popupFormAdd.reset();
  popupFormAdd.removeEventListener("submit", (event) => createCardinput(event));
}

cardsContent = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function createCard(element) {
  $card = $template.querySelector(".card");
  $clone = document.importNode($card, true);

  $clone.querySelector("img").setAttribute("src", element.link);
  $clone.querySelector("img").setAttribute("alt", element.name);
  $clone.querySelector(".card__text").textContent = element.name;
  //  let $clone = document.importNode($template, true);
  $fragment.appendChild($clone);

  $clone
    .querySelector(".button__type-like")
    .addEventListener("click", function (evet) {
      evet.target.classList.toggle("button__like");
    });

  $clone
    .querySelector(".button__delete")
    .addEventListener("click", function (evet) {
      evet.target.parentElement.parentElement.remove();
    });
  $clone
    .querySelector(".images__card")
    .addEventListener("click", createPopupImage);
  return $clone;
}
cardsContent.forEach((element) => {
  createCard(element);
});
//   // console.log(buttonLike);
//
$cards.appendChild($fragment);

function createPopupImage(evet) {
  const popupImage = document.querySelector(".popup_image");
  const popupImageSrc = document.querySelector(".popup__element");
  const popup__title = popupImageSrc.nextElementSibling;
  const buttonClose = document.querySelector(".button_close");

  //quitar scroll

  popupImageSrc.src = evet.target.src;
  popupImageSrc.alt = evet.target.alt;
  popup__title.textContent = evet.target.alt;

  popupImage.classList.toggle("popup_open");

  fix.classList.toggle("fix");

  //
  buttonClose.addEventListener("click", closePopuImage);
}

function closePopuImage(event) {
  event.preventDefault();
  const popupContent = document.querySelector(".popup__content-image");
  const popupImage = document.querySelector(".popup_image");
  popupContent.classList.add("popup-close");
  // Después de un tiempo predeterminado (por ejemplo, 500 milisegundos), elimina la clase 'popup_open'
  setTimeout(function () {
    popupImage.classList.toggle("popup_open");
  }, 500);
  setTimeout(function () {
    popupContent.classList.remove("popup-close");
  }, 600);

  fix.classList.toggle("fix");

  buttonClose.removeEventListener("click", closePopuImage);
}
