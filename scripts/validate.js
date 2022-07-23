const showInputError = (validationConfig, formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
  
const hideInputError = (validationConfig, formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};
  
const isValid = (validationConfig, formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(validationConfig, formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(validationConfig, formSelector, inputSelector);
  }
};
  
const searchInput = (validationConfig, formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector))
  const submitButtonSelector = formSelector.querySelector(validationConfig.submitButtonSelector)
  toggleButtonState(validationConfig, inputList, submitButtonSelector)
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () =>{
      isValid(validationConfig, formSelector, inputSelector)
      toggleButtonState(validationConfig, inputList, submitButtonSelector)
    });
  });
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}
  
const toggleButtonState = (validationConfig, inputList, submitButtonSelector) => {
  if(hasInvalidInput(inputList)){
    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass)
  } else {
    submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass)
  }
}

const enableValidation = (validationConfig) => {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault()
    });
    searchInput(validationConfig, formSelector)
  });
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

enableValidation(validationConfig)