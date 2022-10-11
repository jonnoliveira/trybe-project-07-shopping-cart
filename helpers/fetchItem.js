const getUrlId = (id) => `https://api.mercadolibre.com/items/${id}`;

const fetchItem = async (id) => {
  const url = getUrlId(id);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
