// 데이터 타입 1: 리포지토리에서 사용합니다
import {IDomain} from '../../specification/interfaces';

export interface IProductEntity {
  id: string;
  title: string;
  content: string;
  price: string;
  sellerEmail: string;
  buyerEmail: string;
  isSoldOut: 'true' | 'false';
}

// 데이터 타입 2: 서비스에서 사용합니다
export interface IProductDomain {
  id: number;
  title: string;
  price: number;
  content: string;
  sellerEmail: string;
  buyerEmail: string;
  isSoldOut: boolean;
}
export interface IProductMethod {
  getProductId(): number;
  getPrice(): number;
  getTitle(): string;
  getContent(): string;
  getSellerEmail(): string;
  getBuyerEmail(): string;
  getIsSoldOut(): boolean;
}
export class ProductDomain implements IProductDomain, IProductMethod, IDomain {
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
  public getSellerEmail(): string {
    return this.sellerEmail;
  }
  public getBuyerEmail(): string {
    return this.buyerEmail;
  }
  public getIsSoldOut() {
    return this.isSoldOut;
  }
  //csv파일에서 읽어서 재고있으면 false, 재고없으면true로 setting
  // public setIsSoldOut(numOfSellerProduct: number) {
  //   this.isSoldOut = numOfSellerProduct > 0;
  // }

  convertStringForCSV(): string {
    return `${this.id},${this.title},${this.price},${this.content},${this.sellerEmail},${this.buyerEmail},${this.isSoldOut}`;
  }
}

// 데이터 타입 3: 클라이언트에서 사용합니다
export interface IProductClient {
  id: any;
  title: string;
  price: number;
  content: string;
}
