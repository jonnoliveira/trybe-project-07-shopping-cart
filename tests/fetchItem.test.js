require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('1 - should be a function', () => {
    expect(typeof fetchItem).toBe('function');
  })
  it('2 - should test if fetch was called when given the id', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('3 - should test if when fetch is called it uses the correct endpoint', () => {
    fetchItem('MLB1615760527');
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  })
  it('4 - should test if the function return is the same as the item object', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  it('5 - should test if function return is an error when called without argument', () => {
    expect(fetchItem()).rejects.toThrow('You must provide an url');
  })
});
