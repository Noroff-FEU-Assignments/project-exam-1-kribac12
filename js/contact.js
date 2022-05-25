const contactForm = document.querySelector(".contact-form");

const fullName = document.querySelector("#full-name");
const fullNameError = document.querySelector("#full-name-error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

const validationContainer = document.querySelector(".validation-container");

//function for validation
function validateForm(form) {
  form.preventDefault();

  if (checkLength(fullName.value, 6) === true) {
    fullNameError.style.display = "none";
  } else {
    fullNameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(message.value, 26) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
  if (checkLength(subject.value, 16) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  // Success message if message was sent
  if (checkLength(fullName.value, 6) && checkLength(subject.value, 16) && checkLength(message.value, 26) && validateEmail(email.value)) {
    validationContainer.style.display = "block";
    contactForm.reset();
  }
}

contactForm.addEventListener("submit", validateForm);

// checking character count
function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}
// validate e-mail
function validateEmail(email) {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
