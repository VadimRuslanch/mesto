let main = document.querySelector(".main")

let editButton = main.querySelector(".profile__edit-button")

let popup = main.querySelector('.popup')
let popupOpen = main.querySelector('.popup_opened')
let closeButton = main.querySelector('.form__button-close')


function closePopup(){
    popup.classList.remove('popup_opened')
}

function openPopup(){
    popup.classList.add('popup_opened')
}

closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);