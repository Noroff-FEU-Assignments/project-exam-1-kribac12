const reviewContainer = document.querySelector(".review-container");

const reviewUrl = "http://fabulousfictio.wpengine.com/wp-json/wp/v2/review?acf_format=standard";

async function getReviews() {
  try {
    const response = await fetch(reviewUrl);
    const reviews = await response.json();

    reviewContainer.classList.remove("loader");

    for (let i = 0; i < reviews.length; i++) {
      reviewContainer.innerHTML += `<a href="blog-specific.html?id=${reviews[i].id}">
      <img src=${reviews[i].acf.image} alt ="${reviews[i].acf.heading}" class="review-img"/>
        <h3 class="heading-posts">${reviews[i].acf.book_title}</h3>
        <p>Author: ${reviews[i].acf.author}</p>
        <p>Genre: ${reviews[i].acf.genre}</p>
        <p>Quote: "${reviews[i].acf.quote}"</p>
        <div class=cta>Read review</div>
        </a>`;
    }
  } catch (error) {
    console.log(error);
  }
}

getReviews();
