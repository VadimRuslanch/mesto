export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    };

    _parseResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    };

    // Удаление лайка карточке
    delete(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }

    // Добавление лайка карточке
    setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }

    // Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(res => this._parseResponse(res));
    }

    // Добавление новой карточки
    addCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
            .then(res => this._parseResponse(res))
    };

    // Редактирует аватар пользователя
    editUserAvatar(userData) {
        // console.log(userData.link)
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: userData.link
            })
        })
            .then(res => this._parseResponse(res))
        // .then(res => console.log(res))
    }

    // Редактирует информацию профиля
    editUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
            .then(res => this._parseResponse(res))

    };

    // загрузка карточек с сервера
    getCard() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => this._parseResponse(res))
    };

    // Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then((res) => this._parseResponse(res))
    };
};