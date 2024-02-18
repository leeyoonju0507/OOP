import UserRepository from '../../repository/user-repository';
import Database from '../../database/database';
//CSV를 읽었을때의 interface
//데이터 타입 for CSV
export interface IProductCSV {
  id: string;
  title: string;
  content: string;
  price: string;
  sellerEmail: string;
  buyerEmail: string;
  isSoldOut: 'true' | 'false';
}

//Domain객체의 interface
//데이터 타입 for 서비스
export interface IProduct {
  id: any;
  title: string;
  price: number;
  content: string;
}
export default class Product implements IProduct {
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

//client에게 던져줄때의 interface
export interface IProductClient {
  id: any;
  title: string;
  price: number;
  content: string;
}
