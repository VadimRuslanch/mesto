let main = document.querySelector(".main");
let editButton = main.querySelector(".profile__edit-button");
let form = main.querySelector('.form')

let popup = main.querySelector('.popup');
let popupOpen = main.querySelector('.popup_opened');
let closeButton = main.querySelector('.form__button-close');

let profileName = main.querySelector('.profile__info-name');
let profileAboutMe = main.querySelector('.profile__info-about-me');

let nameInput = popup.querySelector('.form__input_name');
let aboutInput = popup.querySelector('.form__input_about-me');
let saveButton = popup.querySelector('.form__button-save')

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
