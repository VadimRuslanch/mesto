const showInputError = (item, formSelector, inputSelector, errorMessage) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.add(item.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(item.errorClass);
  };
  
  const hideInputError = (item, formSelector, inputSelector) => {
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
    inputSelector.classList.remove(item.inputErrorClass);
    errorElement.classList.remove(item.errorClass);
    errorElement.textContent = '';
  };
  
  const isValid = (item, formSelector, inputSelector) => {
    if (!inputSelector.validity.valid) {
      showInputError(item, formSelector, inputSelector, inputSelector.validationMessage);
    } else {
      hideInputError(item, formSelector, inputSelector);
    }
  };
  
  const searchInput = (item, formSelector) => {
    const inputList = Array.from(formSelector.querySelectorAll(item.inputSelector))
    const submitButtonSelector = formSelector.querySelector(item.submitButtonSelector)
    toggleButtonState(item, inputList, submitButtonSelector)
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () =>{
        isValid(item, formSelector, inputSelector)
        toggleButtonState(item, inputList, submitButtonSelector)
      });
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  
  }
  
  const toggleButtonState = (item, inputList, submitButtonSelector) => {
    if(hasInvalidInput(inputList)){
      submitButtonSelector.classList.add(item.inactiveButtonClass)
    } else {
      submitButtonSelector.classList.remove(item.inactiveButtonClass)
    }
  }
  
  const enableValidation = (item) => {
    const formList = Array.from(document.querySelectorAll(item.formSelector));
    formList.forEach((formSelector) => {
      formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault()
      });
      searchInput(item, formSelector)
    });
  };
  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  })