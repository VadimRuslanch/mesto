export default class Section {
    constructor({renderer, containerSelector}) {
        this._renderer = renderer
        this._container = document.querySelector(containerSelector);
    };

    prependItem(formData) {
        this._container.prepend(formData);
    };

    rendererItems(data) {
        data.forEach((item) => this._renderer(item))
    };
};