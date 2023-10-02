import User from './user';
import Product from '../product/product';

export default class Seller extends User {
  private static instance = Seller;
  private storageBefore: any[] = []; //판매자 창고 물건의 productId
  private storageAfter: any[] = []; //구매자에게 판 물건의 productId
  private numSelledProduct: number = 0; //구매자에게 판매한 물건개수
  private numStoredProduct: number = 0; //창고에 구비된 물건개수

  constructor(email: string, password: string, nickname: string, money: number, userType: string) {
    super(email, password, nickname, money, userType);
  }
  public static getInstance() {
    return this.instance;
  }
  //seller는 buyer에게 판매하기 전에 창고(storage)에 product을 미리 사놔야함
  public addStorage() {
    if (this.getMoney() < 10000) {
      console.log('seller의 돈이 부족합니다.');
      return false;
    }
    const product = new Product();
    this.setStorageBefore(product.getproductId());
    this.setMoneyByStorage(10000);
    return true;
  }
  //seller가 buyer에게 판매할때
  public SELL(price: number, productId: string) {
    this.deposit(price);
    const num = this.storageBefore.splice(-1, 1); //판매자창고에서 맨 끝에서부터 물건을 팔아서
    this.storageAfter.push(num); //판매자가 구매자에게 물건을 팔면 판매자창고에서의 productId가 push된다.
    this.numSelledProduct++;
    this.numStoredProduct--;
  }
  //seller의 창고에 있는 물건개수 return
  public getNumStoredProduct() {
    console.log(this.numStoredProduct);
    return this.numStoredProduct; //계속 0만 찍힘
  }
  //seller의 창고에 productId넣기
  public setStorageBefore(productId: any) {
    this.storageBefore.push(productId);
    this.numStoredProduct++;
    console.log('###' + this.numStoredProduct); //계속 1만 찍힘
  }
  //seller의 창고에 productId보여주기
  public getStorageBefore(index: number) {
    return this.storageBefore[index];
  }
}
