import "./index.css";
import { validationConfig, userNameSubmit, userAboutSubmit, buttonAdd, buttonEditUser, buttonEditAvatar } from '../utils/constants.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Cart.js';
import Api from '../components/Api.js';

/* -------------- Валидация --------------- */

const formValidators = {};

const enableValidation = (config) => {
  const formList = config.formList;
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

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
Promise.all([api.getCart(), api.getUserInfo()])
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
const profilePopup = new PopupWithForm({
  popupElement: '#popup-profile',
  handleFormSubmit: (userData) => {
    profilePopup.loading(true)
    api.editUserInfo(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .finally(() => {
        profilePopup.loading(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

// отправка аватара на сервер
const avatarPopup = new PopupWithForm({
  popupElement: '#popup-avatar',
  handleFormSubmit: (userData) => {
    avatarPopup.loading(true);
    api.editUserAvatar(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData)
        avatarPopup.close()
      })
      .finally(() => {
        avatarPopup.loading(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

/* -------------- Карточки --------------- */

const viewImagePopup = new PopupWithImage('#popup-open-image');

// Функция создания новой карточки
const createCard = (data) => {
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
      deleteCardPopup.setSubmitCallback(() => {
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

const deleteCardPopup = new PopupWithConfirmation({ popupSelector: '#popup-delete-image' });

// // Добавлние карточки на сайт
const сardList = new Section({ renderer: (card) => сardList.prependItem(createCard(card)), containerSelector: '.elements' });

// Отправка даннах картинки на сервер
const cardPopup = new PopupWithForm({
  popupElement: '#popup-add-image',
  handleFormSubmit: (cardData) => {
    cardPopup.loading(true);
    api.addCard(cardData)
      .then((formData) => {
        сardList.prependItem(createCard(formData));
        cardPopup.close();
      })
      .finally(() => {
        cardPopup.loading(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
});

deleteCardPopup.setEventListeners();
viewImagePopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
cardPopup.setEventListeners();

/* -------------- Слушатели --------------- */

buttonEditUser.addEventListener('click', () => {
  formValidators["form-profile"].resetValidation();
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
});

buttonEditAvatar.addEventListener('click', () => {
  formValidators["form-avatar"].resetValidation();
  avatarPopup.open();
});

buttonAdd.addEventListener('click', () => {
  formValidators['form-image'].resetValidation()
  cardPopup.open()
});