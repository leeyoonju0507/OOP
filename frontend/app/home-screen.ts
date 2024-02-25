import {ILoginData} from '../specification/interfaces';

export interface IHomeScreen {
  mainUI(user: ILoginData): Promise<undefined | boolean>;
  sellerUI(user: ILoginData): Promise<undefined | boolean>;
  buyerUI(user: ILoginData): Promise<undefined | boolean>;
}
class HomeScreen implements IHomeScreen {
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

  private productRegister: HTMLElement;
  private productContainer: HTMLElement;
  private buyButton: HTMLElement;
  private productList: Element[];

  private selectedProductIndexList: number[];

  constructor() {
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

    this.productRegister = document.getElementById('product-register') as HTMLElement;
    this.productContainer = document.getElementById('product-container') as HTMLElement;
    this.buyButton = document.getElementById('buy-button') as HTMLElement;
    this.productList = Array.from(document.getElementsByClassName('product'));

    this.selectedProductIndexList = [];
  }

  mainUI = async (user: ILoginData) => {
    this.welcome.innerHTML = `${user.nickname}님 환영합니다~^^
      UserType: ${user.userType}
      잔액: ${user.money}원`;

    if (user.userType === 'seller') {
      return await this.sellerUI(user);
    } else if (user.userType === 'buyer') {
      return await this.buyerUI(user);
    } else {
      return;
    }
  };

  sellerUI = async (user: ILoginData) => {
    this.productListAndAdd.style.display = 'block';
    const sellerProduct = await fetch('http://localhost:3000/getSellerProducts', {
      method: 'POST',
      //json문자열로 변환 후 전달
      body: JSON.stringify({userEmail: user.email}),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    const sellerProductList = await sellerProduct.json();
    sellerProductList.forEach((e: {id: number; title: string; price: number; content: string}) => {
      console.log(`id:${e.id}, title:${e.title}, price:${e.price}, content:${e.content}`);
    });

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
        const addProductResult = await fetch('http://localhost:3000/addProduct', {
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
    return true;
  };
}
export default HomeScreen;
