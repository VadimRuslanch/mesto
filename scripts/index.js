import {
  initialCards,
  validationConfig,
  formProfile,
  formImage,
  CardElements,
  buttonAdd,
  // openedCardImage,
  // openedCardName,
  popupOpenImage,
  buttonEdit,
  nameInput,
  aboutInput,
  popupAddImage,
  popupProfile,
  profileName,
  profileAboutMe,
} from '../utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

initialCards.reverse();

const formProfileValidation = new FormValidator(validationConfig, formProfile);
formProfileValidation.enableValidation();

const formImageValidation = new FormValidator(validationConfig, formImage);

const popupWithImage = new PopupWithImage(popupOpenImage);

const CardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#elementTemplate", popupWithImage.handleCardClick);
    const cardElement = card.generateCard();
    CardList.addItem(cardElement)
    
  }
}, CardElements)
CardList.renderedItems()

// const popupWithForm = new PopupWithForm()

formProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutInput.value;
  const popup = new Popup(popupProfile)
  popup.open();
});





formImage.addEventListener('submit', (evt) => {
  const item = {
    name: titleInput.value,
    link: linkInput.value,
  };
  addCard(item)
  closePopup(popupAddImage);
  evt.target.reset();
  formImageValidation.resetValidation();
});






buttonAdd.addEventListener('click', () => {
  const popup = new Popup(popupAddImage)
  popup.open()
});

buttonEdit.addEventListener('click', () => {
  const popup = new Popup(popupProfile)
  popup.open();
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAboutMe.textContent;
});


