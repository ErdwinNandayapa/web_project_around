enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

function handleInputEvent(
  inputElement,
  formElement,
  inputErrorClass,
  errorClass,
  submitButtonElement,
  inactiveButtonClass
) {
  if (!inputElement.validity.valid) {
    addErrorClasses(inputElement, formElement, inputErrorClass, errorClass);
  } else {
    removeErrorClasses(inputElement, formElement, inputErrorClass, errorClass);
  }

  toggleSubmitButton(formElement, submitButtonElement, inactiveButtonClass);
}

function addErrorClasses(
  inputElement,
  formElement,
  inputErrorClass,
  errorClass
) {
  inputElement.classList.add(inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

function removeErrorClasses(
  inputElement,
  formElement,
  inputErrorClass,
  errorClass
) {
  inputElement.classList.remove(inputErrorClass);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function toggleSubmitButton(
  formElement,
  submitButtonElement,
  inactiveButtonClass
) {
  if (!formElement.checkValidity()) {
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formElements = document.querySelectorAll(formSelector);
  formElements.forEach((formElement) => {
    const inputElements = Array.from(
      formElement.querySelectorAll(inputSelector)
    );
    const submitButtonElement = formElement.querySelector(submitButtonSelector);
    submitButtonElement.classList.add(inactiveButtonClass);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () =>
        handleInputEvent(
          inputElement,
          formElement,
          inputErrorClass,
          errorClass,
          submitButtonElement,
          inactiveButtonClass
        )
      );
    });
  });
}
