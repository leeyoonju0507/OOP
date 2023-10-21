import User from './user';
import Product from '../product/product';
import Buyer from './buyer';

export default class Seller extends User {
  constructor(email: string, password: string, nickname: string, money: number, userType: string) {
    super(email, password, nickname, money, userType);
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
