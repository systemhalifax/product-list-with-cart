import formatCurrency from "../utils/money.js";
import generateUUID from "../utils/generateUUID.js";

class MenuItem {
  constructor(itemDetails) {
    this.id = generateUUID();
    this.image = itemDetails.image;
    this.name = itemDetails.name;
    this.category = itemDetails.category;
    this.price = itemDetails.price;
  }

  // Method to get the formatted price of the menu item
  getFormattedPrice() {
    return `$${formatCurrency(this.price * 100)}`;
  }
}

// Array to hold menu data
export let menuItems = [];

// Function to fetch menu items from the backend and populate the menuData array
export async function fetchMenuItems() {
  try {
    const response = await fetch('assets/backend/data.json');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const menuItemsData = await response.json();
    menuItems = menuItemsData.map(itemDetails => new MenuItem(itemDetails));
  } catch (error) {
    console.error('Error fetching the JSON:', error);
  }
}

// Function to get data for a specific menu item by its ID
export function getItemDataById(itemId) {
  return menuItems.find(item => item.id === itemId);
}
