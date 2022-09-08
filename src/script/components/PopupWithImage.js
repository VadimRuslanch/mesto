import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._openedCardImage = this._popup.querySelector('.popup__image');
        this._openedCardName = this._popup.querySelector('.popup__text');
    };

    handleCardClick(name, link) {
        this._setEventListeners()
        this._openedCardImage.src = link;
        this._openedCardName.textContent = name;
        this._openedCardImage.alt = name;
        super.open();
    };
};