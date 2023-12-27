const $cards = document.querySelector(".cards");
$template = document.querySelector("#template__card").content;
$fragment = document.createDocumentFragment();
const buttonadd = document.querySelector(".profile__button-add");

buttonadd.addEventListener("click", popupbuttonadd);

// popupFormAdd.removeEventListener("submit", (event) => popupbuttonadd(event));

function closepopup(event) {
  event.preventDefault();

  const popupbuttonclose = document.querySelector("#popup__add");
  popupbuttonclose.classList.toggle("popup_open");
  fix.classList.toggle("fix");
}

function popupbuttonadd(event) {
  event.preventDefault();
  const popupbuttonadd = document.querySelector("#popup__add");
  popupbuttonadd.classList.toggle("popup_open");
  fix.classList.toggle("fix");
  const popupFormAdd = document.querySelector(".popup__form-add");
  const buttonclose = document.querySelector(".button__type-close-add");

  buttonclose.addEventListener("click", closepopup);

  popupFormAdd.addEventListener("submit", createCardinput);
}

function createCardinput(event) {
  event.preventDefault();
  const name = document.querySelector(".popup__input-name-add");
  const link = document.querySelector(".popup__input-linkadd");
  const popupbuttonadd = document.querySelector("#popup__add");
  const popupFormAdd = document.querySelector(".popup__form-add");
  const element = {
    name: name.value,
    link: link.value,
  };
  const newcard = createCard(element);
  $cards.prepend(newcard);

  popupbuttonadd.classList.toggle("popup_open");

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
  const popupimage = document.querySelector(".popup_image");
  const popupimagesrc = document.querySelector(".popup__element");
  const popup__title = popupimagesrc.nextElementSibling;
  const buttonclose = document.querySelector(".button_close");

  //quitar scroll

  popupimagesrc.src = evet.target.src;
  popupimagesrc.alt = evet.target.alt;
  popup__title.textContent = evet.target.alt;

  popupimage.classList.toggle("popup_opened");

  fix.classList.toggle("fix");

  function cerrarPopuImage() {
    popupimage.classList.toggle("popup_opened"); //inspeccionar el elemento
    fix.classList.toggle("fix");
    buttonclose.removeEventListener("click", cerrarPopuImage);
  }
  //
  buttonclose.addEventListener("click", cerrarPopuImage);
}
