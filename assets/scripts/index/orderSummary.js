import { cart, removeFromCart } from "../data/cart.js";
import { getItemDataById } from "../data/menuData.js";
import formatCurrency from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";


// Function to render the order summary in the cart
export function renderOrderSummary() {
    let totalQuantity = 0;
    let totalCost = 0;

    // Calculate total quantity and cost
    cart.forEach((cartItem) => {
        const itemData = getItemDataById(cartItem.id);
        totalQuantity += cartItem.quantity;
        totalCost += itemData.price * cartItem.quantity;
    });

    // Generate the order summary HTML or empty cart HTML based on the cart contents
    const orderSummaryHTML = cart.length > 0 ? generateOrderSummaryHTML(totalCost) : generateEmptyCartHTML();

    // Update the cart quantity and order summary in the DOM
    const cartQuantityElement = document.querySelector('.js-cart__quantity');
    const orderSummaryElement = document.querySelector('.js-cart__order-summary');

    cartQuantityElement.innerHTML = `Your Cart (${totalQuantity})`;
    orderSummaryElement.innerHTML = orderSummaryHTML;

    // Attach event listeners to the remove item buttons
    attachRemoveItemEventListeners();

    // Render the payment summary with the total cost
    renderPaymentSummary(totalCost);
}

// Function to generate the HTML for the order summary
function generateOrderSummaryHTML(totalCost) {
  return `
    <div class="cart__group-items">
    ${generateOrderListHTML()}
    </div>
    <div class="cart__order-total-cost">
      <span>Order Total</span>
      <h2 class="cart__total-cost">$${formatCurrency(totalCost * 100)}</h2>
    </div>
    <div class="cart__delivery-info">
      <img src="assets/images/icon-carbon-neutral.svg" alt="Carbon Neutral Delivery">
      This is a <span>carbon-neutral</span> delivery
    </div>
    <button class="cart__confirm-order-button js-cart__confirm-order-button">Confirm Order</button>
  `;
}

// Function to generate the HTML for the order list
export function generateOrderListHTML() {
  return cart.map((cartItem) => {
    const itemData = getItemDataById(cartItem.id);
    const itemTotalCost = itemData.price * cartItem.quantity;

    return `
      <div class="cart__item">
        <div class="cart__item-summary">
          <h5 class="cart__item-name">${itemData.name}</h5>
          <div class="cart__item-cost-info">
            <span class="cart__item-quantity">${cartItem.quantity}x</span>
            <span class="cart__item-price">@ $${formatCurrency(itemData.price * 100)}</span>
            <span class="cart__item-total-cost">$${formatCurrency(itemTotalCost * 100)}</span>
          </div>
        </div>
        <button class="cart__remove-item-button js-cart__remove-item-button" data-item-id="${cartItem.id}">
          <img src="assets/images/icon-remove-item.svg" alt="Remove Item">
        </button>
      </div>
      `;
  }).join('');
}

// Function to generate the HTML for an empty cart
function generateEmptyCartHTML() {
  return `
    <div class="cart-empty">
      <img class="cart-empty__image" src="assets/images/illustration-empty-cart.svg" alt="Empty Cart">
      <span class="cart-empty__text">Your added items will appear here</span>
    </div>
  `;
}

// Function to attach event listeners to remove item buttons
function attachRemoveItemEventListeners() {
  //get all remove item button elements
  const removeItemButtons = document.querySelectorAll('.js-cart__remove-item-button');

  removeItemButtons.forEach((button) => {
      button.addEventListener('click', handleRemoveItem);
  });
}

// Event handler for remove item button click
function handleRemoveItem(event) {
  const button = event.target.closest('.js-cart__remove-item-button');
  const itemId = button.dataset.itemId;
  const itemElement = document.querySelector(`.js-menu__item-${itemId}`);

  if (itemElement) {
      itemElement.classList.remove('added-to-cart');
  }

  // Remove item from cart and re-render order summary
  removeFromCart(itemId);
  renderOrderSummary();
}
