import { openPopup, popupOpenImage } from './index.js'
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector
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

  _openImage = () => {
    openPopup(popupOpenImage);
    document.querySelector('.popup__image').src = this._link;
    document.querySelector('.popup__text').textContent = this._name;
    document.querySelector('.popup__image').alt = this._name;
  }


  _setEventListeners = () => {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._removeElement()
    });
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      this._activeLike(evt)
    });
    this._element.querySelector('.element__button-img').addEventListener('click', () => {
      this._openImage()
    })
  };

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__img').alt = this._name;
    return this._element
  };
};