const email = document.querySelector("#email");
const subscribeButton = document.querySelector("#subscribe-button");
const subscribeForm = document.querySelector(".subscribe-form");
const input = document.querySelector("input");

//VALIDATE SUBSCRIPTION

function validateSubscription(form) {
  form.preventDefault();

  if (validateEmail(email.value) === true) {
    subscribeButton.innerHTML = "Thank you! I'll be in touch :)";
  } else {
    subscribeButton.innerHTML = "Please use a valid e-mail.";
  }

  subscribeForm.reset();
}

// BUTTON FOR VALIDATION
subscribeForm.addEventListener("submit", validateSubscription);

// REGEX EMAIL
function validateEmail(email) {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
