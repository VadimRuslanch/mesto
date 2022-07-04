let main = document.querySelector(".main");
let editButton = main.querySelector(".profile__edit-button");
let form = main.querySelector('.form')

let popup = main.querySelector('.popup');
let popupOpen = main.querySelector('.popup_opened');
let closeButton = main.querySelector('.form__button-close');
let addButton = main.querySelector('.profile__add-button');

let profileName = main.querySelector('.profile__info-name');
let profileAboutMe = main.querySelector('.profile__info-about-me');

let nameInput = popup.querySelector('#form__input-name');
let aboutInput = popup.querySelector('#form__input-about-me');
let saveButton = popup.querySelector('.form__button-save');
let titleInput = popup.querySelector('#form__input-title');
let linkInput = popup.querySelector('#form__input-link');

function openPopup(){
  popup.classList.add('popup_opened')
  nameInput.value = profileName.textContent
  aboutInput.value = profileAboutMe.textContent
};

function closePopup(){
  popup.classList.remove('popup_opened')
};

function formSubmitHandler (event) {
	event.preventDefault();
    profileName.textContent = nameInput.value
    profileAboutMe.textContent = aboutInput.value
    closePopup();
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);
form.addEventListener('submit', formSubmitHandler);


const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content;

const elementImg = elementTemplate.querySelector('.element__img');
const elementText = elementTemplate.querySelector('.element__text');



function openImgPopup(){
  popup.classList.add('popup_opened')
  titleInput.value = elTitil.textContent
  linkInput.value = elImg.src
};

addButton.addEventListener('click', openImgPopup);

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

const elementImgs = initialCards.forEach(function(item){
  const elementsCopy = elementTemplate.cloneNode('false')
  
  elementImg.src = item.link
  elementText.textContent = item.name

  elementsList.append(elementsCopy)
})


// elements.querySelector('.element__img').src = "";
// elements.querySelector('.element__text').textContent = "";