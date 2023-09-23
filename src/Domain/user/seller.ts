import User from './user';
import Product from '../product/product';

export default class Seller extends User {
  private accountId: string;
  private storage: any[] = [];
  private numSelledProduct: number = 0; //구매자에게 판매한 물건개수
  private numStoredProduct: number = 0; //창고에 구비된 물건개수

  constructor(email: string, password: string, nickname: string, money: number, accountId: string) {
    super(email, password, nickname, money);
    this.accountId = accountId;
  }

  //seller는 buyer에게 판매하기 전에 창고(storage)에 product을 미리 사놔야함
  public addStorage() {
    const p: Product = new Product(this.accountId);
    this.setStorage(p.getproductId());
  }
  //seller가 buyer에게 판매할때
  public SELL(price: number, productId: string) {
    this.deposit(price);
    this.setStorage(productId);
    this.numSelledProduct++;
  }

  public setStorage(productId: any) {
    this.storage.push(productId);
    this.numStoredProduct++;
  }

  public getNumStoredProduct() {
    return this.numStoredProduct;
  }

  public getStorage(index: number) {
    return this.storage[index];
  }
}
