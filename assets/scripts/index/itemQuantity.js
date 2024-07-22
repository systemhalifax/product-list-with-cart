import { cart } from "../data/cart.js";

// Updates the displayed quantity for a menu item based on its ID.
export function renderItemQuantity(itemId) {
  const matchingItem = cart.find(item => item.id === itemId);
  const itemQuantityElement = document.querySelector(`.js-menu__quantity-${itemId}`);

  if (itemQuantityElement) {
    itemQuantityElement.innerHTML = matchingItem ? matchingItem.quantity : 0;
  }
}
