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
                <div class="recent-card-text"><h2 class="heading-posts">${reviews[i].acf.book_title}</h2>
                <p>${reviews[i].acf.paragraph1}(...)</p></a></div></div>`;
    }
    /* reducing the opacity and cursor style of the left arrow and make cursor style default(arrow) since it cannot be used*/
    arrowLeft.style.opacity = "0.4";
    arrowLeft.style.cursor = "default";
  } catch (error) {
    sliderContainer.innerHTML = "An error occurred while calling the API, please try again later. " + error;
    sliderContainer.style.margin = "2rem";
  }
}

displayRecentReviews();

arrowLeft.onclick = function () {
  // variable containing the current offset width of the carousel slider
  const carouselWidth = sliderContainer.offsetWidth;
  // adjust (scroll left) the slider container by carouselWidth
  sliderContainer.scrollLeft -= carouselWidth;
  /* set the transparency/opacity of right arrow to 1.0 (fully visible), and make the cursor style pointer*/
  arrowRight.style.opacity = "1.0";
  arrowRight.style.cursor = "pointer";
  // if we have reached the leftmost end of the carousel, reduce opacity of left arrow and make cursor style default*/
  if (sliderContainer.scrollLeft === 0) {
    arrowLeft.style.opacity = "0.4";
    arrowLeft.style.cursor = "default";
  }
};

arrowRight.onclick = function () {
  // variable containing the current offset width of carousel slider
  const carouselWidth = sliderContainer.offsetWidth;
  // adjust (scroll towards the right) the slider container by carouselWidth
  sliderContainer.scrollLeft += carouselWidth;
  /* set the transparency/opacity of the left arrow to fully visible, and add pointer for cursor */
  arrowLeft.style.opacity = "1.0";
  arrowLeft.style.cursor = "pointer";
  /* if we have reached the rightmost end of the carousel, reduce opacity of right arrow and change cursor style to default*/
  if (sliderContainer.scrollLeft >= 0.9 * (sliderContainer.scrollWidth - carouselWidth)) {
    arrowRight.style.opacity = "0.4";
    arrowRight.style.cursor = "default";
  }
};
