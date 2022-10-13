const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  const itemArray = [
    {
      "id": "MLB2162947965",
      "title": "Monitor Gamer LG Ultrawide 29wk600 Led 29   Branco E Preto 100v/240v",
      "price": 1499
    },
    {
      "id": "MLB1985971147",
      "title": "Desktop Mini Atx G41m-s01 Dual Core E6700 4gb Ddr3 Hd 320gb",
      "price": 735
    },
    {
      "id": "MLB2187832413",
      "title": "Notebook Multilaser Legacy Book Pc310 Preta 14.1 , Intel Celeron N3000  4gb De Ram 64gb Ssd, Intel Hd Graphics 1366x768px Windows 10 Home",
      "price": 1261.04
    }
  ]
  const param = ['cartItem', JSON.stringify(itemArray)];
  it('1 - should be a function', () => {
    expect(typeof saveCartItems).toBe('function');
  })
  it('2 - should test if localStorage.setItem was called', () => {
    saveCartItems(itemArray);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('3 - should test if localStorage was called with two parameters "key(carItem): value"', () => {
    saveCartItems(itemArray);
    expect(localStorage.setItem).toHaveBeenCalledWith(param[0], param[1]);
  });
});
