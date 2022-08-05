const popup = document.querySelector(".popup");
const profileEditBtn = document.querySelector(".profile__button-edit");
const popupCloseBtn = document.querySelector(".popup__button-close");
const popupSubmit = document.querySelector(".popup__submit");
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector(".profile__occupation");
const inputName = document.querySelector(".popup__input_type_name");
const inputOccupation = document.querySelector(".popup__input_type_occupation");
const profileForm = document.querySelector(".popup__form");
const articleTemplate = document.querySelector('#article-template').content;
const articleGrid = document.querySelector(".article-grid__list");

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

profileEditBtn.addEventListener("click", popupOpen);
popupCloseBtn.addEventListener("click", popupClose);
profileForm.addEventListener("submit", submitProfile);

function popupOpen() {
  popup.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

function submitProfile(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  popupClose();
}

function createArticle(imgSrc, title) {
  const articleElement = articleTemplate.querySelector('.article').cloneNode(true);
  articleElement.querySelector('.article__img').src = imgSrc;
  articleElement.querySelector('.article__title').textContent = title;
  // console.log(articleElement);
  return articleElement;
}

function addArticle(imgSrc, title) {
  const article = createArticle(imgSrc, title);
  articleGrid.append(article);
}

function addInitialArticles() {
  for (let i = 0; i < initialArticles.length; i++) {
    addArticle(initialArticles[i].link, initialArticles[i].name);
  };
}




addInitialArticles();
