import {ILoginData} from '../specification/interfaces';

export interface IHomeScreen {
  mainUI(user: ILoginData): Promise<boolean | undefined>;
  sellerUI(user: ILoginData): Promise<boolean>;
  buyerUI(user: ILoginData): Promise<boolean>;
}
interface IProductClient {
  id: number;
  title: string;
  price: number;
  content: string;
}
interface checkSoldOutResponse {
  isSuccess: boolean;
  msg: string;
}
class HomeScreen implements IHomeScreen {
  private loginSignupSelectScreen: HTMLElement;
  private logOutScreen: HTMLElement;
  //
  private welcome: HTMLElement;
  private ProductListButton: HTMLElement;
  private productTitleInput: HTMLInputElement;
  private productPriceInput: HTMLInputElement;
  private productContentInput: HTMLInputElement;
  private addButton: HTMLElement;
  private ul: HTMLElement;
  private productTitle: string;
  private productPrice: string;
  private productContent: string;
  private productListAndAdd: HTMLElement;

  // private productRegister: HTMLElement;
  // private productContainer: HTMLElement;
  private buyContainer: HTMLElement;
  private wishProductId: HTMLInputElement;
  private AllProductList: HTMLElement;
  private buyButton: HTMLElement;
  private wishProductIdString: string;
  private showBuyerProductList: HTMLElement;
  private myShoppingListButton: HTMLElement;
  private showBuyerProductListContainer: HTMLElement;
  // private productList: Element[];

  // private selectedProductIndexList: number[];

  constructor() {
    this.loginSignupSelectScreen = document.getElementById(
      'login-signup-select-screen',
    ) as HTMLElement;
    this.logOutScreen = document.getElementById('logout-screen') as HTMLElement;

    //
    this.welcome = document.getElementById('welcome') as HTMLElement;
    this.productListAndAdd = document.getElementById('product-list-add') as HTMLElement;
    this.ProductListButton = document.getElementById('show-productList') as HTMLElement;
    this.ul = document.getElementById('ul') as HTMLElement;
    this.productTitleInput = document.getElementById('product-title-input') as HTMLInputElement;
    this.productPriceInput = document.getElementById('product-price-input') as HTMLInputElement;
    this.productContentInput = document.getElementById('product-content-input') as HTMLInputElement;
    this.addButton = document.getElementById('add-button') as HTMLElement;
    this.productTitle = '';
    this.productPrice = '';
    this.productContent = '';

    // this.productRegister = document.getElementById('product-register') as HTMLElement;
    // this.productContainer = document.getElementById('product-container') as HTMLElement;
    this.buyContainer = document.getElementById('buy-container') as HTMLElement;
    this.AllProductList = document.getElementById('All_Product-list') as HTMLElement;
    this.buyButton = document.getElementById('buy-button') as HTMLElement;
    this.wishProductId = document.getElementById('wish-product-id') as HTMLInputElement;
    this.wishProductIdString = '';
    this.myShoppingListButton = document.getElementById('my-shopping-list-button') as HTMLElement;
    this.showBuyerProductListContainer = document.getElementById(
      'show-buyer-productlist-container',
    ) as HTMLElement;
    this.showBuyerProductList = document.getElementById('show-buyer-productlist') as HTMLElement;
    // this.productList = Array.from(document.getElementsByClassName('product'));
    // this.selectedProductIndexList = [];
  }

  mainUI = async (user: ILoginData) => {
    this.loginSignupSelectScreen.style.display = 'none';
    this.logOutScreen.style.display = 'block';
    this.welcome.innerHTML = `<span id="part1">${user.nickname}님 환영합니다^^</span>
    <span id="part2"> UserType: ${user.userType},잔액: ${user.money}원</span>`;

    if (user.userType === 'seller') {
      return await this.sellerUI(user);
    } else if (user.userType === 'buyer') {
      return await this.buyerUI(user);
    } else {
      return;
    }
  };

