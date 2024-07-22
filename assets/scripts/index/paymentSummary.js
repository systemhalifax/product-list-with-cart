import { cart, resetCart } from "../data/cart.js";
import { getItemDataById } from "../data/menuData.js";
import { renderMenuItems } from "./menu.js";
import formatCurrency from "../utils/money.js";

// Function to render the payment summary after confirming the order.
export function renderPaymentSummary(totalCost) {
  const confirmOrderButton = document.querySelector('.js-cart__confirm-order-button');
  const cartPaymentElement = document.querySelector('.js-cart__payment');
  const paymentSummaryHTML = generatePaymentSummaryHTML(totalCost);

  if (confirmOrderButton) {
    confirmOrderButton.addEventListener('click', () => {
      cartPaymentElement.innerHTML = paymentSummaryHTML;
      window.scrollTo(0, 0);
      attachNewOrderEventListener();
    });
  }
}

// Function to generate the HTML for the payment summary.
function generatePaymentSummaryHTML(totalCost) {
  return `
    <div class="cart__payment">
      <div class="cart__payment-summary">
        <div class="cart__payment-status-wrapper">
          <img src="assets/images/icon-order-confirmed.svg" alt="Order Confirmed">
          <span>Order<br>Confirmed</span>
          <span>We hope you enjoy your food!</span>
        </div>
        <div class="cart__payment-group-items">
          ${generateOrderedItemListHTML()}
          <div class="cart__payment-total-cost">
            <span>Order Total</span>
            <h2 class="cart__payment-cost">$${formatCurrency(totalCost * 100)}</h2>
          </div>
        </div>
        <button class="cart__new-order-button js-cart__new-order-button">Start New Order</button>
      </div>
    </div>
  `;
}

// Function to generate the HTML for the list of ordered items.
function generateOrderedItemListHTML() {
  return cart.map((cartItem) => {
    const itemData = getItemDataById(cartItem.id);
    const itemTotalCost = itemData.price * cartItem.quantity;

    return `
      <div class="cart__payment-item">
        <img class="cart__payment-item-thumbnail" src="${itemData.image.thumbnail}" alt="${itemData.name}">
        <div class="cart__payment-item-summary">
          <h5 class="cart__payment-item-name">${itemData.name}</h5>
          <div class="cart__payment-cost-info">
            <span class="cart__payment-item-quantity">${cartItem.quantity}x</span>
            <span class="cart__payment-item-price">@ $${formatCurrency(itemData.price * 100)}</span>
          </div>
        </div>
        <span class="cart__payment-item-total-cost">$${formatCurrency(itemTotalCost * 100)}</span>
      </div>
    `;
  }).join('');
}

// Function to add event listeners for the new order button.
function attachNewOrderEventListener() {
  const newOrderButton = document.querySelector('.js-cart__new-order-button');
  const cartPaymentElement = document.querySelector('.js-cart__payment');

  if (newOrderButton) {
    newOrderButton.addEventListener('click', () => {
      cartPaymentElement.innerHTML = '';
      renderMenuItems();
      resetCart();
    });
  }
}
