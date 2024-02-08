window.addEventListener('load', () => {
  // 다큐먼트 엘레먼트
  const loginButton = document.getElementById('login-button');
  const loginIdInput = document.getElementById('login-id-input') as HTMLInputElement;
  const loginPasswordInput = document.getElementById('login-password-input') as HTMLInputElement;
  const container = document.getElementById('container');
  //변수
  let userId = '';
  let userPassword = '';

  if (!loginButton || !loginIdInput || !loginPasswordInput || !container) {
    return;
  }

  loginIdInput.addEventListener('input', (e) => {
    userId = loginIdInput.value;
  });
  loginPasswordInput.addEventListener('input', () => {
    userPassword = loginPasswordInput.value;
  });

  loginButton.addEventListener('click', async () => {
    if (!userId || !userPassword) {
      alert('아이디 또는 비밀번호를 다시 입력하세요');
      return;
    }
    const loginResult = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({userId, userPassword}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    container.style.display = 'block';
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
    // const product = productList[i];
    // product.addEventListener('click', () => {
    //   addProductIndex(i);
    // });
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
