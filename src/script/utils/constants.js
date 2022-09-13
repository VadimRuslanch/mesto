export const main = document.querySelector(".main");
export const userNameSubmit = main.querySelector('#input-name');
export const userAboutSubmit = main.querySelector('#input-about-me');
export const buttonAdd = main.querySelector('.profile__add-button');
export const buttonEditAvatar = main.querySelector(".profile__avatar-button");
export const buttonEditUser = main.querySelector(".profile__edit-button");
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButton: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  formList: document.querySelectorAll('.popup__form'),
};