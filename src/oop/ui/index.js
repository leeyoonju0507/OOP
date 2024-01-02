// 자바스크립트 엔진 = V8 엔진
// 클라이언트(실행 환경 = browser) => v8 엔진 탑재: window 객체를 제공한다
// 서버(실행 환경 = Node.js) => v8 엔진 탑재: 자바스크립트 엔진 실행 환경
window.addEventListener('load', () => {
  // 변수
  let userId = '';
  let password = '';
  let productTitle = '';
  let selectedProductIndexList = [];

  // 인증 화면
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const authButtonContainer = document.getElementById('auth-button-container');
  const loginButton = window.document.getElementById('login-button');

  // 인증 화면 스타일
  authButtonContainer.style.position = 'absolute';
  authButtonContainer.style.top = `${(windowHeight - authButtonContainer.clientHeight) / 2}px`;
  authButtonContainer.style.left = `${(windowWidth - authButtonContainer.clientWidth) / 2}px`;

  // 인증 화면 로직
  loginButton.addEventListener('click', (e) => {
    modalWrap.style.display = 'block';
    modalBody.style.marginTop = `${(window.innerHeight - modalBody.clientHeight) / 2}px`;
    modalAuthButtonContainer.style.position = 'relative';
    modalAuthButtonContainer.style.top = `${
      (modalBody.clientHeight - modalAuthButtonContainer.clientHeight) * 0.5
    }px`;
  });

  // 모달 창
  const modalWrap = window.document.getElementById('modal-wrap');
  const modalBody = window.document.getElementById('modal-body');
  const modalAuthButtonContainer = document.getElementById('modal-auth-button-container');
  const idInput = window.document.getElementById('id-input');
  const passwordInput = window.document.getElementById('password-input');
  const loginModal = document.getElementById('login-modal-button');
  const closeModal = window.document.getElementById('close-modal-button');

  // 모달 창 로직
  idInput.addEventListener('input', (e) => {
    userId = idInput.value;
  });
  passwordInput.addEventListener('input', (e) => {
    password = passwordInput.value;
  });
  loginModal.addEventListener('click', () => {
    window.location.href = 'home.html';
  });
  closeModal.addEventListener('click', (e) => {
    modalWrap.style.display = 'none';
    idInput.value = '';
    passwordInput.value = '';
  });

  // 상품 창
  const productTitleInput = window.document.getElementById('product-title-input');
  const buyButton = window.document.getElementById('buy-button');
  const addButton = window.document.getElementById('add-button');
  const productList = Array.from(window.document.getElementsByClassName('product'));
  const productContainer = window.document.getElementById('products-container');

  // 상품 창 로직
  for (let i = 0; i < productList.length; i++) {
    const product = productList[i];
    product.addEventListener('click', () => {
      addProductIndex(i);
    });
  }
  const addProductIndex = (productIndex) => {
    const findIndex = selectedProductIndexList.findIndex((selectedProductIndex) => {
      return selectedProductIndex === productIndex;
    });
    if (findIndex !== -1) {
      selectedProductIndexList.splice(findIndex, 1);
    } else {
      selectedProductIndexList.push(productIndex);
    }
  };
  buyButton.addEventListener('click', () => {
    const productList = Array.from(document.getElementsByClassName('product'));
    for (let i = 0; i < selectedProductIndexList.length; i++) {
      const index = selectedProductIndexList[i];
      productList[index].remove();
    }
    selectedProductIndexList = [];
  });
  productTitleInput.addEventListener('input', (e) => {
    productTitle += e.data;
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
