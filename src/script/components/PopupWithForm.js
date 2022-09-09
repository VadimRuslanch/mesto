import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupElement, handleFormSubmit }) {
        super(popupElement);
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._popup.querySelectorAll(".popup__input");
        this._saveButton = this._popup.querySelector(".popup__save-button");
        this._saveButtonText = this._saveButton.value;
        this._handleFormSubmit = handleFormSubmit;
    };
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(data => {
            this._formValues[data.name] = data.value;
        });
        return this._formValues;
    };

    // setInputValues(data) {
    //     this._inputList.forEach((input) => {
    //         console.log(data[input.name])
    //       input.value = data[input.name];
    //     });
    //   }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    };

    close() {
        super.close();
        this._form.reset();
    };

    loading(data) {
        if (data) {
            this._saveButton.value = "Сохранение...";
        } else {
            this._saveButton.value = this._saveButtonText;
        };
    };
};