const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('1 - should be a function', () => {
    expect(typeof getSavedCartItems).toBe('function');
  })
  it('2 - should test if localStorage.getItem was called', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('3 - should test if localStorage.getItem was called with one parameter "cartItem"', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItem');
  });
});
