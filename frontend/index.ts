import AuthScreen from './app/auth-screen';
import Store from './app/store.js';

window.addEventListener('load', () => {
  const store = new Store();
  store.init();
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  const productContainer = document.getElementById('products-container');
  const buyButton = document.getElementById('buy-button');
  const productTitleInput: HTMLInputElement = document.getElementById(
    'product-title-input',
  ) as HTMLInputElement;
  const addButton = document.getElementById('add-button');
  const productList = Array.from(document.getElementsByClassName('product'));

  // 변수
  let productTitle = '';
  let selectedProductIndexList: number[] = [];

  if (!productContainer || !buyButton || !productTitleInput || !addButton) {
    return;
  }
  // 함수
  const addProductIndex = (productIndex: number) => {
    const findIndex = selectedProductIndexList.findIndex((selectedProductIndex) => {
      return selectedProductIndex === productIndex;
    });
    if (findIndex !== -1) {
      selectedProductIndexList.splice(findIndex, 1);
    } else {
      selectedProductIndexList.push(productIndex);
    }
  };

  for (let i = 0; i < productList.length; i++) {
    productList[i].addEventListener('click', () => {
      addProductIndex(i);
    });
  }

  buyButton.addEventListener('click', () => {
    const productList = Array.from(document.getElementsByClassName('product'));
    for (let i = 0; i < selectedProductIndexList.length; i++) {
      const index = selectedProductIndexList[i];
      productList[index].remove();
    }
    selectedProductIndexList = [];
  });

  productTitleInput.addEventListener('input', (e) => {
    productTitle = productTitleInput.value;
  });

  addButton.addEventListener('click', () => {
    productContainer.innerHTML +=
      '<div class="product">\n' +
      '        <label>\n' +
      '          <input type="checkbox" />\n' +
      `          ${productTitleInput.value}\n` +
      '        </label>\n' +
      '      </div>';
    const addedProduct = productContainer.children[productContainer.children.length - 1];
    addedProduct.addEventListener('click', () => {
      addProductIndex(productContainer.children.length - 1);
    });
  });
});
