import User from './user';
import Product from '../product/product';
import UserRepository from '../../Repository/user-repository';

export default class Buyer extends User {
  private history: any[] = [];
  private n: number = 0;

  constructor(email: string, password: string, nickname: string, money: number, userType: string) {
    super(email, password, nickname, money, userType);
  }

  public BUY(price: number, productId: any) {
    this.withdraw(price);
    this.setHistory(productId);
  }
  //productId를 history에 저장
  public setHistory(product: any) {
    this.history[this.n++] = product;
  }
  //productId를 return
  public getHistory(num: number) {
    return this.history[num];
  }
  public Print_history(num_stuff: number) {
    console.log('========구매한 물건 상세정보========');
    for (let i = 0; i < num_stuff; i++) {
      console.log(`상품${i}번(0번부터 출력)=>`);
      console.log('상품번호:' + this.getHistory(i));
      Product.description();
      console.log('잔고: ' + this.getMoney());
    }
  }
  public getNumStoredProduct() {
    return this.n;
  }
}
