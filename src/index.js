import './style/index.css';
import {
  initialCards,
  validationConfig,
  formProfile,
  formImage,
  сardElements,
  buttonAdd,
  popupOpenImage,
  buttonEdit,
  userNameSubmit,
  userAboutSubmit,
  userName,
  userAbout,
  popupAddImage,
  popupProfile,
  openedCardImage,
  openedCardName,
} from './utils/constants.js'
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

const formProfileValidation = new FormValidator(validationConfig, formProfile);
const formImageValidation = new FormValidator(validationConfig, formImage);
const popupWithImage = new PopupWithImage(popupOpenImage, openedCardImage, openedCardName);


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
}, сardElements)
сardList.rendererItems()

const submitImage = new PopupWithForm(popupAddImage, {
  handleFormSubmit: (data) => {
    сardList.addItem(creadeCard(data));
    submitImage.close();
    formImageValidation.resetValidation();
  }
})
submitImage.setEventListeners();
buttonAdd.addEventListener('click', () => {
  submitImage.open()
});

const userInfo = new UserInfo(popupProfile, {
  nameElement: userName,
  aboutElement: userAbout,
});


const submitProfile = new PopupWithForm(popupProfile, {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    submitProfile.close();
    formProfileValidation.resetValidation();
  }
});
submitProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {
  userNameSubmit.value = userInfo.getUserInfo().name;
  userAboutSubmit.value = userInfo.getUserInfo().about;
  submitProfile.open();
});