import { fetchMenuItems, menuItems, getItemDataById } from '../data/menuData.js';
import { cart, addToCart, increaseQuantity, decreaseQuantity } from '../data/cart.js';
import { renderItemQuantity } from './itemQuantity.js';
import { renderOrderSummary } from './orderSummary.js';


// Function to render menu items on the page
async function renderMenuItems() {
  let menuItemsHTML = '';

  await fetchMenuItems();

  menuItems.forEach((item) => {
    menuItemsHTML += createMenuItemHTML(item);
  });

  const menuListElement = document.querySelector('.js-menu__list');

  menuListElement.innerHTML = menuItemsHTML;

  addEventListeners();
  renderOrderSummary();
}

// Function to create HTML for a menu item
function createMenuItemHTML(item) {
  return `
    <div class="menu__item js-menu__item-${item.id}">
      <div class="menu__item-image-wrapper">
        <img class="menu__item-image js-menu__item-image" data-item-id="${item.id}" src="${item.image.mobile}" alt="${item.name}">
        <div class="menu__add-to-cart-wrapper">
          <button class="menu__add-to-cart-button js-menu__add-to-cart-button" data-item-id="${item.id}">
            <img class="menu__add-to-cart-icon" src="assets/images/icon-add-to-cart.svg" alt="Add to Cart">
            Add to Cart
          </button>
          <div class="menu__item-quantity-wrapper">
            <button class="menu__item-quantity-button js-menu__quantity-decrease-button" data-item-id="${item.id}">
              <svg class="menu__quantity-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
            </button>
            <span class="menu__quantity js-menu__quantity-${item.id}">1</span>
            <button class="menu__item-quantity-button js-menu__quantity-increase-button" data-item-id="${item.id}">
              <svg class="menu__quantity-icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="menu__item-info-wrapper">
        <span class="menu__item-category">${item.category}</span>
        <span class="menu__item-name">${item.name}</span>
        <span class="menu__item-price">${item.getFormattedPrice()}</span>
      </div>
    </div>
  `;
}


// Function to add event listeners to buttons
function addEventListeners() {
  //get all add to cart button elements
  const addToCartButtons = document.querySelectorAll('.js-menu__add-to-cart-button');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      handleAddToCart(button);
    });
  });

  //get all increase quantity button elements
  const increaseQuantityButtons = document.querySelectorAll('.js-menu__quantity-increase-button');

  increaseQuantityButtons.forEach((button) => {
    button.addEventListener('click', () => {
      handleIncreaseQuantity(button);
    });
  });

  //get all decrease quantity button elements
  const decreaseQuantityButtons = document.querySelectorAll('.js-menu__quantity-decrease-button');

  decreaseQuantityButtons.forEach((button) => {
    button.addEventListener('click', () => {
      handleDecreaseQuantity(button);
    });
  });

  //update images on load
  handleUpdateImages();

  //Update images on resize
  window.addEventListener('resize', () => {
    handleUpdateImages();
  });

}

// Event handler for add to cart button click
function handleAddToCart(button) {
  const itemId = button.dataset.itemId;
  const itemElement = document.querySelector(`.js-menu__item-${itemId}`);

  itemElement.classList.add('added-to-cart');

  addToCart(itemId);

  renderItemQuantity(itemId);

  // Re-rendering the order summary if the cart is not empty
  if (cart) {
    renderOrderSummary();
  }
}

// Event handler for increase quantity button click
function handleIncreaseQuantity(button) {
  const itemId = button.dataset.itemId;

  increaseQuantity(itemId);

  // Updating the item quantity displayed
  renderItemQuantity(itemId);
  // Re-rendering the order summary
  renderOrderSummary();
}

// Event handler for decrease quantity button click
function handleDecreaseQuantity(button) {
  const itemId = button.dataset.itemId;
  const itemElement = document.querySelector(`.js-menu__item-${itemId}`);

  const quantity = decreaseQuantity(itemId);

  // If the quantity is zero, remove the 'added-to-cart' class
  if (quantity === 0) {
    itemElement.classList.remove('added-to-cart');
  }

  // Updating the item quantity displayed
  renderItemQuantity(itemId);
  // Re-rendering the order summary
  renderOrderSummary();
}

// Function to update the image source based on screen size
function handleUpdateImages() {
  const images = document.querySelectorAll('.js-menu__item-image');

  images.forEach((img) => {
    const itemId = img.dataset.itemId;
    const item = getItemDataById(itemId);

    if (window.innerWidth < 481) {
      img.src = item.image.mobile;
    } else if (window.innerWidth >= 481 && window.innerWidth <= 1075) {
      img.src = item.image.tablet;
    } else {
      img.src = item.image.desktop;
    }
  });
}

export { renderMenuItems };