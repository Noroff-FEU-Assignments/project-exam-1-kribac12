const reviewContainer = document.querySelector(".review-container");

const reviewUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review?acf_format=standard";

async function getReviews() {
  try {
    const response = await fetch(reviewURL);
    const reviews = await response.json();

    reviewContainer.classList.remove("loader");

    for (let i = 0; i < reviews.length; i++) {}
  } catch {}
}
