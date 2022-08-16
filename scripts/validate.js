const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_error'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formsConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formsConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formsConfig.inputErrorClass);
  errorElement.classList.remove(formsConfig.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formsConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(formsConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

const setEventListeners = (formElement, formsConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(formsConfig.inputSelector));
  const buttonElement = formElement.querySelector(formsConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formsConfig) => {
  const formList = Array.from(document.querySelectorAll(formsConfig.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, formsConfig);
  });
};




