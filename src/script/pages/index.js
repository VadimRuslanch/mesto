import "./index.css"
import {
  validationConfig, userNameSubmit, userAboutSubmit, buttonAdd, buttonEdit, buttonEditAvatar
} from '../utils/constants.js'
import Cart from '../components/Cart.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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
Promise.all([api.getCart(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    сartList.rendererItems(initialCards);
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
        // submitProfile.setInputValues(userData)
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
const creadeCart = (data) => {
  const cart = new Cart({
    data: data,
    userId: userId,
    templateSelector: "#elementTemplate",
    handleCardClick: (name, link) => {
      viewImagePopup.handleCardClick(name, link)
    },
    handleSetLike: (cartId) => {
      api.setLike(cartId)
        .then((data) => {
          cart.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cartId) => {
      api.delete(cartId)
        .then((data) => {
          cart.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleClickIconeDelete: (cartId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitCallback(() => {
        api.deleteCard(cartId)
          .then(() => {
            deleteCardPopup.close();
            cart.removeElement();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      })
    }
  });
  return cart.generateCard();
};

const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '#popup-delete-image'
});

// // Добавлние карточки на сайт
const сartList = new Section({
  renderer: (card) => сartList.prependItem(creadeCart(card)),
  containerSelector: '.elements'
});

// Отправка даннах картинки на сервер
const cartPopup = new PopupWithForm({
  popupElement: '#popup-add-image',
  handleFormSubmit: (cartData) => {
    cartPopup.loading(true);
    api.addCard(cartData)
      .then((formData) => {
        сartList.prependItem(creadeCart(formData));
        cartPopup.close();
      })
      .finally(() => {
        cartPopup.loading(false);
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
cartPopup.setEventListeners();

/* -------------- Слушатели --------------- */

buttonEdit.addEventListener('click', () => {
  formProfileValidation.resetValidation();
  const {name, about} = userInfo.getUserInfo()
  userNameSubmit.value = name;
  userAboutSubmit.value = about;
  profilePopup.open();
});

buttonEditAvatar.addEventListener('click', () => {
  formAvatarValidation.resetValidation();
  avatarPopup.open();
});

buttonAdd.addEventListener('click', () => {
  formImageValidation.resetValidation();
  cartPopup.open()
});