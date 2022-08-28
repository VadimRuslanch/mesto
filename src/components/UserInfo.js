export default class UserInfo {
    constructor(nameForm, aboutForm, nameProfile, aboutProfile) {
        this._nameForm = nameForm;
        this._aboutForm = aboutForm;
        this._nameProfile = nameProfile;
        this._aboutProfile = aboutProfile;
    };
    getUserInfo() {
        this._nameForm.value = this._nameProfile.textContent;
        this._aboutForm.value = this._aboutProfile.textContent;
    };
    setUserInfo() {
        this._nameProfile.textContent = this._nameForm.value;
        this._aboutProfile.textContent = this._aboutForm.value;

    };
};