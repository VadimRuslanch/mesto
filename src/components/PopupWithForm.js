import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupElement, { handleFormSubmit }) {
        super(popupElement);
        this._form = popupElement.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = popupElement.querySelectorAll(".popup__input");
    };
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(data => {
            this._formValues[data.name] = data.value;
        });
        return this._formValues;
    };

    setEventListeners() {
        super._setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    };

    close() {
        super.close();
        this._form.reset();
    };
};