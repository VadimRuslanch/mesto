import Popup from "./Popup.js";
import {
    openedCardImage,
    openedCardName,
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    };

    handleCardClick(name, link) {
        openedCardImage.src = link;
        openedCardName.textContent = name;
        super.open(); 
    };
};