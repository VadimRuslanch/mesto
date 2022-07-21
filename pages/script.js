const main = document.querySelector(".main");
const elementsList = main.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content.querySelector('.element');

const popupOpenImage = main.querySelector('#popup_open-image');
const popupProfile = main.querySelector('#popup_profile');
const popupAddImage = main.querySelector('#popup_add-image');
const popupOpen = main.querySelector('.popup_opened');
const popupFormProfile = main.querySelector('#form-profile');
const popupFormImage = main.querySelector('#form-image');
const popupElement = document.querySelectorAll('.popup')
const popupClose = document.querySelectorAll('#popup-close-Esc_Click')

const closeButtons = document.querySelectorAll('.popup__close-button');
const buttonClose = main.querySelector('.popup__close-button');
const buttonSaveProfile = main.querySelector('#save-button_profile');
const buttonSaveImages = main.querySelector('#save-button_images');
const buttonAdd = main.querySelector('.profile__add-button');
const buttonEdit = main.querySelector('.profile__edit-button');

const profileName = main.querySelector('.profile__info-name');
const profileAboutMe = main.querySelector('.profile__info-about-me');
const nameInput = popupProfile.querySelector('#input-name');
const aboutInput = popupProfile.querySelector('#input-about-me');
const titleInput = popupAddImage.querySelector('#input-title');
const linkInput = popupAddImage.querySelector('#input-link');
const popupImage = main.querySelector('.popup__image')
const popupText = main.querySelector('.popup__text')
const popupAltImage = main.querySelector('.popup__image')

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Горный пейзаш Архыза'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Озеро в заснеженной тайге'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Серые хрущевки'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатская вершина с виднеющим ледяным покровом'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога и лес'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Скалистый берег Байкала'
  }
];

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

closeButtons.forEach((buttonClose) => {
  const popup = buttonClose.closest('.popup');
  buttonClose.addEventListener('click', () => closePopup(popup));
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAboutMe.textContent;
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAddImage);
});

popupFormProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value
  profileAboutMe.textContent = aboutInput.value
  closePopup(popupProfile);
});

function createImage(item) {
  const elementCopy = createCard (item)
  elementsList.prepend(elementCopy)
}

function createCard(item){
  const cardElement = elementTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector('.element__img');
  const textElement = cardElement.querySelector('.element__text');
  imageElement.src = item.link
  textElement.textContent = item.name
  imageElement.alt = item.alt;
  setEventListeners(cardElement, imageElement, textElement);
  return cardElement;
}

initialCards.reverse();
initialCards.forEach(createImage);

function addImage(elementCopy) {
  createImage(elementCopy)
}

popupFormImage.addEventListener('submit', function (event) {
  event.preventDefault();
  const item = {};
  item.link = linkInput.value;
  item.name = titleInput.value;
  addImage(item)
  closePopup(popupAddImage);
  event.target.reset()
});

elementsList.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('element__like')){
    evt.target.classList.toggle('element__like_active');
  }
})

function setEventListeners(cardElement, imageElement, textElement) {
  cardElement.querySelector('.element__trash').addEventListener('click', () => {
    cardElement.remove()
  })

  cardElement.querySelector('.element__button-img').addEventListener('click', function () {
    openPopup(popupOpenImage)
    popupImage.src = imageElement.src
    popupText.textContent = textElement.textContent
    popupImage.alt = imageElement.alt
  });
}

function searchPopup(popupClose){
  const popup = popupClose.closest('.popup');
  closePopup(popup)
}

function keyHandler(evt){
  if (evt.key === 'Escape'){
    popupElement.forEach(searchPopup)
  }
  return console.log(evt.key)
}

document.addEventListener('keydown', keyHandler)

function mouseHandler(evt){
  evt.target.classList.remove('popup_opened')
}

document.addEventListener('click', mouseHandler)

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