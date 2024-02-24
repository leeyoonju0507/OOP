import User from './user.js';
import {Product} from '../product/product.js';
import Buyer from './buyer.js';

export default class Seller extends User {
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

  public SELL(buyer: Buyer, product: Product) {
    buyer.withdraw(product.getPrice());
    this.deposit(product.getPrice()); //buyer의 돈을 seller통장에 입금
  }

  //판매자의 통장에 입금
  public deposit(money: number) {
    this.money += money;
  }
}
