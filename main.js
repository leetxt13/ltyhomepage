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

//when passing by Home, make opacity of home turned into transparent

function makeTransparent(selector, originHomeselector) {
  const element = document.querySelector(selector);
  const originHomeHeight = document
    .querySelector(originHomeselector)
    .getBoundingClientRect().height;
  document.addEventListener("scroll", () => {
    element.style.opacity = 1 - window.scrollY / originHomeHeight;
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

/* when clicking project button, filter contents by each subject*/
const workBtnContainer = document.querySelector(".work__categorys");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  /*이벤트의 타켓(버튼), 데이터셋에 있는 필터들을 받아옴*/
  /* 데이터셋필터가 없으면, 부모의 데이터셋에서 받아오겠다*/

  /*숫자를 누르면 undefined가 나오는 문제 발생 ->부모노드 필터 불러오기 */

  if (filter == null) {
    return;
  }
  projectContainer.classList.add("anim-out");
  /* project(type)을 쭉 순회, 
  (all 클릭) filter는 "*"이 됨, 반복문을 따라, type을 쭉 순회 ETC, OA , Work, Work...
  (*은 조건을 계속 만족시키므로, 모든요소가 invisible remove)
  (WORK 클릭) filter는 "work", type을 쭉 순회, ETC, OA, WORK(remove됨), WORK(remove됨)
  */
  setTimeout(() => {
    projects.forEach((project) => {
      console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove(
          "invisible"
        ); /*필터가 맞으면, invisible삭제해서, 보이도록*/
      } else {
        project.classList.add(
          "invisible"
        ); /*필터가 틀리면, invisible추가해서, 안 보이도록*/
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 200);
});
