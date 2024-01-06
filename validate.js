enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  // Selecciona el formulario y los elementos de entrada
  // const formElement = document.querySelector(formSelector);
  const formElements = document.querySelectorAll(formSelector);
  formElements.forEach((formElement) => {
    const inputElements = Array.from(
      formElement.querySelectorAll(inputSelector)
    );

    const submitButtonElement = formElement.querySelector(submitButtonSelector);

    // Deshabilita el botón de envío al inicio
    submitButtonElement.classList.add(inactiveButtonClass);

    // Agrega un evento de 'input' a cada elemento de entrada
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        // Realiza la validación aquí
        // Si la validación falla, agrega las clases de error
        if (!inputElement.validity.valid) {
          inputElement.classList.add(inputErrorClass);
          // Muestra el mensaje de error
          const errorElement = formElement.querySelector(
            `#${inputElement.id}-error`
          );

          errorElement.textContent = inputElement.validationMessage;
          errorElement.classList.add(errorClass);
        } else {
          // Si la validación es exitosa, elimina las clases de error
          inputElement.classList.remove(inputErrorClass);
          const errorElement = formElement.querySelector(
            `#${inputElement.id}-error`
          );
          errorElement.textContent = "";
          errorElement.classList.remove(errorClass);
        }

        // Habilita o deshabilita el botón de envío según la validez del formulario
        if (!formElement.checkValidity()) {
          submitButtonElement.classList.add(inactiveButtonClass);
        } else {
          submitButtonElement.classList.remove(inactiveButtonClass);
        }
      });
    });
  });
}
