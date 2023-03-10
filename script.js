// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

// SELETOR PARA OS ITENS DA LISTA DO CARRINHO E SEUS VALORES
const listItem = document.querySelector('.cart__items');
const divPrice = document.querySelector('.total-price');
let sum = 0;

//  FUNÇÃO QUE SOMA O VALOR TOTAL DOS ITENS DO CARRINHO
const addItemPrice = (price) => {
  sum += price;
  divPrice.innerText = `R$ ${sum}`;
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const image = createProductImageElement(thumbnail);
  const li = document.createElement('li');
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.className = 'cart__item';
  li.appendChild(image);
  li.addEventListener('click', (event) => {
    // EVENTO QUE APAGA CADA ITEM DO CARRINHO QUANDO CLICKADO E SUBTRAI O PREÇO
    const clickedElement = event.target;
    listItem.removeChild(clickedElement);

    const newValue = sum - price;
    divPrice.innerText = `R$ ${newValue}`;
    sum = newValue;
  });
  return li;
};

// FUNÇÃO LOADING DA API CRIA ELEMENTO
const loadingApi = () => {
  const divLoading = document.createElement('div');
  divLoading.className = 'loading';
  divLoading.innerText = 'carregando...';

  const section = document.querySelector('.items');
  section.appendChild(divLoading);
};

// FUNÇÃO LOADING DA API REMOVE ELEMENTO
const rmvloadingApi = () => {
  const divLoading = document.querySelector('.loading');
  const section = document.querySelector('.items');

  section.removeChild(divLoading);
};

// ADICIONA ITENS DA API NA SEÇÃO
loadingApi();
fetchProducts('computador').then((data) => {
  // SELETOR PARA CADA ITEM CRIADO
  const section = document.querySelector('.items');
  data.results.forEach((element) => {
    section.appendChild(createProductItemElement(element));
  });
  rmvloadingApi();
});

// FUNÇÃO PARA ADICIONAR ITENS AO CARRINHO
const addFromButton = async () => {
  // SELETOR DOS RESULTADOS DOS PRODUTOS DA API E DOS BOTÕES DA PÁGINA
  const data = (await fetchProducts('computador')).results;
  const buttons = document.querySelectorAll('.item__add');
  const storage = [];

  data.forEach(async (dataElement, index) => {
    buttons[index].addEventListener('click', async (event) => {
      const item = event.target.parentElement;
      const itemId = getIdFromProductItem(item);
      const itemInfo = await fetchItem(itemId);
      listItem.appendChild(createCartItemElement(itemInfo));
      // LOCALSTORAGE INFO ITEM
      const { id, title, price } = itemInfo;
      const itemStorage = { id, title, price };
      storage.push(itemStorage);
      saveCartItems(storage);
      addItemPrice(price);
    });
  });
};

// FUNÇÃO QUE BUSCA OS ITENS SALVOS NO LOCALSTORAGE E OS MANTEM NO CARRINHO
const recoveryCart = () => {
  if (localStorage.cartItem) {
    const memory = JSON.parse(getSavedCartItems());
    memory.forEach((element) => {
      listItem.appendChild(createCartItemElement(element));
    });
  }
  localStorage.clear();
};

// SELETOR BOTÃO CARRINHO
const buttonCart = document.querySelector('.empty-cart');

// FUNÇÃO PARA LIMPAR O CARRINHO E O PREÇO FINAL
const clearCart = () => {
  const cartList = document.querySelector('.cart__items');
  cartList.innerHTML = '';
  sum = 0;
  divPrice.innerText = `R$ ${sum}`;
};

buttonCart.addEventListener('click', clearCart);

// Botão cabeçalho
const buttonCartHeader = document.querySelector('.btn-card-header');

const showCart = () => {
  const cart = document.querySelector('.cart');
  if (cart.style.display !== 'none') {
    cart.style.display = 'none';
  } else {
    cart.style.display = 'block';
  }
}

buttonCartHeader.addEventListener('click', showCart);


window.onload = () => {
  addFromButton();
  recoveryCart();
};
