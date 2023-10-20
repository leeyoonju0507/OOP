import UserRepository from '../../Repository/user-repository';
import Database from '../../Database/database';

export default class Product {
  static autoIncrementNumber: number = 0;
  private productId: any;
  private title: string;
  private price: number;
  private content: string;
  private isSoldOut: boolean;

  constructor(title: string, price: number, content: string) {
    this.productId = 'sss_product_' + Product.autoIncrementNumber++;
    this.title = title;
    this.price = price;
    this.content = content;
    this.isSoldOut = false;
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

  public getIsSoldOut() {
    return this.isSoldOut;
  }
  //csv파일에서 읽어서 재고있으면 false, 재고없으면true로 setting
  public setIsSoldOut(numOfSellerProduct: number) {
    this.isSoldOut = numOfSellerProduct > 0 ? true : false;
  }
}
