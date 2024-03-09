// import UserDomain from './user';
// import ProductDomain from '../product/product';
// import UserRepository from '../../repository/user-repository';
// import Seller from './seller';
// import {ProductDomain} from '../product/product';

import {ProductDomain} from '../product/product.js';
import UserDomain from './user.js';

export default class Buyer extends UserDomain {
  private buyHistory: ProductDomain[] = [];
  private numOfBuying: number = 0;

  constructor(
    id: number,
    email: string,
    password: string,
    nickname: string,
    money: number,
    userType: 'seller' | 'buyer',
  ) {
    super(id, email, password, nickname, money, userType);
  }

  // public BUY(seller: Seller, price: number, product: ProductDomain) {
  //   if (this.getMoney() < price) {
  //     console.log('구매자의 잔액이 부족합니다.');
  //     return;
  //   }
  //   seller.SELL(this, product);
  //   this.setBuyHistory(product);
  // }

  //product를 history에 저장, 구매한 product의 개수를 1개 증가
  public setBuyHistory(product: ProductDomain) {
    this.buyHistory[this.numOfBuying] = product;
    this.numOfBuying++;
  }

  //product를 return
  public getBuyHistory() {
    return this.buyHistory;
  }

  //구매한상품개수 return
  public getNumOfBuying() {
    return this.numOfBuying;
  }

  //출금
  // public withdraw(money: number) {
  //   this.money -= money;
  // }
}
