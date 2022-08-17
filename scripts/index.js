
const popups = document.querySelectorAll('.popup')
const popupProfile = document.querySelector(".popup-profile");
const popupArticle = document.querySelector(".popup-article");
const popupImg = document.querySelector(".popup-img");
const profileEditBtn = document.querySelector(".profile__button-edit");
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
const articleAddBtn = document.querySelector(".profile__button-add");

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

const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error'
};

function openPopup(popup) {
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

function closeOnClick(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  else {
    closePopup(event.currentTarget)
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

function createArticle(articleData) {
  const articleElement = articleTemplate.querySelector('.article').cloneNode(true);
  const btnLikeArticle = articleElement.querySelector('.article__like');
  const btnDelArticle = articleElement.querySelector('.article__delete');
  const articleImg = articleElement.querySelector('.article__img');
  const articleTitle = articleElement.querySelector('.article__title');

  articleImg.src = articleData.link;
  articleImg.alt = articleData.name;
  articleTitle.textContent = articleData.name;

  btnLikeArticle.addEventListener("click", likeArticle);

  btnDelArticle.addEventListener("click", function () {
    articleElement.remove();
  });

  articleImg.addEventListener("click", function () {
    popupArticleImg.src = articleData.link;
    popupArticleImg.alt = articleData.name;
    popupCaption.textContent = articleData.name;

    openPopup(popupImg);
  });

  return articleElement;
}

function addArticle(articleData) {
  const article = createArticle(articleData);
  articleGrid.prepend(article);
}

function likeArticle(event) {
  event.target.classList.toggle("article__like_active");
}

initialArticles.forEach((element) => addArticle(element));

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

enableValidation(formsConfig);