  sellerUI = async (user: ILoginData) => {
    this.logOutScreen.addEventListener('click', () => {
      // return false
      this.loginSignupSelectScreen.style.display = 'block';
      this.logOutScreen.style.display = 'none';
      this.welcome.style.display = 'none';
      this.productContentInput.style.display = 'none';
      this.productListAndAdd.style.display = 'none';
    });
    this.productListAndAdd.style.display = 'block';
    //Seller의 MY 판매목록
    const sellerProduct = await fetch(
      `http://localhost:3000/products?type=${user.userType}&email=${user.email}`,
    );
    const sellerProductList = await sellerProduct.json();
    this.ProductListButton.addEventListener('click', async () => {
      let tag = ``;
      sellerProductList.forEach(
        (e: {id: number; title: string; price: number; content: string}) => {
          tag += '<li>' + `${e.id}, ${e.title}, ${e.price}, ${e.content}` + '</li>';
        },
      );
      this.ul.innerHTML = tag;
    });

    ///////////////////////////////////////////////////////
    //판매자가 더 등록할 상품 입력&등록
    this.productTitleInput.addEventListener('input', () => {
      this.productTitle = this.productTitleInput.value;
    });
    this.productPriceInput.addEventListener('input', () => {
      this.productPrice = this.productPriceInput.value;
    });
    this.productContentInput.addEventListener('input', () => {
      this.productContent = this.productContentInput.value;
    });

    this.addButton.addEventListener('click', async () => {
      if (!this.productTitle || !this.productPrice || !this.productContent) {
        alert('상품의 정보를 모두 입력하세요');
      } else {
        const addProductResult = await fetch('http://localhost:3000/product', {
          method: 'POST',
          body: JSON.stringify({
            userEmail: user.email,
            productTitle: this.productTitle,
            productPrice: this.productPrice,
            productContent: this.productContent,
          }),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        });
        const registerResult: true | false = await addProductResult.json();
        if (!registerResult) {
          console.log('상품등록 실패');
        } else {
          console.log('상품등록 성공');
        }
      }
    });

    return true;
  };

  buyerUI = async (user: ILoginData) => {
    this.logOutScreen.addEventListener('click', () => {
      // return false
      this.loginSignupSelectScreen.style.display = 'block';
      this.logOutScreen.style.display = 'none';
      this.welcome.style.display = 'none';
      this.buyContainer.style.display = 'none';
      this.myShoppingListButton.style.display = 'none';
      this.showBuyerProductListContainer.style.display = 'none';
    });
    this.buyContainer.style.display = 'block';
    this.myShoppingListButton.style.display = 'block';

    //상품을 가져와서 판매목록 보여주기
    // const showAllProductResult = await fetch('http://localhost:3000/allProduct');
    // const showAllProductResultObject: IProductClient[] = await showAllProductResult.json();

    // showAllProductResultObject.forEach((e: IProductClient) => {
    //   const showlist = `<td>${e.id}</td><td>${e.title}</td><td>${e.price}</td><td>${e.content}</td>`;
    //   this.AllProductList.insertAdjacentHTML('beforeend', showlist);
    // });
    const showAllProductResult = await fetch('http://localhost:3000/products/selling');
    const showAllProductResultObject: IProductClient[] = await showAllProductResult.json();

    let node = '';
    showAllProductResultObject.forEach((e: IProductClient) => {
      node += `<tr><td>${e.id}</td><td>${e.title}</td><td>${e.price}</td><td>${e.content}</td></tr>`;
    });
    this.AllProductList.innerHTML = node;

    //상품아이디 입력했을때 구매하기
    this.wishProductId.addEventListener('input', () => {
      this.wishProductIdString = this.wishProductId.value;
    });
    this.buyButton.addEventListener('click', async () => {
      if (!this.wishProductIdString) {
        alert('아이디를 입력해주세요');
      }
      const clickResult = await fetch('http://localhost:3000/product/buy', {
        method: 'POST',
        body: JSON.stringify({id: this.wishProductIdString, buyerEmail: user.email}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      });
      const clickResultObject: checkSoldOutResponse = await clickResult.json();
      if (clickResultObject.isSuccess === false) {
        alert(`${clickResultObject.msg}`);
      } else {
        alert(`${clickResultObject.msg}`);
      }
      this.wishProductId.value = '';
    });
    //구매한 상품 목록보기 버튼 클릭했을때
    this.myShoppingListButton.addEventListener('click', async () => {
      let node = '';
      const getBuyerShoppingListResult = await fetch(
        `http://localhost:3000/product/shopping-list?email=${user.email}`,
      );
      const getBuyerShoppingListResultObject: IProductClient[] =
        await getBuyerShoppingListResult.json();

      this.showBuyerProductListContainer.style.display = 'block';
      getBuyerShoppingListResultObject.forEach((e: IProductClient) => {
        node += `<li>상품아이디: ${e.id}, 상품이름:${e.title}, 상품가격:${e.price},상품내용:${e.content}</li>`;
      });
      this.showBuyerProductList.innerHTML = node;
    });

    return true;
  };
}
export default HomeScreen;
