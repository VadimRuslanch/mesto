const main = document.querySelector(".main");
const elementsList = main.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content.querySelector('.element');
const popupElement = document.querySelectorAll('.popup');
const popupOpen = document.querySelectorAll('.popup_opened');
const popupContainer = document.querySelectorAll('.popup__container');
const popupOpenImage = main.querySelector('#popup-open-image');
const popupProfile = main.querySelector('#popup-profile');
const popupAddImage = main.querySelector('#popup-add-image');
const popupFormProfile = main.querySelector('#form-profile');
const popupFormImage = main.querySelector('#form-image');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const buttonSaveProfile = main.querySelector('#save-button-profile');
const buttonSaveImages = main.querySelector('#save-button-images');
const buttonAdd = main.querySelector('.profile__add-button');
const buttonEdit = main.querySelector('.profile__edit-button');
const profileName = main.querySelector('.profile__info-name');
const profileAboutMe = main.querySelector('.profile__info-about-me');
const nameInput = popupProfile.querySelector('#input-name');
const aboutInput = popupProfile.querySelector('#input-about-me');
const titleInput = popupAddImage.querySelector('#input-title');
const linkInput = popupAddImage.querySelector('#input-link');
const popupImage = main.querySelector('.popup__image');
const popupText = main.querySelector('.popup__text');
const popupAltImage = main.querySelector('.popup__image');
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

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', keydownHendler)
  document.removeEventListener('click', clickHandler)
};

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', keydownHendler)
  document.addEventListener('click', clickHandler)
};

const seachAndClosePopup = () =>{
    popupElement.forEach((popupProfile) => {
    const popup = popupProfile.closest('.popup')
    closePopup(popup)
  })
}

const clickHandler = (evt) => {
  if(evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')){
    seachAndClosePopup()
  }
}

const keydownHendler = (evt) => {
  const keyEsc = evt.key ==='Escape';
  if (keyEsc){
    seachAndClosePopup()
  }
}

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

function addCard(item) {
  const newCard = createCard (item)
  elementsList.prepend(newCard)
}

function createCard(item){
  const cardElement = elementTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector('.element__img');
  const textElement = cardElement.querySelector('.element__text');
  imageElement.src = item.link
  textElement.textContent = item.name
  imageElement.alt = item.name;
  setEventListeners(cardElement, imageElement, textElement);
  return cardElement;
}

initialCards.reverse();
initialCards.forEach(addCard);
function addImage(newCard) {
  addCard(newCard)
}

popupFormImage.addEventListener('submit', function (evt) {
  const item = {
    name: titleInput.value,
    link: linkInput.value,
  };
  addImage(item)
  closePopup(popupAddImage);
  evt.target.reset()
  buttonSaveImages.classList.add('popup__save-button_disabled')
});

function setEventListeners(cardElement, imageElement, textElement) {
  cardElement.querySelector('.element__trash').addEventListener('click', () => {
    cardElement.remove()
  })
  cardElement.querySelector('.element__button-img').addEventListener('click', function () {
    openPopup(popupOpenImage)
    popupImage.src = imageElement.src
    popupText.textContent = textElement.textContent
    popupImage.alt = textElement.textContent
  });
  cardElement.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('element__like')){
      evt.target.classList.toggle('element__like_active');
    }
  })
}