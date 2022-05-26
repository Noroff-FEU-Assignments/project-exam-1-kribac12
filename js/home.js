const sliderContainer = document.querySelector(".posts-slider-container");
const sliderWrap = document.querySelector(".posts-slider-wrap");
const error = document.querySelector(".error");
const url = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/review?acf_format=standard";

// arrows for slider function
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");

//function for displaying recent posts in carousel slider
async function displayRecentReviews() {
  try {
    const response = await fetch(url);
    const reviews = await response.json();

    sliderContainer.innerHTML = "";

    sliderContainer.style.overflowX = "scroll";

    for (let i = 0; i < reviews.length; i++) {
      sliderContainer.innerHTML += `<div class="recent-card"><a href="blog-specific.html?id=${reviews[i].id}">
              <img src=${reviews[i].acf.image} alt ="${reviews[i].acf.heading}" class="review-img"/>
                <h2 class="heading-posts">${reviews[i].acf.book_title}</h2></a></div>`;
    }
    // reducing the opacity of the left arrow since it cannot be used
    arrowLeft.style.opacity = "0.25";
  } catch (error) {
    sliderContainer.innerHTML = "An error occurred while calling the API, please try again later. " + error;
    sliderContainer.style.margin = "2rem";
    console.log(error);
  }
}

displayRecentReviews();

arrowLeft.onclick = function () {
  // variable containing the current offset width of the carousel slider
  const carouselWidth = sliderContainer.offsetWidth;
  // adjust (scroll left) the slider container by carouselWidth
  sliderContainer.scrollLeft -= carouselWidth;
  // set the transparency/opacity of right arrow to 1.0 (fully visible)
  arrowRight.style.opacity = "1.0";
  // if we have reached the leftmost end of the carousel, reduce opacity of left arrow
  if (sliderContainer.scrollLeft === 0) {
    arrowLeft.style.opacity = "0.4";
  }
};

arrowRight.onclick = function () {
  // variable containing the current offset width of carousel slider
  const carouselWidth = sliderContainer.offsetWidth;
  // adjust (scroll towards the right) the slider container by carouselWidth
  sliderContainer.scrollLeft += carouselWidth;
  // set the transparency/opacity of the left arrow to 1.0 (fully visible)
  arrowLeft.style.opacity = "1.0";
  // if we have reached the rightmost end of the carousel, reduce opacity of right arrow
  if (sliderContainer.scrollLeft >= 0.9 * (sliderContainer.scrollWidth - carouselWidth)) {
    arrowRight.style.opacity = "0.4";
  }
};

function refreshSlider() {}
