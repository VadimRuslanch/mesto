import "./style/index.css"
import {
  validationConfig, userNameSubmit, userAboutSubmit, buttonAdd, buttonEdit, buttonEditAvatar, userAvatar
} from './script/utils/constants.js'
import Card from './script/components/Card.js';
import FormValidator from './script/components/FormValidator.js';
import Section from './script/components/Section.js';
import PopupWithImage from './script/components/PopupWithImage.js';
import PopupWithForm from './script/components/PopupWithForm.js';
import PopupWithConfirmation from './script/components/PopupWithConfirmation.js';
import UserInfo from './script/components/UserInfo.js';
import Api from './script/components/Api.js';

/* -------------- Валидация --------------- */

const formProfileValidation = new FormValidator(validationConfig, '#form-profile');
const formAvatarValidation = new FormValidator(validationConfig, '#form-avatar');
const formImageValidation = new FormValidator(validationConfig, '#form-image');
formProfileValidation.enableValidation();
formAvatarValidation.enableValidation();
formImageValidation.enableValidation();

/* -------------- API --------------- */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '278ad23c-54e7-41b4-b653-b024325dde52',
    'Content-Type': 'application/json'
  }
})

/* -------------- Профиль юзера --------------- */

let userId

// Загрузка данных пользователя и карточек
Promise.all([api.getCard(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    сardList.rendererItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// отображение инфы о Юзере
const userInfo = new UserInfo({
  nameElement: ".profile__info-name",
  aboutElement: ".profile__info-about-me",
  avatar: ".profile__avatar"
});

// Отправка формы пользователя на сервер
const submitProfile = new PopupWithForm({
  popupElement: '#popup-profile',
  handleFormSubmit: (userData) => {
    submitProfile.loading(true)
    api.editUserInfo(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        submitProfile.close();
      })
      .finally(() => {
        submitProfile.loading(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

// отправка аватара на сервер
const submitAvatar = new PopupWithForm({
  popupElement: '#popup-avatar',
  handleFormSubmit: (userData) => {
    submitAvatar.loading(true);
    api.editUserAvatar(userData)
      .then((userData) => {
        userAvatar.src = userData.avatar;
        submitAvatar.close()
      })
      .finally(() => {
        submitAvatar.loading(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

/* -------------- Карточки --------------- */

const viewImagePopup = new PopupWithImage('#popup-open-image');

// Функция создания новой карточки
const creadeCard = (data) => {
  const card = new Card({
    data: data,
    userId: userId,
    templateSelector: "#elementTemplate",
    handleCardClick: (name, link) => {
      viewImagePopup.handleCardClick(name, link)
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api.delete(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleClickIconeDelete: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.removeElement();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      })
    }
  });
  return card.generateCard();
};

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '#popup-delete-image'
});

// // Добавлние карточки на сайт
const сardList = new Section({
  renderer: (card) => сardList.addItem(creadeCard(card)),
  containerSelector: '.elements'
});

// Отправка даннах картинки на сервер
const submitImage = new PopupWithForm({
  popupElement: '#popup-add-image',
  handleFormSubmit: (formData) => {
    submitImage.loading(true);
    api.addCard(formData)
      .then((formData) => {
        сardList.addItem(creadeCard(formData));
        submitImage.close();
      })
      .finally(() => {
        submitImage.loading(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

submitProfile.setEventListeners();
submitAvatar.setEventListeners();
deleteCardPopup.setEventListeners();
submitImage.setEventListeners();

/* -------------- Слушатели --------------- */

buttonEdit.addEventListener('click', () => {
  formProfileValidation.toggleButtonState();
  userNameSubmit.value = userInfo.getUserInfo().name;
  userAboutSubmit.value = userInfo.getUserInfo().about;
  submitProfile.open();
});

buttonEditAvatar.addEventListener('click', () => {
  formAvatarValidation.toggleButtonState();
  submitAvatar.open();
});

buttonAdd.addEventListener('click', () => {
  formImageValidation.toggleButtonState();
  submitImage.open()
});