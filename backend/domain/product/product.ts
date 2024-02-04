import UserRepository from '../../repository/user-repository.js';
import Database from '../../database/database.js';

export default class Product {
  private id: any;
  private title: string;
  private content: string;
  private price: number;
  private sellerEmail: string;
  private isSoldOut: boolean;

  constructor(
    id: number,
    title: string,
    content: string,
    price: number,
    sellerEmail: string,
    isSoldOut: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.content = content;
    this.sellerEmail = sellerEmail;
    this.isSoldOut = isSoldOut;
  }

  public getProductId() {
    return this.id;
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
    this.isSoldOut = numOfSellerProduct > 0;
  }
}
