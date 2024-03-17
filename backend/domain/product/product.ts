import {IDomain, IEntity} from '../../specification/interfaces.js';

export interface IProductEntity extends IEntity {
  title: string;
  content: string;
  price: number;
  sellerEmail: string;
  buyerEmail: string;
  isSoldOut: boolean;
}

export interface IProductDomain {
  ID: number;
  Title: string;
  Price: number;
  Content: string;
  SellerEmail: string;
  BuyerEmail: string;
  IsSoldOut: boolean;
  setSoldOut: (buyerEmail: string) => void;
}
export class ProductDomain implements IProductDomain, IDomain {
  public id: number;
  private title: string;
  private content: string;
  private price: number;
  private sellerEmail: string;
  private buyerEmail: string;
  private isSoldOut: boolean;

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

  public get ID() {
    return this.id;
  }
  public get Price() {
    return this.price;
  }
  public get Title() {
    return this.title;
  }
  public get Content() {
    return this.content;
  }
  public get SellerEmail(): string {
    return this.sellerEmail;
  }
  public get BuyerEmail(): string {
    return this.buyerEmail;
  }
  public get IsSoldOut() {
    return this.isSoldOut;
  }

  public setSoldOut(buyerEmail: string) {
    this.isSoldOut = true;
    this.buyerEmail = buyerEmail;
  }
  public convertEntity(): IProductEntity {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      price: this.price,
      sellerEmail: this.sellerEmail,
      buyerEmail: this.buyerEmail,
      isSoldOut: this.isSoldOut,
    };
  }
}

export interface IProductClient {
  id: any;
  title: string;
  price: number;
  content: string;
}
