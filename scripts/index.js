import Card from './Card.js'
import FormValidator from './FormValidator.js'

const popups = document.querySelectorAll('.popup')
const popupProfile = document.querySelector(".popup-profile");
const popupArticle = document.querySelector(".popup-article");
const profileEditBtn = document.querySelector(".profile__button-edit");
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector(".profile__occupation");
const inputName = document.querySelector(".popup__input_type_name");
const inputOccupation = document.querySelector(".popup__input_type_occupation");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputImg = document.querySelector(".popup__input_type_img");
const profileForm = document.querySelector(".popup__form-profile");
const articleForm = document.querySelector(".popup__form-article");
const articleGrid = document.querySelector(".article-grid__list");
const articleAddBtn = document.querySelector(".profile__button-add");

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

const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error'
};

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keyup', closePopupByEsc);
}

function closePopupByEsc(event) {
  if (event.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleProfileClick() {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
}

function handleAddArticleClick() {
  openPopup(popupArticle);
}

function submitArticle(event) {
  event.preventDefault();
  const articleData = {
    name: inputPlace.value,
    link: inputImg.value
  };
  const btnSubmitArticle = event.target.querySelector('.popup__submit');

  addArticle(articleData);
  articleForm.reset();

  btnSubmitArticle.setAttribute('disabled', 'disabled');
  btnSubmitArticle.classList.add(formsConfig.inactiveButtonClass);

  closePopup(popupArticle);
}

function submitProfile(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupProfile);
}

function addArticle(articleData) {
  const article = new Card(articleData);
  const articleElement = article.generateCard();

  articleGrid.prepend(articleElement);
}

initialArticles.forEach((item) => {
  const article = new Card(item);
  const articleElement = article.generateCard();
  articleGrid.prepend(articleElement);
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})

profileEditBtn.addEventListener("click", handleProfileClick);
articleAddBtn.addEventListener("click", handleAddArticleClick);
profileForm.addEventListener("submit", submitProfile);
articleForm.addEventListener("submit", submitArticle);

const validatorProfileForm = new FormValidator(formsConfig, profileForm);
const articleProfileForm = new FormValidator(formsConfig, articleForm);

validatorProfileForm.enableValidation();
articleProfileForm.enableValidation();
