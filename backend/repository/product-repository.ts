// import Product from '../../fp/domain/product/product';
// import Database from '../database/database';
// import {IProductDomain, IProductEntity, ProductDomain} from '../domain/product/product';
// import {IDomain} from '../specification/interfaces';

import Database from '../database/database.js';
import {IProductDomain, IProductEntity, ProductDomain} from '../domain/product/product.js';
import {IDomain} from '../specification/interfaces.js';

export interface IProductRepository {
  createProduct(productInfo: {
    title: string;
    content: string;
    price: number;
    sellerEmail: string;
    buyerEmail: string;
    IsSoldOut: boolean;
  }): Promise<void>;
  findSellerProductsByEmail(email: string): Promise<ProductDomain[]>;
  checkProductSoldOut(id: string): Promise<ProductDomain | undefined>;
  // updateProduct(properties: {id: string; buyerEmail: string; isSoldOut: boolean}): Promise<void>;
  updateProduct(willBuyProduct: IProductDomain): Promise<void>;
  findAllProducts(): Promise<ProductDomain[]>;
  findBuyerProductsByEmail(email: string): Promise<ProductDomain[]>;
}

export default class ProductRepository implements IProductRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  createProduct = async (productInfo: {
    title: string;
    content: string;
    price: number;
    sellerEmail: string;
    buyerEmail: string;
    IsSoldOut: boolean;
  }) => {
    await this.db.appendCSV(
      'products.csv',
      `${productInfo.title},${productInfo.price},${productInfo.content},${productInfo.sellerEmail},${productInfo.buyerEmail},${productInfo.IsSoldOut}`,
    );
  };
  findSellerProductsByEmail = async (email: string) => {
    const products: ProductDomain[] = [];
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');
    for (let i = 0; i < productRows.length; i++) {
      if (email === productRows[i].sellerEmail) {
        products.push(
          new ProductDomain(
            parseFloat(productRows[i].id),
            productRows[i].title,
            productRows[i].content,
            parseFloat(productRows[i].price),
            productRows[i].sellerEmail,
            productRows[i].buyerEmail,
            Boolean(productRows[i].isSoldOut),
          ),
        );
      }
    }
    return products;
  };
  checkProductSoldOut = async (id: string) => {
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');
    for (let i = 0; i < productRows.length; i++) {
      if (productRows[i].id === id && productRows[i].isSoldOut === 'false') {
        return new ProductDomain(
          parseFloat(productRows[i].id),
          productRows[i].title,
          productRows[i].content,
          parseFloat(productRows[i].price),
          productRows[i].sellerEmail,
          productRows[i].buyerEmail,
          Boolean(productRows[i].isSoldOut),
        );
      }
    }
    return undefined;
  };
  updateProduct = async (willBuyProduct: IProductDomain) => {
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');

    for (let i = 0; i < productRows.length; i++) {
      if (productRows[i].id === willBuyProduct.id.toString()) {
        productRows[i].id = `${willBuyProduct.id}`;
        productRows[i].title = willBuyProduct.title;
        productRows[i].price = `${willBuyProduct.price}`;
        productRows[i].content = willBuyProduct.content;
        productRows[i].sellerEmail = willBuyProduct.sellerEmail;
        productRows[i].buyerEmail = willBuyProduct.buyerEmail;
        productRows[i].isSoldOut = `${willBuyProduct.isSoldOut}`;
        break;
      }
    }

    //ProductDomain를 IDomain의 관점으로 볼 수 있어서 IDomain[]안에 ProductDomain을 담을 수 있다.
    const domains: IDomain[] = [];
    for (let i: number = 0; i < productRows.length; i++) {
      domains.push(
        new ProductDomain(
          parseFloat(productRows[i].id),
          productRows[i].title,
          productRows[i].content,
          parseFloat(productRows[i].price),
          productRows[i].sellerEmail,
          productRows[i].buyerEmail,
          productRows[i].isSoldOut === 'true',
        ),
      );
    }

    await this.db.writeAllCSV(
      'products.csv',
      domains.map((v) => v.convertStringForCSV()),
    );
  };

  findAllProducts = async () => {
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');
    const ProductDomainRows: ProductDomain[] = [];
    for (let i = 0; i < productRows.length; i++) {
      ProductDomainRows.push(
        new ProductDomain(
          parseFloat(productRows[i].id),
          productRows[i].title,
          productRows[i].content,
          parseFloat(productRows[i].price),
          productRows[i].sellerEmail,
          productRows[i].buyerEmail,
          Boolean(productRows[i].isSoldOut),
        ),
      );
    }
    return ProductDomainRows;
  };

  findBuyerProductsByEmail = async (email: string) => {
    const products: ProductDomain[] = [];
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');
    for (let i = 0; i < productRows.length; i++) {
      if (email === productRows[i].buyerEmail) {
        products.push(
          new ProductDomain(
            parseFloat(productRows[i].id),
            productRows[i].title,
            productRows[i].content,
            parseFloat(productRows[i].price),
            productRows[i].sellerEmail,
            productRows[i].buyerEmail,
            Boolean(productRows[i].isSoldOut),
          ),
        );
      }
    }
    return products;
  };
}
