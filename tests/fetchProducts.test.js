require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('1 - should be a function', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  it('2 - should test if fetch was called', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('3 - should test if the url was called in fetch', () => {
    fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('4 - should test if the function return is the same as the computerSearch object', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  })
  it('5 - should test if function return is an error when called without argument', () => {
    expect(fetchProducts()).rejects.toThrow('You must provide an url');
  })
})

