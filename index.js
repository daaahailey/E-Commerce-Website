// const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const menus = document.querySelectorAll(".menu_bar1 > li");
const tabContent = document.querySelectorAll(".tabContent");
const home = document.querySelector("#home");
const shop = document.querySelector("#shop");


// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".navbar");
const theBody = document.querySelector("body");
const hamMenus = document.querySelectorAll(".ham_list_menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("isactive");
  menu.classList.toggle("active");
});

const openHamTab = (event) => {

  const hamMenu = event.target;

  const menuList = Array.from(hamMenus);
  const menuIndex = menuList.indexOf(hamMenu);
  console.log(hamMenu)
  console.log(menuList)
  console.log(menuIndex)

  hamburger.classList.toggle("isactive");
  menu.classList.toggle("active");
    
  tabContent.forEach((content) => {
    content.classList.add("hidden"); // makes every content hidden
  });
  // console.log(tabContent);
  // console.log(tabContent[menuIndex])
  menuList.forEach((menu) => {
      tabContent[menuIndex].classList.remove("hidden"); // display the only content that's chosen.
    });
}

hamMenus.forEach(menu => {
  menu.addEventListener("click", openHamTab)
})




const init = () => {
  tabContent.forEach((content) => {
  content.classList.add("hidden");
  }); 
  home.classList.remove("hidden");
}

// Display each page by chosen menu

const openNewTab = (event) => {
  event.preventDefault();
  const currentMenu = event.target.id;
  tabContent.forEach((content) => {
    content.classList.add("hidden"); // makes every content hidden
  });
  menus.forEach((menu) => {
      tabContent[currentMenu].classList.remove("hidden"); // display the only content that's chosen.
  });
};

menus.forEach(menu => menu.addEventListener("click", openNewTab));



// search bar & drop down menu

const sortByBtn = document.querySelector(".sortBy_btn");
const sortByListsContainer = document.querySelector(".sortBy_lists");
const sortByLists = document.querySelectorAll(".sortBy_lists > ul > li")
const sortByArrow = document.querySelector(".fas");
const search = document.querySelector(".search_input_container");

// when sort by clicked, display drop down menu (hidden by default)
sortByBtn.addEventListener("click", () => {
  sortByListsContainer.classList.toggle("showSortBy");
  sortByArrow.classList.toggle("fa-chevron-down");
  sortByArrow.classList.toggle("fa-chevron-up");
});

// if current sort by option isn't sort by(default) and when you click sort by, reset the sort by menu
sortByBtn.addEventListener("click", () => {
  if(sortBySpan !== "Sort By") {
    sortBySpan.innerText = "Sort By";
  }
});

// remove search icon when search bar is clicked
search.addEventListener("input", () => {
    search.children[1].classList.add("hidden"); 
    if(search.children[0].value === "") {
    search.children[1].classList.remove("hidden"); 
    
  }
  
})




// main banner - image slider 
const rightBtn = document.querySelector("#rightBtn");
const leftBtn = document.querySelector("#leftBtn");

let mainSlideImg = document.querySelectorAll(".mainImgSlide");
let current = 0;

const reset = () => {
  for (let i = 0; i < mainSlideImg.length; i++) {
    mainSlideImg[i].style.display = "none";
  }
};

// clear all images
const displaySlide = () => {
  reset();
  mainSlideImg[0].style.display = "block";
};

// show previous image
const slideToLeft = () => {
  reset();
  mainSlideImg[current - 1].style.display = "block";
  current--;
};

// show next image
const slideToRight = () => {
  reset();
  mainSlideImg[current + 1].style.display = "block";
  current++;
};


leftBtn.addEventListener("click", () => {
  if (current === 0) { 
    current = mainSlideImg.length; // when current gets to the 0, current = total(max) number of slides
  }
  slideToLeft();
});

rightBtn.addEventListener("click", () => {
  if (current === mainSlideImg.length - 1) {
    current = -1;  // when it gets to the last image, go back to the first image
  }
  slideToRight(); // this makes current = 0
});

displaySlide();

init();