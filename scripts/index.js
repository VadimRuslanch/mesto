import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js'
const main = document.querySelector(".main");
const popupElement = document.querySelectorAll('.popup');
const popupProfile = main.querySelector('#popup-profile');
const popupAddImage = main.querySelector('#popup-add-image');
const popupFormProfile = main.querySelector('#form-profile');
const popupFormImage = document.querySelector('#form-image');
const buttonSaveImages = main.querySelector('#save-button-images');
const buttonAdd = main.querySelector('.profile__add-button');
const buttonEdit = main.querySelector('.profile__edit-button');
const popupOpenImage = document.querySelector('#popup-open-image');
const profileName = main.querySelector('.profile__info-name');
const profileAboutMe = main.querySelector('.profile__info-about-me');
const nameInput = popupProfile.querySelector('#input-name');
const aboutInput = popupProfile.querySelector('#input-about-me');
const titleInput = document.querySelector('#input-title');
const linkInput = document.querySelector('#input-link');
const initialCards = [
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
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  formList: document.querySelectorAll('.popup__form'),
};

(() => {
  initialCards.reverse();
  initialCards.forEach((item) => {
    const card = new Card(item, "#elementTemplate");
    const cardElement = card.generateCard()
    document.querySelector('.elements').prepend(cardElement)
  });
})();

const formImage = new FormValidator(validationConfig, '#popup-add-image')
formImage.enableValidation()

const formProfile = new FormValidator(validationConfig, '#popup-profile')
formProfile.enableValidation();

popupFormImage.addEventListener('submit', (evt) => {
  const item = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const newCard = new Card(item, "#elementTemplate")
  const newCardElement = newCard.generateCard()
  document.querySelector('.elements').prepend(newCardElement)
  closePopup(popupAddImage);
  evt.target.reset()
  buttonSaveImages.classList.add('popup__save-button_disabled')
});

// закрытие мадального окна
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownHendler)
  document.removeEventListener('click', clickOnPopupHandler)
};

function searchAndCloseClickOpenedPopup(evt) {
  const openedPopup = evt.currentTarget;
  closePopup(openedPopup);
}

function clickOnPopupHandler(evt) {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
    searchAndCloseClickOpenedPopup(evt)
  }
}

function searchAndCloseEscOpenedPopup() {
  popupElement.forEach((popupProfile) => {
    const openedPopup = popupProfile.closest('.popup')
    closePopup(openedPopup)
  })
}

function keydownHendler(evt) {
  const keyEsc = evt.key === 'Escape';
  if (keyEsc) {
    searchAndCloseEscOpenedPopup()
  }
}

// открытие мадального окна
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', keydownHendler)
  popupElement.addEventListener('click', clickOnPopupHandler)
}

buttonAdd.addEventListener('click', () => {
  openPopup(popupAddImage);
});

// отправка формы профиля
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAboutMe.textContent;
});

popupFormProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value
  profileAboutMe.textContent = aboutInput.value
  closePopup(popupProfile);
})

export { openPopup, popupOpenImage }