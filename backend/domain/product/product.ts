import UserRepository from '../../repository/user-repository.js';
import Database from '../../database/database.js';
import ProductRepository from '../../repository/product-repository.js';
import ProductService from '../../service/product-service.js';
// import Product from '../product/product.js'

//repo -> CSV
export interface IDataCSV {
  convertStringForCSV(): string;
}
//CSV를 읽었을때의 interface
//repo <- CSV
export interface IProductCSV {
  id: string;
  title: string;
  content: string;
  price: string;
  sellerEmail: string;
  buyerEmail: string;
  isSoldOut: 'true' | 'false';
}
export class ProductCSV implements IProductCSV, IDataCSV {
  public readonly id: string;
  public readonly title: string;
  public readonly price: string;
  public readonly content: string;
  public readonly sellerEmail: string;
  public readonly buyerEmail: string;
  public readonly isSoldOut: 'true' | 'false';

  constructor(
    id: string,
    title: string,
    price: string,
    content: string,
    sellerEmail: string,
    buyerEmail: string,
    isSoldOut: 'true' | 'false',
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.content = content;
    this.sellerEmail = sellerEmail;
    this.buyerEmail = buyerEmail;
    this.isSoldOut = isSoldOut;
  }

  //CSV에 저장해야되는 문자형태를 스스로 return
  convertStringForCSV(): string {
    return `${this.id},${this.title},${this.price},${this.content},${this.sellerEmail},${this.buyerEmail},${this.isSoldOut}`;
  }
}
//Domain객체의 interface
//데이터 타입 for 서비스
export interface IProduct {
  id: number;
  title: string;
  price: number;
  content: string;
  getProductId(): number;
  getPrice(): number;
  getTitle(): string;
  getContent(): string;
  getIsSoldOut(): boolean;
}
// export interface IProductMethd{
//   getProductId(): number;
//   getPrice(): number;
//   getTitle(): string;
//   getContent(): string;
//   getIsSoldOut(): boolean;
// }
export class Product implements IProduct {
  public readonly id: number;
  public readonly title: string;
  public readonly content: string;
  public readonly price: number;
  public readonly sellerEmail: string;
  public readonly buyerEmail: string;
  public readonly isSoldOut: boolean;
  // private id: number;
  // private title: string;
  // private content: string;
  // private price: number;
  // private sellerEmail: string;
  // private isSoldOut: boolean;

  constructor(
    id: number,
    title: string,
    content: string,
    price: number,
    sellerEmail: string,
    buyerEmail: string,
    isSoldOut: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.content = content;
    this.sellerEmail = sellerEmail;
    this.buyerEmail = buyerEmail;
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
  // public setIsSoldOut(numOfSellerProduct: number) {
  //   this.isSoldOut = numOfSellerProduct > 0;
  // }
}
//client에게 던져줄때의 interface
//ui<-service
export interface IProductClient {
  id: any;
  title: string;
  price: number;
  content: string;
}
