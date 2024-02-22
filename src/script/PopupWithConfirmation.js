import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmHandler) {
    super(popupSelector);
    this._confirmHandler = confirmHandler;
    this._confirmButton = this._popup.querySelector(".popup__confirm-button");
    this._handleConfirm = this._handleConfirm.bind(this);
  }

  _handleConfirm(event) {
    event.preventDefault();
    this._confirmHandler();
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this._handleConfirm);
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
