const sortBySpan = document.querySelector(".sortBy_text");

const toggleIcon = document.querySelectorAll(".toggleArrow");
const activateSideMenu = document.querySelectorAll(".side_menu_hidden");

// Activate drop side bar - drop down menu (hidden by default)
function dropDown(index) {
  if (activateSideMenu[index].classList.contains("active")) {
    activateSideMenu[index].classList.remove("active");
    activateSideMenu[index].classList.add("side_menu_hidden");
    toggleIcon[index].innerHTML = `<i class="fas fa-chevron-down"></i>`;
  } else {
    activateSideMenu[index].classList.add("active");
    activateSideMenu[index].classList.remove("side_menu_hidden");
    toggleIcon[index].innerHTML = `<i class="fas fa-chevron-up"></i>`;
  }
}

// Event Listeners for side bar
const collectionLists = document.querySelector(".collection_menu_container");
const colorLists = document.querySelector(".color_menu_container");
const categoryLists = document.querySelector(".category_menu_container");

collectionLists.addEventListener("click", () => dropDown(0));
colorLists.addEventListener("click", () => dropDown(1));
categoryLists.addEventListener("click", () => dropDown(2));

// Price range slider
(function () {
  const slider = document.querySelector(".range_slider");
  if (!slider) return;

  const inputRanges = slider.querySelectorAll("input[type=range]");
  const inputNumbers = slider.querySelectorAll("input[type=number]");

  inputRanges.forEach(function (element) {
    element.oninput = function () {
      let min = parseFloat(inputRanges[0].value);
      let max = parseFloat(inputRanges[1].value);
      if (min > max) {
        [min, max] = [max, min];
      }
      inputNumbers[0].value = min;
      inputNumbers[1].value = max;
    };
  });

  inputNumbers.forEach(function (element) {
    element.oninput = function () {
      let number1 = parseFloat(inputNumbers[0].value);
      let number2 = parseFloat(inputNumbers[1].value);
      if (number1 > number2) {
        let temp = number1;
        inputNumbers[0].value = number2;
        inputNumbers[1].value = temp;
      }
      inputRanges[0].value = number1;
      inputRanges[1].value = number2;
    };
  });
})();

// PRODUCT LISTING
const productsContainer = document.querySelector("#products_container");
const colorOptionsContainer = document.querySelector("#color_options");
const categoryOptionsContainer = document.querySelector("#category_options");
const filterForm = document.querySelector("form");

const renderProduct = (product) => {
  // create div
  const productCard = document.createElement("div");
  const productInfo = document.createElement("div");
  const productInfoBox = document.createElement("div");
  const productName = document.createElement("h3");
  const productDetail = document.createElement("div");
  const productType = document.createElement("div");
  const productPrice = document.createElement("div");

  productCard.className = "product-card";
  productName.className = "product-name";
  productInfo.className = "product-info";
  productInfoBox.className = "product-info-box";
  productDetail.className = "product-detail";
  productType.className = "product-type";
  productPrice.className = "product-price";

  // display product details
  productName.innerText = product.name;
  productType.innerText = product.type.toUpperCase();
  productPrice.innerText = `$ ${product.price}`;

  // cart icon
  const cartIcon = document.createElement("div");
  cartIcon.className = "cart-icon";
  cartIcon.innerHTML = `<i class="fas fa-cart-plus"></i>`;

  // add div to page
  productInfo.append(productName);
  productDetail.append(productType);
  productDetail.append(productPrice);
  productInfo.append(productDetail);
  productInfoBox.append(productInfo);
  productInfoBox.append(cartIcon);
  productCard.append(productInfoBox);

  productsContainer.append(productCard);

  // product image
  const typeName = productType.innerText.toLowerCase();
  const img = document.createElement("img");

  img.src = `img/${typeName}.png`;
  productCard.prepend(img);

  // select product
  productCard.addEventListener("click", () => {
    selectProduct(product);
  });
};

let currentPage = 1;
const productsPerPage = 6;
const pageDownBtn = document.querySelector(".page_down");
const pageUpBtn = document.querySelector(".page_up");
const numberPages = document.querySelector(".page_numbers");

const renderProducts = (products) => {
  // console.log(products);
  productsContainer.innerText = ""; //to clear the product (if you don't do it, it will keep adding products on top of rendered products)
  numberPages.innerText = "";
  products
    .sort((a, b) => {
      if (sortBySpan.innerText === "HIGHEST PRICE") {
        return b.price - a.price;
      } else if (sortBySpan.innerText === "LOWEST PRICE") {
        return a.price - b.price;
      }
    })
    .filter((products, index) => {
      // pagination
      const min = productsPerPage * (currentPage - 1); // 0
      const max = min + productsPerPage;
      // console.log(min, max);
      return index >= min && index < max;
    })
    .forEach((product) => {
      renderProduct(product);
    });
    SetupPaginationPages(products, numberPages, productsPerPage);
};

