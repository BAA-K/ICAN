/*  Variables  */
const linkBtn = document.querySelector(".links-btn");
const navLinks = document.querySelectorAll(".my-circle:not(.links-btn)");
const lightToggler = document.querySelector(".light-togger");
const aniElement = document.querySelectorAll("*[ani]");
const submitJoinBtn = document.getElementById("submit-btn");
const joinForm = document.querySelector(".needs-validation");
const submitMessageBtn = document.getElementById("message-btn");
const messageForm = document.querySelector(".needs-validation-message");
const genderInput = document.getElementById("gender");
const militaryInput = document.getElementById("military");
const hiringBackground = document.querySelector(".pump-hiring-background");
const loadingPage = document.getElementById("loading");
const pageSections = document.querySelectorAll("section");

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

let isLight = true;

const lightMode = "#f0eded";
const darkMode = "#000";
const lightBG = "#ffffff";
const darkBG = "#111010";
const lightShadow = "#c4c4c3";
const darkShadow = "#1a1616";

/*  Functions  */

// Create animation elment on the background
const stars = (background, className, left, top, killer, defaultSize = 12) => {
  let element = document.createElement("div");
  let size = Math.random() * 4;
  let duration = Math.random() * 3 + 0.5;

  element.setAttribute("class", className);
  if (left) element.style.left = Math.random() * +windowWidth + "px";
  if (top) element.style.top = Math.random() * +windowHeight + "px";
  element.style.fontSize = defaultSize + size + "px";
  element.style.animationDuration = 2 * duration + "s";

  background.appendChild(element);

  setTimeout(() => {
    background.removeChild(element);
  }, killer);
};

//  To check if the section is in the viewport
const highlightActiveLink = () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      const sectionID = section.id;
      const activeLink = document.querySelector(`nav a[href="#${sectionID}"]`);
      navLinks.forEach((link) => link.classList.remove("active"));
      activeLink.parentElement.classList.add("active");
    }
  });
};

// Set the animation when it viewed in the screen
const setAnimation = () => {
  const reveals = document.querySelectorAll("*[ani]");
  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight) {
      element.style.animation = `${element.getAttribute(
        "ani"
      )} 1s .3s linear forwards`;

      setTimeout(() => {
        element.removeAttribute("ani");
      }, 500);
    }
  });
};

/*  Main  */

window.onload = () => {
  setAnimation();

  // To remove loading animation when it loaded
  loadingPage.classList.add("loaded");
  // Set the overflow-y of body auto instead of hidden
  document.body.style.overflowY = "auto";
};
window.onscroll = () => {
  setAnimation();
  highlightActiveLink();
};

// To appear/disappear the links from sm to md screens
linkBtn.addEventListener("click", (_) => {
  linkBtn.classList.toggle("active");
});

// To select the section in the page
navLinks.forEach((e) => {
  e.onclick = () => {
    navLinks.forEach((e) => e.classList.remove("active"));
    e.classList.add("active");
    linkBtn.classList.remove("active");
    e.firstElementChild.click();
  };
});

// To switch between dark and light mode
lightToggler.onclick = () => {
  if (isLight) {
    document.documentElement.style.setProperty("--c-mode", darkMode);
    document.documentElement.style.setProperty("--c-reverse", lightMode);
    document.documentElement.style.setProperty("--c-bg-main", darkBG);
    document.documentElement.style.setProperty("--c-shadow-mode", darkShadow);

    document.querySelector(".light-togger svg").dataset.prefix = "fas";

    isLight = !isLight;
  } else {
    document.documentElement.style.setProperty("--c-mode", lightMode);
    document.documentElement.style.setProperty("--c-reverse", darkMode);
    document.documentElement.style.setProperty("--c-bg-main", lightBG);
    document.documentElement.style.setProperty("--c-shadow-mode", lightShadow);

    document.querySelector(".light-togger svg").dataset.prefix = "far";

    isLight = !isLight;
  }
};

// To control the form of join us
submitJoinBtn.onclick = (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (joinForm.checkValidity() === false) {
    joinForm.classList.add("was-validated");
  } else {
    location.reload();
  }
};

// To control the form of message
submitMessageBtn.onclick = (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (messageForm.checkValidity() === false) {
    messageForm.classList.add("was-validated");
  } else {
    location.reload();
  }
};

// Handle gender with military status
genderInput.addEventListener("change", (event) => {
  var selectedValue = event.target.value;
  if (selectedValue === "male") {
    militaryInput.disabled = false;
    militaryInput.required = true;
  } else {
    militaryInput.disabled = true;
    militaryInput.required = false;
  }
});

// Use vanillaTilt library
VanillaTilt.init(document.querySelectorAll(".service"), {
  max: 25,
  speed: 800,
  glare: true,
  "max-glare": 1,
});

// To create star each second
setInterval(() => {
  stars(hiringBackground, "pump", true, true, 10000, 6);
}, 500);
