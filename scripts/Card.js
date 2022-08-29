export default class Card {
  constructor(data, templateSelector, handleArticleClick) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleArticleClick = handleArticleClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
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

    this._articleImg.src = this._link;
    this._articleImg.alt = this._name;
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
      this._handleArticleClick(this._name, this._link);
    })
  }

  _handleLikeClick() {
    this._btnLikeArticle.classList.toggle("article__like_active");
  }

  _handleDelClick() {
    this._element.remove();
  }
}
