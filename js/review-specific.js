const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review/";
const url = baseUrl + id + "?acf_format=standard";

const reviewSpecificContainer = document.querySelector(".review-specific-container");
const imageModal = document.querySelector(".image-modal");

const breadcrumbSpecific = document.querySelector(".breadcrumb-specific");

//Function to show the review and modal image
async function showReview() {
  try {
    const response = await fetch(url);
    const review = await response.json();

    console.log(review);

    createReview(review);

    /*Function to open modal (inspired by http://www-db.deis.unibo.it/courses/TW/DOCS/w3schools/howto/howto_css_modal_images.asp.html)*/
    if (createReview) {
      const image = document.querySelector(".review-specific-container img");

      image.onclick = function () {
        imageModal.style.display = "block";
      };
    }
  } catch (error) {
    console.log(error);
    reviewSpecificContainer.innerHTML = "An error occurred while calling the API, please try again later " + error;
  }
}

showReview();

//Function to create HTML for review
function createReview(review) {
  document.title = "";
  document.title = `Fabulous fiction | ${review.acf.heading}`;

  reviewSpecificContainer.innerHTML = "";
  reviewSpecificContainer.classList.remove("loader");

  //adding breadcrumbs
  breadcrumbSpecific.innerHTML += `${review.acf.book_title}`;

  //adding review in container
  reviewSpecificContainer.innerHTML += `
<h1 class="heading-review">${review.acf.heading}</h1><div class="subheadings-review">
<h2 class="post-subheading">${review.acf.subheading}</h2>
<p class="publish-date-p">Published: ${review.date.split(`T`)[0]}</p></div>
    <div class="image-review"><img src=${review.acf.image} alt ="Cover of ${review.acf.book_title}" class="review-img"/></div>
    <div class="synopsis"><h2>Synopsis </h2> <p>${review.acf.synopsis1}</p><p>${review.acf.synopsis2}</p></div>
   <div class="review-paragraphs"><h2>Review </h2> <p>${review.acf.paragraph1}</p><p>${review.acf.paragraph2}</p><p>${review.acf.paragraph2}</p><p>${
    review.acf.paragraph3
  }</p></div>`;

  //adding image modal
  imageModal.innerHTML += ` <div class="flex-modal"><i class="fa-solid fa-circle-xmark"><p>Close</p></i><div><img src=${review.acf.image} alt ="Cover of ${review.acf.book_title}" class="review-img"/></div></div>`;
}

/*Event listener and function to close modal (inspired by: https://stackoverflow.com/questions/70539763/how-do-i-open-modal-with-javascript-without-using-jquery)*/

document.addEventListener("click", closeImageModal);

function closeImageModal(event) {
  const closeIcon = document.querySelector(".fa-circle-xmark");
  if (event.target === imageModal || event.target === closeIcon) {
    imageModal.style.display = "none";
  }
}
