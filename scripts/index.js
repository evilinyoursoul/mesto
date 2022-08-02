const popup = document.querySelector(".popup");
const profileEditBtn = document.querySelector(".profile__button-edit");
const popupCloseBtn = document.querySelector(".popup__button-close");
const popupSubmit = document.querySelector(".popup__submit");
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector(".profile__occupation");
const inputName = document.querySelector(".popup__input_type_name");
const inputOccupation = document.querySelector(".popup__input_type_occupation");
const profileForm = document.querySelector(".popup__form-profile");

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
