import {ILoginData} from '../specification/interfaces';

export interface IHomeScreen {
  mainUI(user: ILoginData): Promise<undefined | boolean>;
  sellerUI(user: ILoginData): Promise<undefined | boolean>;
  buyerUI(user: ILoginData): Promise<undefined | boolean>;
}
interface IProductClient {
  id: number;
  title: string;
  price: number;
  content: string;
}
interface ServerResponse {
  isSuccess: boolean;
  msg: string;
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
    //판매자가 판매중인 상품목록 보기
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
    this.buyContainer.style.display = 'block';
    this.myShoppingListButton.style.display = 'block';

    //상품을 가져와서 판매목록 보여주기
    await fetch('http://localhost:3000/showAllProduct')
      .then((res) => res.json())
      .then((allProduct: IProductClient[]) => {
        allProduct.forEach((e: IProductClient) => {
          const showlist = `<td>${e.id}</td><td>${e.title}</td><td>${e.price}</td><td>${e.content}</td>`;
          this.AllProductList.insertAdjacentHTML('beforeend', showlist);
        });
      })
      .catch((error) => {
        console.error('상품 목록을 불러오는 도중 오류가 발생했습니다:', error);
      });

    //상품아이디 입력했을때 구매하기
    this.wishProductId.addEventListener('input', () => {
      this.wishProductIdString = this.wishProductId.value;
    });
    this.buyButton.addEventListener('click', async () => {
      if (!this.wishProductIdString) {
        alert('아이디를 입력해주세요');
      }
      await fetch('http://localhost:3000/buyerClickBuyButton', {
        method: 'POST',
        body: JSON.stringify({id: this.wishProductIdString, buyerEmail: user.email}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
        .then((res) => res.json())
        .then((result: ServerResponse) => {
          if (result.isSuccess === false) {
            alert(`${result.msg}`);
          } else {
            alert(`${result.msg}`);
          }
          this.wishProductId.value = '';
        });
    });
    //구매한 상품 목록보기 버튼 클릭했을때
    this.myShoppingListButton.addEventListener('click', async () => {
      await fetch('http://localhost:3000/getBuyerShoppingList', {
        method: 'POST',
        body: JSON.stringify(user.email),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
        .then((res) => res.json())
        .then((shoppinglist: IProductClient[]) => {
          this.showBuyerProductListContainer.style.display = 'block';
          shoppinglist.forEach((e: IProductClient) => {
            const node = `<li>상품아이디: ${e.id}, 상품이름:${e.title}, 상품가격:${e.price},상품내용:${e.content}</li>`;
            this.showBuyerProductList.insertAdjacentHTML('beforeend', node);
          });
        });
    });

    return true;
  };
}
export default HomeScreen;
