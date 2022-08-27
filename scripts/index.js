import {
  initialCards,
  validationConfig,
  formProfile,
  formImage,
  CardElements,
  buttonAdd,
  popupOpenImage,
  buttonEdit,
  nameInput,
  aboutInput,
  profileName,
  profileAboutMe,
  titleInput,
  linkInput,
  popupAddImage,
  popupProfile,
} from '../utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formProfileValidation = new FormValidator(validationConfig, formProfile);
const formImageValidation = new FormValidator(validationConfig, formImage);
const popupWithImage = new PopupWithImage(popupOpenImage);
const userInfo = new UserInfo(nameInput, aboutInput, profileName, profileAboutMe);

initialCards.reverse();
formProfileValidation.enableValidation();
formImageValidation.enableValidation();

const creadeCard = (data) => {
  const card = new Card(data, "#elementTemplate", {
    handleCardClick: (name, link) => {
      popupWithImage.handleCardClick(name, link)
    }
  });
  return card.generateCard();
}

const сardList = new Section({
  items: initialCards,
  renderer: (data) => {
    сardList.addItem(creadeCard(data))
  }
}, CardElements)
сardList.rendererItems()

const submitImage = new PopupWithForm(popupAddImage, {
  handleFormSubmit: (data) => {
    сardList.addItem(creadeCard(data));
    submitImage.close();
    console.log(data)
  }
})
submitImage.setEventListeners();

const submitProfile = new PopupWithForm(popupProfile, {
  handleFormSubmit: () => {
    userInfo.setUserInfo()
    submitProfile.close()
  }
});
submitProfile.setEventListeners();

buttonAdd.addEventListener('click', () => {
  submitImage.open()
});

buttonEdit.addEventListener('click', () => {
  userInfo.getUserInfo()
  submitProfile.open()
});