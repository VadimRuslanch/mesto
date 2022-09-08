export default class UserInfo {
    constructor({ nameElement, aboutElement, avatar }) {
        this._nameElement = document.querySelector(nameElement);
        this._aboutElement = document.querySelector(aboutElement);
        this._avatar = document.querySelector(avatar);
    };

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            avatar: this._avatar.src,
        }
    };

    setUserInfo(userData) {
        this._nameElement.textContent = userData.name;
        this._aboutElement.textContent = userData.about;
        this._avatar.src = userData.avatar
    };
};