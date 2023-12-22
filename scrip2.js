const $cards = document.querySelector('.cards');
$template = document.querySelector('#template__card').content;
$fragment = document.createDocumentFragment();


cardsContent = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
  ]; 



cardsContent.forEach(element => {
    $template.querySelector('img').setAttribute('src', element.link);
    $template.querySelector('img').setAttribute('alt', element.name);
    $template.querySelector('.card__text').textContent = element.name;
    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
    const card = $template.querySelector(".card")
    const buttonLike = card.querySelector(".button__type-like");
    buttonLike.addEventListener('click', function(){  
  // buttonlike.classList.toggle('button__like');
  // console.log(card);
});

console.log(card);
});


$cards.appendChild($fragment);







