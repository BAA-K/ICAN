/*  Variables  */
const linkBtn = document.querySelector(".links-btn");
const linksNav = document.querySelectorAll(".my-circle:not(.links-btn)");
const lightTogger = document.querySelector(".light-togger");
const backgroundStar = document.querySelector(".star-background");
const aniElement = document.querySelectorAll("*[ani]");
const windowHeight = this.innerHeight;
const lastSection = document.getElementById("footer");
const submitJoinBtn = document.getElementById("submit-btn");
const formJoin = document.querySelector(".needs-validation");
const submitMessageBtn = document.getElementById("message-btn");
const formMessage = document.querySelector(".needs-validation-message");
const genderInput = document.getElementById("gender");
const militaryInput = document.getElementById("military");
const serviceBackground = document.querySelector(".pump-services-background");
const hiringBackground = document.querySelector(".pump-hiring-background");
const loadingPage = document.getElementById("loading");
const pageSections = document.querySelectorAll("section");

let isLight = true;
let isReachToEnd = false;

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
  if (left) element.style.left = Math.random() * +innerWidth + "px";
  if (top) element.style.top = Math.random() * +innerHeight + "px";
  element.style.fontSize = defaultSize + size + "px";
  element.style.animationDuration = 2 * duration + "s";

  background.appendChild(element);

  setTimeout(() => {
    background.removeChild(element);
  }, killer);
};

//  Function to switch the active class
const switchClassLinks = (links, href) => {
  links.forEach((link) => {
    link.classList.remove("active");
  });
  document
    .querySelector(`.navbar a[href="#${href}"]`)
    .parentElement.classList.add("active");
};

const bReachSection = (element, window) => {
  var elementOffsetTop = element.offsetTop,
    elementOuterHeight = element.offsetHeight,
    windowScollTop = this.pageYOffset;
  return windowScollTop >= elementOffsetTop + elementOuterHeight - window * 1.5
    ? true
    : false;
};

const setAnimation = (aniElement, lastSection, windowHeight) => {
  if (isReachToEnd) {
    return;
  }
  isReachToEnd = bReachSection(lastSection, windowHeight) ? true : false;
  aniElement.forEach((e) => {
    if (bReachSection(e, windowHeight)) {
      e.style.animation = `${e.getAttribute("ani")} 1s .3s linear forwards`;
    }
  });
};

/*  Main  */

// To appear/disappear the links from sm to md screens
linkBtn.onclick = () => linkBtn.classList.toggle("active");

// To select the section in the page
linksNav.forEach((e) => {
  e.onclick = () => {
    linksNav.forEach((e) => e.classList.remove("active"));
    e.classList.add("active");
    e.firstElementChild.click();
  };
});

// To switch between dark and light mode
lightTogger.onclick = () => {
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
submitJoinBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (formJoin.checkValidity() === false) {
    formJoin.classList.add("was-validated");
  } else {
    submitJoinBtn.submit();
    location.reload();
  }
});

// To control the form of message
submitMessageBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (formMessage.checkValidity() === false) {
    formMessage.classList.add("was-validated");
  } else {
    formMessage.submit();
    location.reload();
  }
});

// Handle gender with military status
genderInput.addEventListener("change", function () {
  var selectedValue = this.value;
  if (selectedValue === "male") {
    militaryInput.disabled = false;
    militaryInput.required = true;
  } else {
    militaryInput.disabled = true;
    militaryInput.required = false;
  }
});

window.onscroll = () => {
  // To set animation when we reach to section
  if (!isReachToEnd) {
    setAnimation(aniElement, lastSection, windowHeight);
  }
};

window.addEventListener("load", (_) => {
  // To remove loading animation when it loaded
  loadingPage.classList.add("loaded");
  console.log(loadingPage);

  // To set animation when the page loaded
  setAnimation(aniElement, lastSection, windowHeight);
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
  stars(backgroundStar, "star", true, false, 5000);
  stars(serviceBackground, "pump", true, true, 10000, 6);
  stars(hiringBackground, "pump", true, true, 10000, 6);
}, 500);

//  To check if the section is in the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Check if the observed element is intersecting
    if (entry.isIntersecting) {
      var sectionID = entry.target.id;
      switch (sectionID) {
        case "hero":
          switchClassLinks(linksNav, sectionID);
          break;
        case "services":
          switchClassLinks(linksNav, sectionID);
          break;
        case "features":
          switchClassLinks(linksNav, sectionID);
          break;
        case "hiring":
          switchClassLinks(linksNav, sectionID);
          break;
        case "team":
          switchClassLinks(linksNav, sectionID);
          break;
        case "about":
          switchClassLinks(linksNav, sectionID);
          break;
        case "contact":
          switchClassLinks(linksNav, sectionID);
          break;
        default:
          break;
      }
    }
  });
});

// watch the current viewport and set on the nav links
Array.from(pageSections).forEach((section) => {
  observer.observe(section);
});
