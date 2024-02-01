export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keyup", this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup_open") ||
        event.target.classList.contains("popup__button-typeclose")
      ) {
        this.close();
      }
    });
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
}

// const imagePopup = new ImagePopup(".popup_image");
// imagePopup.open(imageUrl);

// const popup = new Popup(".popup");
// popup.setEventListeners();
