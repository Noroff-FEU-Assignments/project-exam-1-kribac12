const aboutContainer = document.querySelector(".about-grid");

const aboutUrl = "https://fabulousfictio.wpengine.com/wp-json/wp/v2/about/130";
const acf = "?acf_format=standard";
//displaying about me on about page

async function displayAbout() {
  try {
    const response = await fetch(aboutUrl + acf);
    const about = await response.json();

    createAboutPost(about);
  } catch (error) {
    console.log(error);
    aboutContainer.innerHTML = "An error occurred while calling the API, please try again later " + error;
    aboutContainer.style.paddingTop = "7rem";
  }
}

displayAbout();

function createAboutPost(about) {
  aboutContainer.innerHTML = "";
  aboutContainer.classList.remove("loader");

  aboutContainer.innerHTML += `
    <h1 class="about-heading">${about.acf.heading}</h1>
        <h2 class="subheading-about post-subheading">${about.acf.subheading}</h2>
            <img src=${about.acf.image} class="about-image" alt ="Image of Kristine"/>
            <div class="color-card favorites"><div class="favorites-categories"> <h2>Favorites</h2> <p class="p-uppercase">book:</p><p>${about.acf.book}</p><p class="p-uppercase">book series:</p><p>${about.acf.series}</p><p class="p-uppercase">short story:</p><p>${about.acf.story}</p><p class="p-uppercase">film:</p><p>${about.acf.film}</p><p class="p-uppercase">song:</p><p>${about.acf.song}</p></div></div>
           <div class="about-para"><h2>Facts </h2> <p class="p-space">${about.acf.paragraph1}</p><p class="p-space">${about.acf.paragraph2}</p><p class="p-space">${about.acf.paragraph2}</p>
           <a href="contact.html" class="cta cta-small cta-border">Contact me</a> </div>`;
}
