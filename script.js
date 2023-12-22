const profileForm = document.querySelector(".popup__form");
const nombre = document.querySelector('.input__name');
const profesion = document.querySelector('.input__profesion');
const profile__name = document.querySelector('.profile__name');
const profile__profession = document.querySelector('.profile__profession');
const popup = document.querySelector(".popup");;
const buttonEdit = document.querySelector(".profile__button-edit");
const fix = document.querySelector(".body"); //quitar scroll
const buttoncerrar = document.querySelector(".button__type-close");
// const buttonlike = document.querySelector(".button__type-like")



//  buttonlike.addEventListener('click', function(){
//    buttonlike.classList.toggle('button__like');
//  });


profileForm.addEventListener("submit", function(event){
    event.preventDefault();
    profile__name.textContent = nombre.value;
    profile__profession.textContent = profesion.value;  
     //reset
    profileForm.reset();
    
    popup.classList.toggle('popup_open');
    fix.classList.toggle('fix');
  })

  buttonEdit.addEventListener('click', function(){
    //abrir popup
    popup.classList.toggle('popup_open');
    //quita el scroll
    fix.classList.toggle('fix');    
  });

  buttoncerrar.addEventListener('click', function(){
    popup.classList.toggle('popup_open');
    fix.classList.toggle('fix');
  }
  )
