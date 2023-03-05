"use strict";

//make navbar transparent or be pink as the scroll postion
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const link = event.target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
});
// event.target은 타겟이 되는 부분을 출력
// event.target.dataset -> 변수를 정의한 것이 dataset에 모임

//Handle click on "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#Contact");
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}

//when passing by Home, make opacity turned into transparent

function makeTransparent(selector, originselector) {
  const element = document.querySelector(selector);
  const originHeight = document
    .querySelector(originselector)
    .getBoundingClientRect().height;
  document.addEventListener("scroll", () => {
    element.style.opacity = 1 - window.scrollY / originHeight;
  });
}

makeTransparent(".Home__container", "#Home");
//Handle click on the "arrow up" button
const arrowUp = document.querySelector(".arrow-up");
arrowUp.addEventListener("click", () => {
  scrollIntoView("#Home");
});

//show arrow up button when scrolling down
// 나의 방식
// document.addEventListener("scroll", () => {
//   const homeHeight = document
//     .querySelector("#Home")
//     .getBoundingClientRect().height;
//   if (window.scrollY > homeHeight / 2) {
//     arrowUp.style.display = "block";
//   } else {
//     arrowUp.style.display = "none";
//   }
// });
//강사의 방식
document.addEventListener("scroll", () => {
  const homeHeight = document
    .querySelector("#Home")
    .getBoundingClientRect().height;
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});
