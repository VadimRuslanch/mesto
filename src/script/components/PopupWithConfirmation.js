import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector)
        this._form = this._popup.querySelector('.popup__save-button');
    };

    submitCallback(removing) {
        this._handleSubmit = removing;
    };

    setEventListeners() {
        super._setEventListeners();
        this._form.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    };
};