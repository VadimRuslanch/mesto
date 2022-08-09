export class FormValidator {
  constructor(setting, formElement) {
    this._formElement = formElement;
    this._inputSelector = setting.inputSelector;
    this._submitButton = setting.submitButton;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._errorClass = setting.errorClass;
    this._formList = setting.formList;
  };

  _showInputError = (inputSelector, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputSelector) => {
    const errorElement = this._formElement.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _isValid = (inputSelector) => {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass)
      this._submitButtonSelector.setAttribute("disabled", "disabled");
    } else {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass)
      this._submitButtonSelector.removeAttribute("disabled", "disabled");
    }
  }

  _searchInput = () => {
    this._inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._isValid(inputSelector)
        this._toggleButtonState(inputSelector)
      });
    });
  };

  _setEventListeners = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = this._formElement.querySelector(this._submitButton);
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  };

  enableValidation = () => {
    this._setEventListeners()
    this._searchInput()
    this._toggleButtonState()
  };
};