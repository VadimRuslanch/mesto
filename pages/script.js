const main = document.querySelector(".main");
const elementsList = main.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content.querySelector('.element');

const popupOpenImage = main.querySelector('#popup_open-image');
const popupProfile = main.querySelector('#popup_profile');
const popupAddImage = main.querySelector('#popup_add-image');
const popupOpen = main.querySelector('.popup_opened');

const popupFormProfile = main.querySelector('#form__profile');
const popupFormImage = main.querySelector('#popup_form-image');

const buttonCloseProfile = main.querySelector('#close-button_profile');
const buttonCloseImages = main.querySelector('#close-button_image');
const buttonCloseImageOpened = main.querySelector('#close-button_popup-image');
const buttonSaveProfile = main.querySelector('#save-button_profile');
const buttonSaveImages = main.querySelector('#save-button_images');
const buttonAdd = main.querySelector('.profile__add-button');
const buttonEdit = main.querySelector('.profile__edit-button');

const profileName = main.querySelector('.profile__info-name');
const profileAboutMe = main.querySelector('.profile__info-about-me');

const nameInput = popupProfile.querySelector('#form__input-name');
const aboutInput = popupProfile.querySelector('#form__input-about-me');

const titleInput = popupAddImage.querySelector('#form__input-title');
const linkInput = popupAddImage.querySelector('#form__input-link');

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

function closePopup(popupElement){
  popupElement.classList.remove('popup_opened');
};

buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

buttonCloseImages.addEventListener('click', () => {
  closePopup(popupAddImage);
  popupAddImage.querySelector('#form__input-link').value.reset()
  popupAddImage.querySelector('#form__input-title').value.reset()
});

function openPopup(popupElement){
  popupElement.classList.add('popup_opened');
  popupFormImage.reset()
};

buttonEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAboutMe.textContent;
});

buttonAdd.addEventListener('click', () => {
  openPopup(popupAddImage);
});


popupFormProfile.addEventListener('submit', function formSubmitHandlerProfile (event) {
	event.preventDefault();
  profileName.textContent = nameInput.value
  profileAboutMe.textContent = aboutInput.value
  closePopup(popupProfile);
});

buttonCloseImageOpened.addEventListener('click', () =>{
  closePopup(popupOpenImage);
});

function addImage(elementCopy){
  creadImage(elementCopy)
}

function creadImage(item){
  const elementCopy = elementTemplate.cloneNode(true);
  elementCopy.querySelector('.element__img').src = item.link
  elementCopy.querySelector('.element__text').textContent = item.name
  elementCopy.querySelector('.element__img').alt = item.alt;
  elementsList.prepend(elementCopy);
  likeAndDelete(elementCopy);
  return elementCopy;
}

function renderImage(elementCopy){
  elementsList.prepend(creadImage(elementCopy))
}

initialCards.reverse();
initialCards.forEach(renderImage);

popupFormImage.addEventListener('submit', function (event) {
	event.preventDefault();
  const link = popupAddImage.querySelector('#form__input-link').value
  const name = popupAddImage.querySelector('#form__input-title').value
  const item = {};
  item.link = link;
  item.name = name;
  addImage(item)
  closePopup(popupAddImage);
});

function likeAndDelete(elementCopy){
  elementCopy.querySelector('.element__like').addEventListener('click', (event) => {
    event.target.classList.toggle('element__like_active');
  });
  
  elementCopy.querySelector('.element__trash').addEventListener('click', () => {
    const deleteImg = elementCopy.querySelector('.element__trash').closest('.element');
    deleteImg.remove();
  })

  elementCopy.querySelector('.element__button-img').addEventListener('click', function (){
    openPopup(popupOpenImage)
    main.querySelector('.popup__image').src = elementCopy.querySelector('.element__img').src
    main.querySelector('.popup__text').textContent = elementCopy.querySelector('.element__text').textContent
    
  });
}


