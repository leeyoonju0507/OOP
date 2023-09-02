import User from './user';
import Product from '../product/product';

export default class Buyer extends User {
  private accountId: string;
  private history: any[] = [];
  private static n: number = 0;

  constructor(email: string, password: string, nickname: string, money: number, accountId: string) {
    super(email, password, nickname, money);
    this.accountId = accountId;
  }

  public BUY(price: number, productId: any) {
    this.withdraw(price);
    this.setHistory(productId);
  }
  //productId를 history에 저장
  public setHistory(product: any) {
    this.history[Buyer.n++] = product;
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
}
