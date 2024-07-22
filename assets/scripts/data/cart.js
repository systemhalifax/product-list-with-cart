export let cart = [];

// Adds an item to the cart.
export function addToCart(itemId) {
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem) {
        increaseQuantity(itemId);
    } else {
        cart.push({ id: itemId, quantity: 1 });
    }
}

// Removes an item from the cart.
export function removeFromCart(itemId) {
    cart = cart.filter(cartItem => cartItem.id !== itemId);
}

// Increases the quantity of an item in the cart.
export function increaseQuantity(itemId) {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        cartItem.quantity++;
    }
}

// Decreases the quantity of an item in the cart.
export function decreaseQuantity(itemId) {
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        if (cartItem.quantity - 1 === 0) {
            removeFromCart(itemId);
            return 0;
        } else {
            cartItem.quantity--;
            return cartItem.quantity;
        }
    }
    return 0;
}

// Gets the total number of items in the cart.
export function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

export function resetCart() {
    cart = []
}

// Gets the cart items.
// export function getCartItems() {
//     return cart;
// }
