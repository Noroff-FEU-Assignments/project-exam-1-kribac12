const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review/";
const url = baseUrl + id + "?acf_format=standard";

const reviewSpecificContainer = document.querySelector(".review-specific-container");
const imageModal = document.querySelector(".image-modal");

//Function to show the review and modal image
async function showReview() {
  try {
    const response = await fetch(url);
    const review = await response.json();

    console.log(review);

    createReview(review);

    //Function to open modal
    if (createReview) {
      const image = document.querySelector(".review-specific-container img");

      image.onclick = function () {
        imageModal.style.display = "block";
      };
    }
  } catch (error) {
    console.log(error);
    reviewSpecificContainer.innerHTML = "error";
  }
}

showReview();

//Function to create HTML for review
function createReview(review) {
  document.title = "";
  document.title = `Fabulous fiction | ${review.acf.heading}`;

  reviewSpecificContainer.innerHTML += `
<div><h1 class="post-heading">${review.acf.heading}</h1>
<h2 class="post-subheading">${review.acf.subheading}</h2>
<p class="publish-date-p">Published: ${review.date.replace(`T`, ` | Time: `)}</p>
    <img src=${review.acf.image} alt ="Cover of ${review.acf.book_title}" class="review-img"/></div>
    <div class="synopsis"><h3>Synopsis:</h3> <p>${review.acf.synopsis1}</p><p>${review.acf.synopsis2}</p></div>
   <div class="review-paragraph"><h3>Review:</h3> <p>${review.acf.paragraph1}</p><p>${review.acf.paragraph2}</p><p>${review.acf.paragraph3}</p><p>${
    review.acf.paragraph4
  }</p></div>`;

  imageModal.innerHTML += ` <i class="fa-solid fa-circle-xmark"><p>Close</p></i><img src=${review.acf.image} alt ="Cover of ${review.acf.book_title}" class="review-img"/>`;
}

document.addEventListener("click", closeImageModal);

// Function to close modal
function closeImageModal(event) {
  const closeIcon = document.querySelector(".fa-circle-xmark");
  if (event.target === imageModal || event.target === closeIcon) {
    imageModal.style.display = "none";
  }
}
