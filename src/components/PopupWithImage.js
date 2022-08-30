import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, openedCardImage, openedCardName) {
        super(popupSelector);
        this._openedCardImage = openedCardImage;
        this._openedCardName = openedCardName;
    };

    handleCardClick(name, link) {
        this._openedCardImage.src = link;
        this._openedCardName.textContent = name;
        this._openedCardImage.alt = name;
        super.open();
    };
};