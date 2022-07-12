const main = document.querySelector(".main");

const formProfile = main.querySelector('#form__profile')
const formImages = main.querySelector('#form__images')
const elementsList = document.querySelector('.elements');

const elementTemplate = document.querySelector('#elementTemplate').content;
const elementList = elementTemplate.querySelector('.element');

const popupProfile = main.querySelector('#popup_profile');
const popupImages = main.querySelector('#popup_images');
const popupOpen = main.querySelector('.popup_opened');
const popupImage = main.querySelector('#popup_image');

const closeButtonProfile = main.querySelector('#button-close_profile');
const closeButtonImages = main.querySelector('#button-close_images');
const closeButtonPopupImage = main.querySelector('#button-close_popup-image');
const saveButtonProfile = main.querySelector('#button-save_profile');
const saveButtonImages = main.querySelector('#button-save_images');
const addButton = main.querySelector('.profile__button-add');
const editButton = main.querySelector(".profile__button-edit");

let profileName = main.querySelector('.profile__info-name');
let profileAboutMe = main.querySelector('.profile__info-about-me');

let nameInput = popupProfile.querySelector('#form__input-name');
let aboutInput = popupProfile.querySelector('#form__input-about-me');

let titleInput = popupImages.querySelector('#form__input-title');
let linkInput = popupImages.querySelector('#form__input-link');

editButton.addEventListener('click', function openPopupProfile(){
  popupProfile.classList.add('popup_opened')
  nameInput.value = profileName.textContent
  aboutInput.value = profileAboutMe.textContent
});

addButton.addEventListener('click', function openPopupImages(){
  popupImages.classList.add('popup_opened')
});

function closePopupProfile(){
  popupProfile.classList.remove('popup_opened')
}

closeButtonProfile.addEventListener('click', closePopupProfile);

function closePopupImages(){
  popupImages.classList.remove('popup_opened')
}

closeButtonImages.addEventListener('click', closePopupImages);

formProfile.addEventListener('submit', function formSubmitHandlerProfile (event) {
	event.preventDefault();
  profileName.textContent = nameInput.value
  profileAboutMe.textContent = aboutInput.value
  closePopupProfile();
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementImgs = initialCards.forEach( (item) => {
  const elementsCopy = elementTemplate.cloneNode('true');
  const deleteButton = elementsCopy.querySelector('.element__trash');
  const imageButton = elementsCopy.querySelector('.element__button-img');


  elementsCopy.querySelector('.element__img').src = item.link
  elementsCopy.querySelector('.element__text').textContent = item.name

  elementsCopy.querySelector('.element__like').addEventListener('click',(e) => {
    e.target.classList.toggle('element__like_active');
  })

  elementsCopy.querySelector('.element__trash').addEventListener('click', function delet(){
    const deleteImg = deleteButton.closest('.element')
    deleteImg.remove();
  });
  
  imageButton.addEventListener('click', function openPopupImage(){
    popupImage.classList.add('popup_opened');
    main.querySelector('.popup__image-open').src = item.link
    main.querySelector('.popup__text-open').textContent = item.name
  });

  elementsList.append(elementsCopy)
});

formImages.addEventListener('submit', function formSubmitHandlerImages(event) {
	event.preventDefault();
  const elementsCopy = elementTemplate.cloneNode('true');
  const deleteButton = elementsCopy.querySelector('.element__trash');
  const imageButton = elementsCopy.querySelector('.element__button-img');

  elementsCopy.querySelector('.element__img').src = popupImages.querySelector('#form__input-link').value;
  elementsCopy.querySelector('.element__text').textContent = popupImages.querySelector('#form__input-title').value;

  elementsCopy.querySelector('.element__like').addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active');
  });

  elementsCopy.querySelector('.element__trash').addEventListener('click', function delet(){
    const deleteImg = deleteButton.closest('.element')
    deleteImg.remove();
  });

  imageButton.addEventListener('click', function openPopupImage(){
    popupImage.classList.add('popup_opened');
    main.querySelector('.popup__image-open').src = popupImages.querySelector('#form__input-link').value;
    main.querySelector('.popup__text-open').textContent = popupImages.querySelector('#form__input-title').value;
  });

  elementsList.prepend(elementsCopy)
  closePopupImages();
});

closeButtonPopupImage.addEventListener('click', () =>{
  popupImage.classList.remove('popup_opened');
});