const SetupPaginationPages = (productsToRender, numberPages, productsPerPage) => {
  numberPages.innerText= "";
  let page = 0;
  const totalPages = Math.ceil(productsToRender.length / productsPerPage) + 1; //4
  for (let i = 1; i < totalPages; i++) {
    const newPage = document.createElement("button");
    page += 1;
    newPage.innerText = page;
    newPage.classList.add("page_num");
    numberPages.append(newPage);
  }
  const currentTotalPage = document.querySelectorAll(".page_num");
  activateNewPagesNum(currentTotalPage);
  markCurrentPage(currentPage, currentTotalPage);
};



const updatePage = (direction) => {
  // -1 || 1
  const totalPages = document.querySelectorAll(".page_num");
  currentPage += direction;
  pageDownBtn.disabled = currentPage < 2;
  pageUpBtn.disabled =
    currentPage > totalPages.length -1;
  applyFilters(getColorSelected(), getTypeSelected(), getPriceRange());
};

pageDownBtn.addEventListener("click", () => {
  updatePage(-1);
});

pageUpBtn.addEventListener("click", () => {
  updatePage(1);
});

// Product listing page previous and next buttons
const activateNewPagesNum = (totalPages) => {
  totalPages.forEach((num) => {
    num.addEventListener("click", () => {
      currentPage = parseInt(num.innerText);
      applyFilters(getColorSelected(), getTypeSelected(), getPriceRange());
      pageDownBtn.disabled = currentPage < 2;
      pageUpBtn.disabled = currentPage > totalPages.length - 1;
    });
  });
};

const markCurrentPage = (currentPage, newPages) => {
  // console.log(newPages)
  if (currentPage === 1) {
    newPages[0].style.textDecoration = "underline";
  }
  //if currentPage=  1, mark 1
  newPages.forEach((num) => {
    if (currentPage === parseInt(num.innerText)) {
      // num.classList.add("activePage")
      num.style.textDecoration = "underline";
    } else {
      num.style.textDecoration = "none";
    }
  });
};

const sortByHighestBtn = document.querySelector(".sort_highest");
const sortByButtons = document.querySelectorAll(".sortBy_lists > ul > li");

const applySortOption = (sortOption) => {
  selectedSortOption = sortOption;
  applyFilters(getColorSelected(), getTypeSelected(), getPriceRange());
};

sortByButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedSortOption = event.target;
    selectedSortOption.classList.toggle("selected");
    home.classList.add("hidden");
    shop.classList.remove("hidden");

    // Sort by option will be displayed by chosen option.
    if (selectedSortOption.classList.contains("selected")) {
      sortBySpan.innerText = selectedSortOption.innerText;
      sortByArrow.classList.remove("fa-chevron-up");
      sortByArrow.classList.add("fa-chevron-down");
      sortByListsContainer.classList.remove("showSortBy");
      selectedSortOption.classList.remove("selected");
    }

    applySortOption(selectedSortOption.classList.value);
  });
});

const uniqueColors = () => {
  const colors = PRODUCTS.map((product) => product.colors).flat();
  return [...new Set(colors)];
};

const uniqueCategories = () => {
  const type = PRODUCTS.map((product) => product.type).flat();
  return [...new Set(type)];
};

// Create checkbox and color for each colors in array
const createColorOptions = (colors) => {
  colors.forEach((color) => {
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = color;
    checkbox.name = "color";
    div.append(checkbox);
    const label = document.createElement("label");
    label.innerText = color;
    div.append(label);
    colorOptionsContainer.append(div);
  });
};

const createCategoryOptions = (types) => {
  types.forEach((type) => {
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = type;
    checkbox.name = "type";

    div.append(checkbox);

    const label = document.createElement("label");
    label.innerText = type;

    div.append(label);
    categoryOptionsContainer.append(div);
  });
};

const applyFilters = (colors, type, priceRange) => {
  const productsToRender = PRODUCTS.filter((product) => {
    return colors.length === 0
      ? true
      : product.colors.some((productColor) => colors.includes(productColor));
  })
    .filter((product) => {
      return type.length === 0 ? true : type.includes(product.type);
    })
    .filter((product) => {
      return product.price >= priceRange.min && product.price <= priceRange.max;
    });
  renderProducts(productsToRender);
};

const getColorSelected = () => {
  //get selected colors
  const selectedColorInput = [...filterForm.elements.color];
  const colorsSelected = selectedColorInput
    .filter((input) => input.checked)
    .map((input) => input.value);
  return colorsSelected;
};

const getTypeSelected = () => {
  //get selected type
  const selectedTypeInput = [...filterForm.elements.type];
  const typeSelected = selectedTypeInput
    .filter((input) => input.checked)
    .map((input) => input.value);
  return typeSelected;
};

const getPriceRange = () => {
  //get price
  const minPrice = document.querySelector(".min_text > input").value;
  const maxPrice = document.querySelector(".max_text > input").value;
  return {
    min: minPrice,
    max: maxPrice,
  };
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  applyFilters(getColorSelected(), getTypeSelected(), getPriceRange());
};

filterForm.addEventListener("submit", handleFormSubmit);

function start() {
  renderProducts(PRODUCTS);
  createColorOptions(uniqueColors());
  createCategoryOptions(uniqueCategories());
  updatePage(0);
}

start();
