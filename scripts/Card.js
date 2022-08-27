import { openPopup } from "./index.js";

export default class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#article-template')
      .content
      .querySelector('.article')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._btnLikeArticle = this._element.querySelector('.article__like');
    this._btnDelArticle = this._element.querySelector('.article__delete');
    this._articleImg = this._element.querySelector('.article__img');

    this._setEventListeners();

    this._element.querySelector('.article__img').src = this._link;
    this._element.querySelector('.article__img').alt = this._name;
    this._element.querySelector('.article__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._btnLikeArticle.addEventListener('click', () => {
      this._handleLikeClick();
    })

    this._btnDelArticle.addEventListener('click', () => {
      this._handleDelClick();
    })

    this._articleImg.addEventListener('click', () => {
      this._handleImgClick();
    })
  }

  _handleLikeClick() {
    this._btnLikeArticle.classList.toggle("article__like_active");
  }

  _handleDelClick() {
    this._element.remove();
  }

  _handleImgClick() {
    const popupImg = document.querySelector(".popup-img");
    const popupArticleImg = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");
    openPopup(popupImg);

    popupArticleImg.src = this._link;
    popupArticleImg.alt = this._name;
    popupCaption.textContent = this._name;
  }
}
