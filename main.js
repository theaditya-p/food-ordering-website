// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");

  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-line"
  );
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");

  menuBtnIcon.setAttribute(
    "class",
    "ri-menu-line"
  );
});


// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};


ScrollReveal().reveal(
  ".header__image img",
  {
    ...scrollRevealOption,
    origin: "right",
  }
);


ScrollReveal().reveal(
  ".header__content h1",
  {
    ...scrollRevealOption,
    delay: 500,
  }
);


ScrollReveal().reveal(
  ".header__content .section__description",
  {
    ...scrollRevealOption,
    delay: 1000,
  }
);


ScrollReveal().reveal(
  ".header__content .header__btn",
  {
    ...scrollRevealOption,
    delay: 1500,
  }
);


ScrollReveal().reveal(
  ".explore__image img",
  {
    ...scrollRevealOption,
    origin: "left",
  }
);


ScrollReveal().reveal(
  ".explore__content .section__header",
  {
    ...scrollRevealOption,
    delay: 500,
  }
);


ScrollReveal().reveal(
  ".explore__content .section__description",
  {
    ...scrollRevealOption,
    delay: 1000,
  }
);


ScrollReveal().reveal(
  ".explore__content .explore__btn",
  {
    ...scrollRevealOption,
    delay: 1500,
  }
);


ScrollReveal().reveal(
  ".banner__card",
  {
    ...scrollRevealOption,
    interval: 500,
  }
);


ScrollReveal().reveal(
  ".chef__image img",
  {
    ...scrollRevealOption,
    origin: "right",
  }
);


ScrollReveal().reveal(
  ".chef__content .section__header",
  {
    ...scrollRevealOption,
    delay: 500,
  }
);


ScrollReveal().reveal(
  ".chef__content .section__description",
  {
    ...scrollRevealOption,
    delay: 1000,
  }
);


ScrollReveal().reveal(
  ".chef__list li",
  {
    ...scrollRevealOption,
    delay: 1500,
    interval: 500,
  }
);


// ==========================================
// SWIPER TESTIMONIALS
// ==========================================

const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});


// ==========================================
// FOOD SEARCH
// ==========================================

const searchInput = document.getElementById("food-search");

const foodCards = document.querySelectorAll(
  ".special__card"
);


searchInput.addEventListener("input", () => {

  const searchValue =
    searchInput.value
      .toLowerCase()
      .trim();


  foodCards.forEach((card) => {

    const foodName =
      card
        .querySelector("h4")
        .textContent
        .toLowerCase();


    if (foodName.includes(searchValue)) {

      card.style.display = "";

    } else {

      card.style.display = "none";

    }

  });

});


// ==========================================
// FOOD CATEGORY FILTER
// ==========================================

const categoryButtons =
  document.querySelectorAll(".category-btn");


categoryButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory =
      button.dataset.category;


    // Remove active state
    // from all buttons

    categoryButtons.forEach((btn) => {

      btn.classList.remove("active");

    });


    // Add active state
    // to clicked button

    button.classList.add("active");


    // Clear search when
    // changing category

    searchInput.value = "";


    // Filter food cards

    foodCards.forEach((card) => {

      const cardCategory =
        card.dataset.category;


      if (
        selectedCategory === "all" ||
        cardCategory === selectedCategory
      ) {

        card.style.display = "";

      } else {

        card.style.display = "none";

      }

    });

  });

});



  
// ==========================================
// ORDERLY SHOPPING CART
// ==========================================

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartButton = document.getElementById("cart-button");

let cart = JSON.parse(localStorage.getItem("orderly-cart")) || [];


// Save cart in browser
function saveCart() {
  localStorage.setItem("orderly-cart", JSON.stringify(cart));
}


// Display cart items and total
function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let itemCount = 0;

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart">Your cart is empty.</p>';
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    const name = document.createElement("span");
    name.textContent = item.name;

    const price = document.createElement("span");
    price.textContent =
      "$" + (item.price * item.quantity).toFixed(2);

    const quantity = document.createElement("span");
    quantity.textContent = "Qty: " + item.quantity;

    const decrease = document.createElement("button");
    decrease.textContent = "−";
    decrease.type = "button";
    decrease.setAttribute("aria-label", "Decrease " + item.name);
    decrease.addEventListener("click", () => {
      changeQuantity(item.name, -1);
    });

    const increase = document.createElement("button");
    increase.textContent = "+";
    increase.type = "button";
    increase.setAttribute("aria-label", "Increase " + item.name);
    increase.addEventListener("click", () => {
      changeQuantity(item.name, 1);
    });

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.type = "button";
    remove.addEventListener("click", () => {
      cart = cart.filter((cartItem) => cartItem.name !== item.name);
      saveCart();
      renderCart();
    });

    row.append(name, price, decrease, quantity, increase, remove);
    cartItems.appendChild(row);
  });

  cartCount.textContent = itemCount;
  cartTotal.textContent = total.toFixed(2);
}


// Add or remove item quantities
function changeQuantity(name, change) {
  const item = cart.find((cartItem) => cartItem.name === name);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.name !== name);
  }

  saveCart();
  renderCart();
}


// Connect existing food cards
foodCards.forEach((card) => {
  const button = card.querySelector(".special__footer .btn");

  if (!button) return;

  button.addEventListener("click", () => {
    const name = card.querySelector("h4").textContent.trim();
    const priceText = card.querySelector(".price").textContent;
    const price = Number(priceText.replace(/[^0-9.]/g, ""));

    if (!Number.isFinite(price) || price <= 0) return;

    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1
      });
    }

    saveCart();
    renderCart();

    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 800);
  });
});


// Click shopping bag to view cart
cartButton.addEventListener("click", () => {
  document.getElementById("cart").scrollIntoView({
    behavior: "smooth"
  });
});


// Load saved cart on page startup
renderCart();

