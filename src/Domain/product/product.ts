import UserRepository from '../../Repository/user-repository';
import Database from '../../Database/database';

export default class Product {
  static autoIncrementNumber: number = 0;
  private productId: any;
  private title: string = '타입스크립트';
  private price: number = 10000;
  private content: string = '도서';
  private sellerId: string; //sellerId는 seller의 accountId로 정의

  constructor(sellerId: string) {
    this.productId = 'sss_product_' + Product.autoIncrementNumber++;
    this.sellerId = sellerId;
  }

  public getproductId() {
    return this.productId;
  }

  public getPrice() {
    return this.price;
  }

  public getTitle() {
    return this.title;
  }
  public getContent() {
    return this.content;
  }

  static description() {
    console.log('상품종류: 도서');
    console.log('상품이름: 타입스크립트');
    console.log('가격: 10000원');
  }
}
