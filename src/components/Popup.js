export default class Popup {
    constructor(popupElement) {
        this._popup = popupElement;
        this._handleEscClose = this._handleEscClose.bind(this)
    };

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind);
    };

    _handleEscClose(evt) {
        const keyEsc = evt.key === 'Escape';
        if (keyEsc) {
            this.close();
        };
    };

    _handleСlickClose(evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            this.close();
        };
    };

    _setEventListeners() {
        this._popup.addEventListener('click', (evt) => { this._handleСlickClose(evt) });
    };
};