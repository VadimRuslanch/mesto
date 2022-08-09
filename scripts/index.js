import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js'
const main = document.querySelector(".main");
const profileName = main.querySelector('.profile__info-name');
const profileAboutMe = main.querySelector('.profile__info-about-me');
const buttonAdd = main.querySelector('.profile__add-button');
const buttonEdit = main.querySelector('.profile__edit-button');
const CardElements = document.querySelector('.elements');
const popupElement = document.querySelectorAll('.popup');
const popupProfile = main.querySelector('#popup-profile');
const popupAddImage = main.querySelector('#popup-add-image');
const buttonSaveImages = main.querySelector('#save-button-images');
const popupOpenImage = document.querySelector('#popup-open-image');
const formProfile = popupProfile.querySelector('#form-profile');
const formImage = popupAddImage.querySelector('#form-image');
const nameInput = formProfile.querySelector('#input-name');
const aboutInput = formProfile.querySelector('#input-about-me');
const titleInput = formImage.querySelector('#input-title');
const linkInput = formImage.querySelector('#input-link');
const openedCardImage = document.querySelector('.popup__image');
const openedCardName = document.querySelector('.popup__text');
const validationConfig = {
  inputSelector: '.popup__input',
  submitButton: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  formList: document.querySelectorAll('.popup__form'),
};
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
initialCards.reverse();

function createCard(item) {
  const card = new Card(item, "#elementTemplate", handleCardClick);
  const cardElement = card.generateCard()
  CardElements.prepend(cardElement)
  return cardElement
}

(() => {
  initialCards.forEach((item) => {
    createCard(item)
  });
})();

formImage.addEventListener('submit', (evt) => {
  const item = {
    name: titleInput.value,
    link: linkInput.value,
  };
  createCard(item)
  closePopup(popupAddImage);
  evt.target.reset()
  FormValidator.resetValidation()
});

const formProfileClassValid = new FormValidator(validationConfig, formProfile);
formProfileClassValid.enableValidation();

const formImageClassValid = new FormValidator(validationConfig, formImage);
formImageClassValid.enableValidation();

// закрытие мадального окна
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownHendler)
  popupElement.removeEventListener('click', clickOnPopupHandler)
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

function handleCardClick(name, link) {
  openedCardImage.src = link;
  openedCardName.textContent = name;
  openedCardImage.alt = name;
  openPopup(popupOpenImage);
}

// отправка формы профиля
buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAboutMe.textContent;
});

formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value
  profileAboutMe.textContent = aboutInput.value
  closePopup(popupProfile);
})
