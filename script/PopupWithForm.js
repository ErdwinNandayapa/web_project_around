class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector("form");
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll("input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._formSubmitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

function formSubmitHandler(formValues) {
  console.log(formValues);
}
const popupWithForm = new PopupWithForm(
  ".my-popup-selector",
  formSubmitHandler
);

// Ahora puedes llamar a los métodos en la instancia
popupWithForm.setEventListeners();