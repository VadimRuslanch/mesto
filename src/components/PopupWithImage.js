import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement, openedCardImage, openedCardName) {
        super(popupElement);
        this._openedCardImage = openedCardImage;
        this._openedCardName = openedCardName;
    };

    handleCardClick(name, link) {
        this._setEventListeners()
        this._openedCardImage.src = link;
        this._openedCardName.textContent = name;
        this._openedCardImage.alt = name;
        super.open();
    };
};