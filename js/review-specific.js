const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const baseUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review/";

console.log(baseUrl);

const url = baseUrl + id + "?acf_format=standard";

console.log(url);

const reviewSpecificContainer = document.querySelector(".review-specific-container");

async function showReview() {
  try {
    const response = await fetch(url);
    const review = await response.json();

    console.log(review);

    document.title = "";
    document.title = `Fabulous fiction | ${review.acf.heading}`;

    reviewSpecificContainer.innerHTML += `
    <div><h1 class="post-heading">${review.acf.heading}</h1>
    <h2 class="post-subheading">${review.acf.subheading}</h2>
        <img src=${review.acf.image} alt ="${review.acf.heading}" class="review-img"/></div>
        <div class="synopsis"><h3>Synopsis:</h3> <p>${review.acf.synopsis1}</p><p>${review.acf.synopsis2}</p></div>
       <div class="review-paragraph"><h3>Review:</h3> <p>${review.acf.paragraph1}</p><p>${review.acf.paragraph2}</p><p>${review.acf.paragraph3}</p><p>${review.acf.paragraph4}</p></div>`;

    showModal();
  } catch (error) {
    console.log(error);
    reviewSpecificContainer.innerHTML = "error";
  }
}

showReview();

function showModal() {
  const img = document.querySelector(".review-img");
  const modal = document.querySelector(".image-modal");
}
/*function showModal() {
  const img = document.querySelector(".review-img");
  const modal = document.querySelector(".image-modal");

  (img.onclick = function (event) {
    modal.style.display = "block";
    modal.innerHTML = `<img src=${review.acf.image} alt ="${review.acf.heading}" class="review-img-bigger"/>`;

    if (!event.target.closest("div")) {
      closeModal();
    }
  }),
    false;
}

function closeModal() {
  modal.style.display = "none";
}*/
