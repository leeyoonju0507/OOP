// 자바스크립트 엔진 = V8 엔진
// 클라이언트(실행 환경 = browser) => v8 엔진 탑재: window 객체를 제공한다
// 서버(실행 환경 = Node.js) => v8 엔진 탑재: 자바스크립트 엔진 실행 환경
window.addEventListener('load', () => {
  // 다큐먼트 엘레먼트
  const modalWrap = document.getElementById('modal-wrap');
  const modalBody = document.getElementById('modal-body');
  const loginButton = document.getElementById('login-button');
  const closeModal = document.getElementById('close-modal');
  const idInput = document.getElementById('id-input');
  const passwordInput = document.getElementById('password-input');

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
  const productTitleInput = document.getElementById('product-title-input');
  const addButton = document.getElementById('add-button');
  const productList = Array.from(document.getElementsByClassName('product'));

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
  const signupButton = window.document.getElementById('sign-up-button');

  signupButton.addEventListener('click', (e) => {
    window.location.href = 'signup.html';
  });
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

  // 로그인 모달 창
  const modalWrap = window.document.getElementById('login-modal-wrap');
  const modalBody = window.document.getElementById('login-modal-body');
  const modalAuthButtonContainer = document.getElementById('modal-auth-button-container');
  const idInput = window.document.getElementById('id-input');
  const passwordInput = window.document.getElementById('password-input');
  const loginModal = document.getElementById('login-modal-button');
  const closeModal = window.document.getElementById('close-modal-button');

  // 로그인 모달 창 로직
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

  //회원가입 창
  // const signupForm = window.document.getElementById('sign-up-form');
  // signupForm.style.position = 'relative';
  // signupForm.style.top = `${(windowHeight) * 0.5}px`

  // const checkSignUpButton = window.document.getElementById('check-signup-button');
  // const signupWrap = window.document.getElementById('signup-modal-wrap');
  // const signupBody = window.document.getElementById('signup-modal-body');
  // const closeSignUpModal = window.document.getElementById('close-signupmodal-button')

  // checkSignUpButton.addEventListener('click',(e)=>{
  //   signupWrap.style.display = 'block';
  //   signupBody.style.marginTop = `${(window.innerHeight - modalBody.clientHeight) / 2}px`;
  // })

  // closeSignUpModal.addEventListener('click',(e)=>{
  //   signupWrap.style.display = 'none';
  // })

  // 상품 창
  const productTitleInput = window.document.getElementById('product-title-input');
  const buyButton = window.document.getElementById('buy-button');
  const addButton = window.document.getElementById('add-button');
  const productList = Array.from(window.document.getElementsByClassName('product'));
  const productContainer = window.document.getElementById('products-container');

  //home.html: 등록하기 클릭시 팝업창
  const popUpWrap = window.document.getElementById('popup-wrap');
  const popUpBody = window.document.getElementById('popup-body');
  productContainer.style.position = 'relative';
  productContainer.style.top = `${window.innerHeight * 0.5}px`;
  addButton.addEventListener('click', (e) => {
    popUpWrap.style.display = 'block';
    popUpBody.style.marginTop = `${(window.innerHeight - popUpBody.clientHeight) / 2}px`;
  });
  const closePopup = window.document.getElementById('close-popup-button');
  closePopup.addEventListener('click', (e) => {
    popUpWrap.style.display = 'none';
  });

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
