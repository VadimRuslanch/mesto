export default class Card {
  constructor({ data, userId, templateSelector, handleCardClick, handleSetLike, handleRemoveLike, handleClickIconeDelete }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleClickIconeDelete = handleClickIconeDelete;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__img');
    this._nameImage = this._element.querySelector('.element__text');
    this._likeButton = this._element.querySelector('.element__like');
    this._buttonDeleteImage = this._element.querySelector('.element__trash');
    this._likeNumber = this._element.querySelector('.element__likes-number');
  };



  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };



  _setEventListeners = () => {
    // слушатель кнопки удаления карточки 
    this._buttonDeleteImage.addEventListener('click', () => this._handleClickIconeDelete(this._cardId));
    // открытие попапа просмотра изображения кликом по изображению 
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    // слушатель кнопки лайк 
    this._likeButton.addEventListener('click', () => this._activeLike());
  };

  // Удаление карточки 
  removeElement = () => {
    this._element.remove();
    this._element = null;
  };

  _hasRemoveButtonDeleteImage() {
    if (this._userId !== this._owner) {
      this._buttonDeleteImage.remove();
    };
  };

  // лайк Карточки 
  _activeLike = () => {
    if (this._likeButton.classList.contains('element__like_active')) {
      this._handleRemoveLike(this._cardId);
    } else {
      this._handleSetLike(this._cardId);
    };
  };

  // Проверка наличия лайка  
  _hasCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeButton.classList.add('element__like_active');
    };
  };

  // счетчик лайков 
  handleLikeCard(data) {
    this._likes = data.likes;
    this._likeNumber.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__like_active');
  };

  generateCard = () => {
    this._cardImage.src = this._link;
    this._nameImage.textContent = this._name;
    this._cardImage.alt = this._name;
    this._likeNumber.textContent = this._likes.length;

    this._hasRemoveButtonDeleteImage();
    this._hasCardLiked();
    this._setEventListeners();
    return this._element;
  };
}; 