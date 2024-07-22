//Formats a price given in cents to a string representing the amount in dollars.
function formatCurrency(priceCents) {
  // Check if the price is negative
  const isNegative = priceCents < 0;
  
  // Get the absolute value of the price
  const absoluteValue = Math.abs(priceCents);
  
  // Round the absolute value to the nearest integer
  const roundedValue = Math.round(absoluteValue);
  
  // Format the value to two decimal places, representing dollars and cents
  const formattedValue = (roundedValue / 100).toFixed(2);

  // Return the formatted value with a negative sign if the original price was negative
  return isNegative ? `-${formattedValue}` : formattedValue;
}

export default formatCurrency;
