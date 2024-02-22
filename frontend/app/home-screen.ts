import {ILoginData} from '../specification/interfaces';

export interface IHomeScreen {
  mainUI(user: ILoginData): Promise<undefined | boolean>;
  sellerUI(user: ILoginData): Promise<undefined | boolean>;
  buyerUI(user: ILoginData): Promise<undefined | boolean>;
}
class HomeScreen implements IHomeScreen {
  private productRegister: HTMLElement;
  private productTitleInput: HTMLInputElement;
  private addButton: HTMLElement;

  private productBuy: HTMLElement;
  private productContainer: HTMLElement;
  private buyButton: HTMLElement;
  private productList: Element[];

  private productTitle: string;
  private selectedProductIndexList: number[];

  constructor() {
    this.productRegister = document.getElementById('product-register') as HTMLElement;
    this.productTitleInput = document.getElementById('product-title-input') as HTMLInputElement;
    this.addButton = document.getElementById('add-button') as HTMLElement;

    this.productBuy = document.getElementById('product-buy') as HTMLElement;
    this.productContainer = document.getElementById('product-container') as HTMLElement;
    this.buyButton = document.getElementById('buy-button') as HTMLElement;
    this.productList = Array.from(document.getElementsByClassName('product'));

    this.productTitle = '';
    this.selectedProductIndexList = [];
  }

  mainUI = async (user: ILoginData) => {
    console.log(
      user.nickname +
        '님 환영합니다~^^  ====>  ' +
        'UserType:' +
        user.userType +
        '   ' +
        '잔액:' +
        user.money +
        '원',
    );
    if (user.userType === 'seller') {
      return await this.sellerUI(user);
    } else if (user.userType === 'buyer') {
      return await this.buyerUI(user);
    } else {
      return;
    }
  };

  sellerUI = async (user: ILoginData) => {
    if (!this.productContainer || !this.buyButton || !this.productTitleInput || !this.addButton) {
      return;
    }
    this.productRegister.style.display = 'block';
    const addProductIndex = (productIndex: number) => {
      const findIndex = this.selectedProductIndexList.findIndex((selectedProductIndex) => {
        return selectedProductIndex === productIndex;
      });
      if (findIndex !== -1) {
        this.selectedProductIndexList.splice(findIndex, 1);
      } else {
        this.selectedProductIndexList.push(productIndex);
      }
    };
    for (let i = 0; i < this.productList.length; i++) {
      this.productList[i].addEventListener('click', () => {
        addProductIndex(i);
      });
    }
    this.productTitleInput.addEventListener('input', (e) => {
      this.productTitle = this.productTitleInput.value;
    });
    this.addButton.addEventListener('click', () => {
      this.productContainer.innerHTML +=
        '<div class="product">\n' +
        '        <label>\n' +
        '          <input type="checkbox" />\n' +
        `          ${this.productTitleInput.value}\n` +
        '        </label>\n' +
        '      </div>';
      const addedProduct =
        this.productContainer.children[this.productContainer.children.length - 1];
      addedProduct.addEventListener('click', () => {
        addProductIndex(this.productContainer.children.length - 1);
      });
    });
    return true;
  };

  buyerUI = async (user: ILoginData) => {
    if (!this.productContainer || !this.buyButton || !this.productTitleInput || !this.addButton) {
      return;
    }
    this.productBuy.style.display = 'block';
    this.buyButton.addEventListener('click', () => {
      const productList = Array.from(document.getElementsByClassName('product'));
      for (let i = 0; i < this.selectedProductIndexList.length; i++) {
        const index = this.selectedProductIndexList[i];
        productList[index].remove();
      }
      this.selectedProductIndexList = [];
    });
    return true;
  };
}
export default HomeScreen;
