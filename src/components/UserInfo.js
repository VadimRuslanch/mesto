export default class UserInfo {
    constructor(popupSelector, { nameElement, aboutElement }) {
        this._nameElement = nameElement;
        this._aboutElement = aboutElement;
        this._profile = document.querySelector(".profile__info");
        this._infoList = this._profile.querySelectorAll('.profile-info');
    };

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent
        }
    };

    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._aboutElement.textContent = data.about;
    };
};