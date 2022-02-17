//nav scroll effect
const navList = document.querySelector(".nav-default-list");
navList.addEventListener("click", function(e) {
  navList.querySelectorAll('.nav-link').forEach(link => link.classList.remove("active"));
  e.target.classList.add("active");
});
//nav hover effect 
const navBar = document.querySelector(".nav-bar");
function addHoverEffect(e, opacity) {
  const link = e.target;
  if(link.classList.contains("nav-link")) {
    const siblings = link.closest(".nav-bar").querySelectorAll(".nav-link");
    const logo = document.querySelector(".nav-logo");
    siblings.forEach(sibling => {if(sibling !== link) sibling.style.opacity = opacity;});
    logo.style.opacity = opacity;
  }
}
navBar.addEventListener("mouseover", function(e) {
  addHoverEffect(e, .5);
});
navBar.addEventListener("mouseout", function(e) {
  addHoverEffect(e, 1)
}); 
//////////////////////////////////////////////////
//openning sign up form
const openAcc = document.querySelectorAll(".account");
const overlay = document.querySelector(".overlay");
const form = document.querySelector(".signup");
const closeBtn = document.querySelector(".close");

const openModal = () => {
  overlay.classList.add("popup");
  form.classList.add("popup");
}

openAcc.forEach(btn => btn.addEventListener("click", openModal));

const closeModal = () => {
  overlay.classList.remove("popup");
  form.classList.remove("popup");
}
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function(e) {
  if(e.key === "Escape") {
    closeModal();
  }
});
////////////////////////////////////////////////////
//tapped buttons
const tapMenu = document.querySelector(".operations-tab");
const operations = document.querySelectorAll(".operation");
tapMenu.addEventListener("click", function(e) {
  const clicked = e.target.closest(".btn");
  if(!clicked) return; //guard clause
  const tabNum = clicked.dataset.tab;
  [...tapMenu.children].forEach(btn => btn.classList.remove("pressed"));
  clicked.classList.add("pressed");
  operations.forEach(operation => 
    operation.classList.contains(tabNum)? 
    operation.classList.remove("hidden") : 
    operation.classList.add("hidden"));
});
/////////////////////////////////////////////////////////
//Intersection Observer API
// const featuresSec = document.querySelector("#features");
// function obsFunction(entries, observer) {

// };
// const obsOptions = {
//   root: null, //viewport
//   threshold: 0,
// };
// const observer = new IntersectionObserver(obsFunction, obsOptions); //I can write them directly here
// observer.observe(featuresSec);

//Sticky Navigation
const header = document.querySelector(".header");
const navHeight = navBar.getBoundingClientRect().height;
function stickyNav(entries, observer) {
  const [entry] = entries; //deconstruction
  !entry.isIntersecting ? navBar.classList.add("sticky") : navBar.classList.remove("sticky");
};
const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight - 50}px`
});
navObserver.observe(header);

//revealing sections on scroll
const sections = document.querySelectorAll(".section");
const showSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove("hiddenSec");
  observer.unobserve(entry.target);
};
const seectionsObserver = new IntersectionObserver(showSection, {
  root: null,
  threshold: .15
});
sections.forEach(section => {
  seectionsObserver.observe(section);
  section.classList.add("hiddenSec");
  }
);
// revealing images on scrolln     
const images = document.querySelectorAll(".img-feature");
function showImg(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.setAttribute('src', entry.target.getAttribute("data-src"));
  entry.target.addEventListener("load", function(){
    entry.target.classList.remove("img-filter");
  });
  observer.unobserve(entry.target);
};
const imagesObserver = new IntersectionObserver(showImg, {
  root: null,
  threshold: 1
});
images.forEach(img => imagesObserver.observe(img));
/////////////////////////////////////////////
//Slider
const toLeft = document.querySelector(".slider-left");
const toRight = document.querySelector(".slider-right");
const slider = document.querySelector(".slider-content");
const sliderIndex = document.querySelector(".slider-index");
slider.style.transform = "translateX(0)";
function calcCurrPos(obj) {
  const transformValue = obj.style.transform;
  const currentPosition = Number.parseInt(transformValue.slice(11));
  return currentPosition;
}
function changeIndicator(num) {
  document.querySelectorAll(".slider-marker").forEach(marker => marker.classList.remove("indicator"));
  console.log(document.querySelector(`.slider-marker[data-target = "${Math.abs(num /100)}"]`));
  document.querySelector(`.slider-marker[data-target = "${Math.abs(num /100)}"]`).classList.add("indicator");
}
toLeft.addEventListener("click", function(e) {
  const position = calcCurrPos(slider);
  let newPos;
  newPos = position !== 0 ? position + 100 : -200;
  slider.style.transform = `translateX(${newPos}%)`;
  changeIndicator(newPos);
});
toRight.addEventListener("click", function(){
  const position = Math.abs(calcCurrPos(slider));
  let newPos;
  newPos = position !== 200 ? position + 100 : 0;
  slider.style.transform = `translateX(-${newPos}%)`;
  changeIndicator(newPos);
});
sliderIndex.addEventListener("click", function(e) {
  const slideNum = Number(e.target.dataset.target);
  if(e.target.classList.contains("slider-marker")) {
    slider.style.transform = `translateX(-${slideNum * 100}%)`
    Array.from(e.target.closest(".slider-index").children).forEach(child => child.classList.remove("indicator"));
    e.target.classList.add("indicator");
  }
});