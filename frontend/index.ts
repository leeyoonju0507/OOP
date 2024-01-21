window.addEventListener('load', () => {
  // 다큐먼트 엘레먼트
  const modalWrap = document.getElementById('modal-wrap');
  const modalBody = document.getElementById('modal-body');
  const loginButton = document.getElementById('login-button');
  const closeModal = document.getElementById('close-modal');
  const idInput = document.getElementById('id-input') as HTMLInputElement;
  const passwordInput = document.getElementById('password-input') as HTMLInputElement;

  if (!loginButton || !closeModal || !idInput || !modalWrap || !modalBody || !passwordInput) {
    return;
  }

  loginButton.addEventListener('click', (e) => {
    modalWrap.style.display = 'block';
    modalBody.style.marginTop = `${(window.innerHeight - modalBody.clientHeight) / 2}px`;
  });

  closeModal.addEventListener('click', (e) => {
    modalWrap.style.display = 'none';
    idInput.value = '';
    passwordInput.value = '';
  });

  idInput.addEventListener('input', (e) => {
    userId = idInput.value;
  });

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
  let userId = '';
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
    const product = productList[i];
    product.addEventListener('click', () => {
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
