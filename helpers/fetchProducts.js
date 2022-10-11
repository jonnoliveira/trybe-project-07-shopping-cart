const getUrl = (item) => `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

const fetchProducts = async (item) => {
  const url = getUrl(item);

  try {
  const response = await fetch(url);
  const data = await response.json();
  return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
