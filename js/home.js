const sliderContainer = document.querySelector(".posts-slider-container");
const sliderWrap = document.querySelector(".posts-slider-wrap");
const url = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review?acf_format=standard";

//function for displaying recent posts in carousel slider

async function displayRecentReviews() {
  try {
    const response = await fetch(url);
    const reviews = await response.json();

    sliderContainer.innerHTML = "";

    sliderContainer.classList.remove("loader");

    sliderContainer.style.overflowX = "scroll";

    for (let i = 0; i < reviews.length; i++) {
      sliderContainer.innerHTML += `<div class="recent-card"><a href="blog-specific.html?id=${reviews[i].id}">
              <img src=${reviews[i].acf.image} alt ="${reviews[i].acf.heading}" class="review-img"/>
                <h2 class="heading-posts">${reviews[i].acf.book_title}</h2></a></div>`;
    }
  } catch (error) {
    sliderContainer.innerHTML = "An error occurred while calling the API, please try again later " + error;
    console.log(error);
  }
}

displayRecentReviews();

// arrows for slider function
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
