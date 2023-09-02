import User from './user';
import Product from '../product/product';

export default class Seller extends User {
  private accountId: string;
  private storage: any[] = [];
  private static n: number = 0;

  constructor(email: string, password: string, nickname: string, money: number, accountId: string) {
    super(email, password, nickname, money);
    this.accountId = accountId;
  }

  public SELL(price: number, productId: any) {
    this.deposit(price);
    this.setStorage(productId);
  }

  public setStorage(productId: any) {
    this.storage[Seller.n++] = productId;
  }
}
