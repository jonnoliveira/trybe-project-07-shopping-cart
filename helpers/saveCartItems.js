const saveCartItems = (itemArray) => localStorage.setItem('cartItem', JSON.stringify(itemArray));

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
