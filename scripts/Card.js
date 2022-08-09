export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  };

  _removeElement = () => {
    this._element.remove()
  };

  _activeLike = (evt) => {
    if (evt.target.classList.contains('element__like')) {
      evt.target.classList.toggle('element__like_active');
    };
  };

  _setEventListeners = () => {
    this._cardImage = this._element.querySelector('.element__img');
    this._nameImage = this._element.querySelector('.element__text');
    this._likeButton = this._element.querySelector('.element__like');
    this._removeImageButtton = this._element.querySelector('.element__trash');

    this._removeImageButtton.addEventListener('click', () => {
      this._removeElement()
    });

    this._likeButton.addEventListener('click', (evt) => {
      this._activeLike(evt)
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  };

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._nameImage.textContent = this._name;
    this._cardImage.alt = this._name;
    return this._element
  };
};