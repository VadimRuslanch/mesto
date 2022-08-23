export const main = document.querySelector(".main");
export const profileName = main.querySelector('.profile__info-name');
export const profileAboutMe = main.querySelector('.profile__info-about-me');
export const buttonAdd = main.querySelector('.profile__add-button');
export const buttonEdit = main.querySelector('.profile__edit-button');
export const CardElements = document.querySelector('.elements');
export const popupElement = document.querySelectorAll('.popup');
export const popupProfile = main.querySelector('#popup-profile');
export const popupAddImage = main.querySelector('#popup-add-image');
export const popupOpenImage = document.querySelector('#popup-open-image');
export const formProfile = popupProfile.querySelector('#form-profile');
export const formImage = popupAddImage.querySelector('#form-image');
export const nameInput = formProfile.querySelector('#input-name');
export const aboutInput = formProfile.querySelector('#input-about-me');
export const titleInput = formImage.querySelector('#input-title');
export const linkInput = formImage.querySelector('#input-link');
export const openedCardImage = document.querySelector('.popup__image');
export const openedCardName = document.querySelector('.popup__text');
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButton: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  formList: document.querySelectorAll('.popup__form'),
};
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];