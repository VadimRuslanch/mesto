export class FormValidator {
  constructor(setting, formElement) {
    this._formSelector = setting.formSelector;
    this._inputSelector = setting.inputSelector;
    this._submitButtonSelector = setting.submitButtonSelector;
    this._inactiveButtonClass = setting.inactiveButtonClass;
    this._inputErrorClass = setting.inputErrorClass;
    this._errorClass = setting.errorClass;
    this._formList = setting.formList;
    this._formElement = formElement;
  };
 
  _showInputError = (formSelector, inputSelector, errorMessage) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
    
  _hideInputError = (formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
    
  _isValid = (formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
      this._showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(formSelector, inputSelector);
    }
  };
    
  _searchInput = (formSelector) => {
    const inputList = Array.from(formSelector.querySelectorAll(this._inputSelector))
    const submitButtonSelector = formSelector.querySelector(this._submitButtonSelector)
    this._toggleButtonState(inputList, submitButtonSelector)
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () =>{
        this._isValid(formSelector, inputSelector)
        this._toggleButtonState(inputList, submitButtonSelector)
      });
    });
  };
    
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }
    
  _toggleButtonState = (inputList, submitButtonSelector) => {
    if(this._hasInvalidInput(inputList)){
      submitButtonSelector.classList.add(this._inactiveButtonClass)
      submitButtonSelector.setAttribute("disabled", "disabled");
    } else {
      submitButtonSelector.classList.remove(this._inactiveButtonClass)
      submitButtonSelector. removeAttribute("disabled", "disabled");
    }
  }
  
  enableValidation = () => {
    const formList = document.querySelectorAll(this._formSelector);
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
          evt.preventDefault()
      });
      this._searchInput(formSelector)
    });
  };
  
};