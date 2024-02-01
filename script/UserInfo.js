export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
const userInfo = new UserInfo(".profile__name", ".profile__profession");

const datosUsuario = userInfo.getUserInfo();
console.log(datosUsuario); // { nombre: "NombreActual", trabajo: "TrabajoActual" }

// Actualizar información del usuario en la página
userInfo.setUserInfo("NuevoNombre", "NuevoTrabajo");
