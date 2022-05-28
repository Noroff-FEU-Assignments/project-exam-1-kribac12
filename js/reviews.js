const reviewContainer = document.querySelector(".review-container");

const reviewUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review?per_page=";
const afcFormat = "&&acf_format=standard";

const loadMoreButton = document.querySelector(".load-more-button");

// ADDING POSTS
let numberOfPosts = 10;
function countPosts() {
  numberOfPosts += 10;
}

//DISPLAYING REVIEWS on review page

async function displayReviews() {
  try {
    const response = await fetch(reviewUrl + numberOfPosts + afcFormat);
    const reviews = await response.json();

    //removing loader, content
    reviewContainer.innerHTML = "";
    for (let i = 0; i < reviews.length; i++) {
      reviewContainer.innerHTML += `<a href="blog-specific.html?id=${reviews[i].id}"><div class="review-card">
              <img src=${reviews[i].acf.image} alt ="${reviews[i].acf.heading}" class="review-img"/>
                <h2 class="heading-posts">${reviews[i].acf.book_title}</h2>
                <p class="review-card-p">Author: ${reviews[i].acf.author}</p>
                <p class="review-card-p">Genre: ${reviews[i].acf.genre}</p>
                <p class="review-card-p">Quote: "${reviews[i].acf.quote}"</p>
                <div class="cta cta-small cta-border">Read review</div> </div>
                </a>`;
    }
  } catch (error) {
    console.log(error);
    reviewContainer.innerHTML = "An error occurred while calling the API, please try again later. " + error;
  }
}

displayReviews();

//LOAD MORE event and DISABLE BUTTON function

function disableButton() {
  loadMoreButton.style.display = "none";
}

loadMoreButton.addEventListener("click", function () {
  countPosts();
  displayReviews();
  disableButton();
});

/*Started working on search function, but had to focus on level 1

let reviews = [];
const inputSearch = document.querySelector(".input-search");
const searchInput = document.querySelector("#search-input");

inputSearch.addEventListener("keyup", () => {
  const searchValue = searchInput.value.toLowerCase();
  console.log(searchValue);
  const resultReviews = reviews.filter((reviews) => {
    console.log(resultReviews);
    return reviews.acf.heading.toLowerCase().includes(searchValue);
  });

  displayReviews(resultReviews);
});
*/
