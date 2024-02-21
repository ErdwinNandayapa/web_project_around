class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .catch((error) => console.error("Error:", error));
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .catch((error) => console.error("Error:", error));
  }

  updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .catch((error) => console.error("Error:", error));
  }

  getNewCards(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .catch((error) => console.error("Error:", error));
  }
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .catch((error) => console.error("Error:", error));
  }
  likeCard(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT"; // Determina el método basado en si ya se ha dado "me gusta" o no
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: method,
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json(); // La respuesta incluirá el estado actualizado de "me gusta", incluyendo el conteo
      })
      .catch((error) => console.error("Error:", error));
  }
}

export const api = new Api("https://around.nomoreparties.co/v1/web_es_08/", {
  authorization: "cebd400e-cb13-478f-a576-1969697c9570",
});

api.getInitialCards().then((cards) => console.log(cards));

// Use the api object to make requests
// api.getCards().then((cards) => console.log(cards));
// api.getUserInfo().then((userInfo) => console.log(userInfo));
// api
//   .updateUserInfo("Marie Skłodowska Curie", "Físico y químicos")
//   .then((updatedUserInfo) => console.log(updatedUserInfo));
