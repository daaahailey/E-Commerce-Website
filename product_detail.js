const magazineBtn = document.querySelector(".magazine_menu");
const detailPage = document.querySelector(".detail_page");
const aboutProduct = document.querySelector(".about_product");

// item details
const itemName = document.querySelector(".product_name");
const summary = document.querySelector(".description");
const itemPrice = document.querySelector(".price");
const itemColor = document.querySelector(".item_colors");
const addBtn = document.querySelector(".add_to_cart");
const checkoutBtn = document.querySelector(".go_to_checkout");
const detailBtn = document.querySelector(".more_details");
const details = document.querySelector(".product_details");
const detailBtnArrow = detailBtn.querySelector("div > i");

const openDetailsPage = () => {
  const shop = document.querySelector("#shop");
  shop.classList.add("hidden");
  detailPage.classList.remove("hidden");
};


const selectProduct = (product) => {
  details.innerText = "";
  itemColor.innerText = "";
  //   console.log("SELECTED PRODUCT", product);
  openDetailsPage();
  renderSelectedProduct(product);

};


// Add to basket and save it to local storage

let basket = [];
let quantity = 0;
const itemQuantity = document.querySelector(".quantity");

const addToBasket = () => {
  const name = document.querySelector(".product_name").innerText;
  basket.push(name);
  quantity += 1;
  itemQuantity.innerText = quantity;
  // console.log(basket);
  const basketObj = {
      items: basket,
      totalQuantity: quantity
  }
  // console.log(basketObj)
  localStorage.setItem("basket", JSON.stringify(basketObj));
  addBtn.classList.add("hidden");
  checkoutBtn.classList.remove("hidden");
}
addBtn.addEventListener("click", addToBasket);


const displayCheckoutBtn = () => {
  addBtn.classList.remove("hidden");
  checkoutBtn.classList.add("hidden");
};
checkoutBtn.addEventListener("click", displayCheckoutBtn);


const updateBasket = () => {
  const savedBasketObj = JSON.parse(localStorage.getItem("basket"));
  if (savedBasketObj !== null) {
    //   console.log(savedBasketObj);
    itemQuantity.innerText = savedBasketObj.totalQuantity;
    basket = savedBasketObj.items;
    quantity = savedBasketObj.totalQuantity;
  }
};

updateBasket();



const createItemColorOptions = (colorArray) => {
  colorArray.forEach((color) => {
    const colorDot = document.createElement("button");
    // colorDot.innerText = color;
    itemColor.append(colorDot);

    switch (color) {
      case "turquoise":
        colorDot.style.backgroundColor = `#5eaaa8`;
        break;
      case "grey":
        colorDot.style.backgroundColor = `#a6a9b6`;
        break;
      case "ivory":
        colorDot.style.backgroundColor = `#FFFFF0`;
        break;
      case "violet":
        colorDot.style.backgroundColor = `#af69f0`;
        break;
      case "yellow":
        colorDot.style.backgroundColor = `#fff76a`;
        break;
      case "salmon":
        colorDot.style.backgroundColor = `#fa8072`;
        break;
      case "green":
        colorDot.style.backgroundColor = `#158467`;
        break;
      case "tan":
        colorDot.style.backgroundColor = `#D2B48C`;
        break;
      case "sky blue":
        colorDot.style.backgroundColor = `#87ceeb`;
        break;
      case "orchid":
        colorDot.style.backgroundColor = `#da70d6`;
        break;
      case "purple":
        colorDot.style.backgroundColor = `#800080`;
        break;
      case "black":
        colorDot.style.backgroundColor = `#000000`;
        break;
      case "lime":
        colorDot.style.backgroundColor = `#bfff00`;
        break;
      case "magenta":
        colorDot.style.backgroundColor = `#ff00ff`;
        break;
      case "maroon":
        colorDot.style.backgroundColor = `#800000`;
        break;
      case "azure":
        colorDot.style.backgroundColor = `#007fff`;
        break;
      case "red":
        colorDot.style.backgroundColor = `#ff0000`;
    }
  });
};

const renderSelectedProduct = (product) => {
  itemName.innerText = product.name;
  summary.innerText = product.description;
  itemPrice.innerText = `$ ${product.price}`;
  createItemColorOptions(product.colors);
  //   console.log(product.colors);

  /// create more details
  const size = document.createElement("p");
  const size2 = document.createElement("p");
  const weight = document.createElement("p");
  const material = document.createElement("p");
  const filling = document.createElement("p");
  const comfort = document.createElement("p");

  details.append(size, size2, weight, material, filling, comfort);

  size.innerText = `- Dimensions: W: ${product.dimensions.w} cm D:${product.dimensions.d} cm H:${product.dimensions.h} cm`;
  size2.innerText = `- Seat Dimensions: W: ${product.seat_dimensions.w} cm D:${product.seat_dimensions.d} cm H:${product.seat_dimensions.h} cm`;
  weight.innerText = `- Weight: ${product.weight} kg`;
  material.innerText = `- Materials: ${product.materials
    .toString()
    .split(",")
    .join(", ")}`;
  filling.innerText = `- Filling materials: ${product.filling_materials
    .toString()
    .split(",")
    .join(", ")}`;
  comfort.innerText = `- Comfort level: ${product.comfort_level}`;
};

const displayDetails = () => {
  details.classList.toggle("hidden");
  detailBtnArrow.classList.toggle("fa-chevron-down");
  detailBtnArrow.classList.toggle("fa-chevron-up");
};

detailBtn.addEventListener("click", displayDetails);



// Detail page - image slider
let currentNum = 1;
const forwardBtn = document.querySelector(".forward");
const backwardBtn = document.querySelector(".backward");
const slideMain = document.querySelector(".slide_main");
const slides = document.querySelectorAll(".slide");



const productImgSlide = () => {
    backwardBtn.addEventListener("click", displayPrevious);
    forwardBtn.addEventListener("click", displayNext)
}

const displayPrevious = () => {  
    currentNum --;
    if (currentNum < 1) {
      currentNum = 4;
    }
    slideMain.src = `img/0${currentNum}.jpg`;
    // console.log(currentNum);
    dots.forEach(dot => {
      dot.classList.remove("active");
    })
    dots[currentNum-1].classList.add("active")

};

const displayNext = () => {
    currentNum ++; 
    if(currentNum > 4) {
        currentNum = 1;
    }
    slideMain.src = `img/0${currentNum}.jpg`; 
    // console.log(currentNum)
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[currentNum - 1].classList.add("active");

};


slides.forEach(slide => {
    slide.addEventListener("click", () => {
        const slideString = slide.src.toString();
        const slideIndex = slideString.slice(-6);
        const index = slideIndex.split("")[1];
        slideMain.src = slide.src;
        currentNum = parseInt(index);     
    }) 
})

productImgSlide();


// Display image slide by chosen dot
// Responsive slider - works when the screen size is 768px or smaller;
const dots = document.querySelectorAll(".dot");

const slideDotControl = (event) => {
  const dotArray = Array.from(dots); 
  const currentDot = event.target;
  const index = dotArray.indexOf(currentDot)
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  currentDot.classList.add("active");
  slideMain.src = `img/0${index+1}.jpg`; 
}
dots.forEach(dot => {
  dot.addEventListener("click", slideDotControl)
})





renderSelectedProduct(PRODUCTS[0]); // default for magazine: jules
