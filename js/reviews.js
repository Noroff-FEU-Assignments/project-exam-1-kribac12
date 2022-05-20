const reviewContainer = document.querySelector(".review-container");

const reviewUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review?per_page=";
const afcFormat = "&&acf_format=standard";

const loadMoreButton = document.querySelector(".load-more-button");
let numberOfPosts = 10;

function countPosts() {
  numberOfPosts += 10;
}

async function displayReviews() {
  try {
    const response = await fetch(reviewUrl + numberOfPosts + afcFormat);
    const reviews = await response.json();

    reviewContainer.innerHTML = "";
    for (let i = 0; i < reviews.length; i++) {
      reviewContainer.innerHTML += `<a href="blog-specific.html?id=${reviews[i].id}"><div class="review-card">
              <img src=${reviews[i].acf.image} alt ="${reviews[i].acf.heading}" class="review-img"/>
                <h3 class="heading-posts">${reviews[i].acf.book_title}</h3>
                <p>Author: ${reviews[i].acf.author}</p>
                <p>Genre: ${reviews[i].acf.genre}</p>
                <p>Quote: "${reviews[i].acf.quote}"</p>
                <div class=cta>Read review</div> </div>
                </a>`;
    }
  } catch (error) {
    console.log(error);
  }
}

displayReviews();

/*load more function*/

loadMoreButton.addEventListener("click", function () {
  countPosts();
  displayReviews();
});
