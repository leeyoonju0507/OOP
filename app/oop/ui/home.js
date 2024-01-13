window.addEventListener('load', () => {
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
  productContainer.style.top = `${window.innerHeight * 0.02}px`;
  addButton.addEventListener('click', (e) => {
    popUpWrap.style.display = 'block';
    popUpBody.style.marginTop = `${(window.innerHeight - popUpBody.clientHeight) / 2}px`;
  });
  const closePopup = window.document.getElementById('close-popup-button');
  closePopup.addEventListener('click', (e) => {
    popUpWrap.style.display = 'none';
  });
});
