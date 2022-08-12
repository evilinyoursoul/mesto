const popupProfile = document.querySelector(".popup-profile");
const popupArticle = document.querySelector(".popup-article");
const popupImg = document.querySelector(".popup-img");
const profileEditBtn = document.querySelector(".profile__button-edit");
const popupCloseBtnProfile = document.querySelector(".popup__button-close-profile");
const popupCloseBtnArticle = document.querySelector(".popup__button-close-article");
const popupCloseBtnImg = document.querySelector(".popup__button-close-img");
const popupSubmit = document.querySelector(".popup__submit");
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector(".profile__occupation");
const inputName = document.querySelector(".popup__input_type_name");
const inputOccupation = document.querySelector(".popup__input_type_occupation");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputImg = document.querySelector(".popup__input_type_img");
const profileForm = document.querySelector(".popup__form-profile");
const articleForm = document.querySelector(".popup__form-article");
const articleTemplate = document.querySelector('#article-template').content;
const articleGrid = document.querySelector(".article-grid__list");
const addArticleBtn = document.querySelector(".profile__button-add");

const popupArticleImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");


const initialArticles = [
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



function popupOpen(popup) {
  popup.classList.add("popup_opened");
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

function onClickProfile() {
  popupOpen(popupProfile);
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
}

function onCLickAddArticle() {
  popupOpen(popupArticle);
}

function submitArticle(event) {
  event.preventDefault();
  addArticle(inputImg.value, inputPlace.value);
  console.log('article');
  popupClose(popupArticle);
}

function submitProfile(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  popupClose(popupProfile);
}

function createArticle(imgSrc, title) {
  const articleElement = articleTemplate.querySelector('.article').cloneNode(true);
  articleElement.querySelector('.article__img').src = imgSrc;
  articleElement.querySelector('.article__title').textContent = title;
  // console.log(articleElement);
  const like = articleElement.querySelector('.article__like');
  const del = articleElement.querySelector('.article__delete');
  const articleImg = articleElement.querySelector('.article__img');
  const articleTitle = articleElement.querySelector('.article__title');

  like.addEventListener("click", likeArticle);

  del.addEventListener("click", function () {
    articleElement.remove();
  });

  articleImg.addEventListener("click", function () {
    console.log(articleImg);
    popupArticleImg.src = articleImg.src;
    popupCaption.textContent = articleTitle.textContent;
    popupOpen(popupImg);
  });

  return articleElement;
}

function addArticle(imgSrc, title) {
  const article = createArticle(imgSrc, title);
  articleGrid.prepend(article);
}

function addInitialArticles() {
  for (let i = 0; i < initialArticles.length; i++) {
    addArticle(initialArticles[i].link, initialArticles[i].name);
  };
}

function likeArticle(event) {
  event.target.classList.toggle("article__like_active");
}

addInitialArticles();

profileEditBtn.addEventListener("click", onClickProfile);
addArticleBtn.addEventListener("click", onCLickAddArticle);
popupCloseBtnProfile.addEventListener('click', () => popupClose(popupProfile))
popupCloseBtnArticle.addEventListener("click", () => popupClose(popupArticle));
popupCloseBtnImg.addEventListener("click", () => popupClose(popupImg));
profileForm.addEventListener("submit", submitProfile);
articleForm.addEventListener("submit", submitArticle);


