// 자바스크립트 엔진 = V8 엔진
// 클라이언트(실행 환경 = browser) => v8 엔진 탑재: window 객체를 제공한다
// 서버(실행 환경 = Node.js) => v8 엔진 탑재: 자바스크립트 엔진 실행 환경
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    // 변수
    let userId = '';
    let password = '';
    let productTitle = '';
    let selectedProductIndexList: number[] = [];

    // 인증 화면
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const authButtonContainer = document.getElementById('auth-button-container');
    const loginButton = window.document.getElementById('login-button');
    const signupButton = window.document.getElementById('sign-up-button');
    const connectButton = window.document.getElementById('connect-button');

    // 로그인 모달 창
    const modalWrap = window.document.getElementById('login-modal-wrap');
    const modalBody = window.document.getElementById('login-modal-body');
    const modalAuthButtonContainer = document.getElementById('modal-auth-button-container');
    const idInput = window.document.getElementById('id-input') as HTMLInputElement;
    const passwordInput = window.document.getElementById('password-input') as HTMLInputElement;
    const loginModal = document.getElementById('login-modal-button');
    const closeModal = window.document.getElementById('close-modal-button');

    if (
      !authButtonContainer ||
      !loginButton ||
      !signupButton ||
      !modalWrap ||
      !modalBody ||
      !modalAuthButtonContainer ||
      !idInput ||
      !passwordInput ||
      !loginModal ||
      !closeModal ||
      !connectButton
    ) {
      return;
    }

    connectButton.addEventListener('click', async () => {
      // 서버에 통신을 보내는 방법
      // fetch: 내장
      const res = await fetch('http://localhost:3000', {
        method: 'GET', // GET POST PATCH PUT DELETE
      });
      const result = await res.json();
      console.log(result);

      const res2 = await fetch('http://localhost:3000/login', {
        method: 'POST', // GET POST PATCH PUT DELETE
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email: 'xxx@naver.com',
          password: 1234,
        }),
      });
      const result2 = await res2.json();
      console.log(result2);
      location.href = 'home.html';
    });

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
    const productTitleInput = window.document.getElementById('product-title-input') as HTMLInputElement;
    const buyButton = window.document.getElementById('buy-button');
    const addButton = window.document.getElementById('add-button');
    const productList = Array.from(window.document.getElementsByClassName('product'));
    const productContainer = window.document.getElementById('products-container');

    //home.html: 등록하기 클릭시 팝업창
    const popUpWrap = window.document.getElementById('popup-wrap');
    const popUpBody = window.document.getElementById('popup-body');
    const closePopup = window.document.getElementById('close-popup-button');

    if (!productContainer || !addButton || !buyButton || !popUpWrap || !popUpBody || !closePopup) {
      return;
    }

    productContainer.style.position = 'relative';
    productContainer.style.top = `${window.innerHeight * 0.5}px`;
    addButton.addEventListener('click', (e) => {
      popUpWrap.style.display = 'block';
      popUpBody.style.marginTop = `${(window.innerHeight - popUpBody.clientHeight) / 2}px`;
    });
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
    buyButton.addEventListener('click', () => {
      const productList = Array.from(document.getElementsByClassName('product'));
      for (let i = 0; i < selectedProductIndexList.length; i++) {
        const index = selectedProductIndexList[i];
        productList[index].remove();
      }
      selectedProductIndexList = [];
    });
    productTitleInput.addEventListener('input', (e) => {
      // productTitle += e.data;
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
}
