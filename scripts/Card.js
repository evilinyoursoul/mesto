// import { initialArticles } from '../scripts/index.js'
import { openPopup } from "./index.js";




class Card {
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


const initialArticles1 = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// переберём весь исходный массив
initialArticles1.forEach((item) => {
  const card = new Card(item); // передаём объект аргументом
  const cardElement = card.generateCard();
  document.querySelector(".article-grid__list").append(cardElement);
});
