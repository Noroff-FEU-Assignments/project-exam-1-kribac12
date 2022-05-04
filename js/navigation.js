/*code inspired by https://dev.to/devggaurav/let-s-build-a-responsive-navbar-and-hamburger-menu-using-html-css-and-javascript-4gci*/

const hamburgerIcon = document.querySelector(".hamburger-icon");
const menuLinks = document.querySelector(".menu-links");

hamburgerIcon.addEventListener("click", makeMenuResponsive);

function makeMenuResponsive() {
  hamburgerIcon.classList.toggle("active");
  menuLinks.classList.toggle("active");
}

const menuLink = document.querySelectorAll(".menu-link");
menuLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburgerIcon.classList.remove("active");
  menuLinks.classList.remove("active");
}
