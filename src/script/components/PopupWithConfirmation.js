import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector)
        this._submitButton = this._popup.querySelector('.popup__save-button');
    };

    setSubmitCallback(removing) {
        this._handleSubmit = removing;
    };

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    };
};