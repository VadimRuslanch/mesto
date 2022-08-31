export default class UserInfo {
    constructor({ nameElement, aboutElement }) {
        this._nameElement = nameElement;
        this._aboutElement = aboutElement;
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