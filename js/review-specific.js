const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const baseUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review/";
const url = baseUrl + id + "?acf_format=standard";

const reviewSpecificContainer = document.querySelector(".review-specific-container");
const imageModal = document.querySelector(".image-modal");

async function showReview() {
  try {
    const response = await fetch(url);
    const review = await response.json();

    console.log(review);

    createReview(review);

    if (createReview) {
      const image = document.querySelector(".review-specific-container img");

      image.onclick = function () {
        imageModal.style.display = "block";
      };
    }
    window.onclick = function (event) {
      if (event.target === imageModal) {
        imageModal.style.display = "none";
      }
    };
  } catch (error) {
    console.log(error);
    reviewSpecificContainer.innerHTML = "error";
  }
}

showReview();

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

  imageModal.innerHTML += `<img src=${review.acf.image} alt ="Cover of ${review.acf.book_title}" class="review-img"/>`;
}
