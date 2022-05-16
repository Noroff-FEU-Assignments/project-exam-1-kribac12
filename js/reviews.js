const reviewContainer = document.querySelector(".review-container");
const sliderContainer = document.querySelector(".posts-slider-container");

const reviewUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review?acf_format=standard";

async function displayPosts() {
  try {
    const response = await fetch(reviewUrl);
    const reviews = await response.json();

    displayReviews(reviews);
    displayRecentReviews(reviews);
  } catch (error) {
    console.log(error);
  }
}

displayPosts();

async function displayRecentReviews(reviews) {
  try {
    sliderContainer.innerHTML = "";
    sliderContainer.style.overflowX = "scroll";

    for (let i = 0; i < reviews.length; i++) {
      sliderContainer.innerHTML += `<div class="recent-card"><a href="blog-specific.html?id=${reviews[i].id}">
            <img src=${reviews[i].acf.image} alt ="${reviews[i].acf.heading}" class="review-img"/>
              <h3 class="heading-posts">${reviews[i].acf.book_title}</h3></a></div>`;
    }
  } catch (error) {}
}

async function displayReviews(reviews) {
  try {
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
  } catch (error) {}
}

/*arrows for slider function*/
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");

arrowLeft.onclick = function () {
  const carouselWidth = sliderContainer.offsetWidth;
  sliderContainer.scrollLeft -= carouselWidth;
};

arrowRight.onclick = function () {
  const carouselWidth = sliderContainer.offsetWidth;
  sliderContainer.scrollLeft += carouselWidth;
};
