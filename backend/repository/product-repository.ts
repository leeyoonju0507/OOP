import Database from '../database/database.js';
import {IProductDomain, IProductEntity, ProductDomain} from '../domain/product/product.js';
import {IDomain} from '../specification/interfaces.js';
import BaseRepository, {IBaseRepository} from './base-repository.js';

export interface IProductRepository extends IBaseRepository {
  createProduct(productInfo: {
    title: string;
    content: string;
    price: number;
    sellerEmail: string;
    buyerEmail: string;
    IsSoldOut: boolean;
  }): Promise<void>;
  findSellerProductsByEmail(email: string): Promise<ProductDomain[]>;
  checkProductSoldOut(id: number): Promise<ProductDomain | undefined>;
  findAllProducts(): Promise<ProductDomain[]>;
  findBuyerProductsByEmail(email: string): Promise<ProductDomain[]>;
}

export default class ProductRepository extends BaseRepository implements IProductRepository {
  constructor() {
    super('products.csv');
  }

  // 생성, 검색, 업데이트, 삭제
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
            productRows[i].id,
            productRows[i].title,
            productRows[i].content,
            productRows[i].price,
            productRows[i].sellerEmail,
            productRows[i].buyerEmail,
            productRows[i].isSoldOut,
          ),
        );
      }
    }
    return products;
  };
  checkProductSoldOut = async (id: number) => {
    const rows = await this.db.readCSV<IProductEntity>(this.fileName);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id === id && !rows[i].isSoldOut) {
        return new ProductDomain(
          rows[i].id,
          rows[i].title,
          rows[i].content,
          rows[i].price,
          rows[i].sellerEmail,
          rows[i].buyerEmail,
          rows[i].isSoldOut,
        );
      }
    }
    return undefined;
  };
  findAllProducts = async () => {
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');
    const ProductDomainRows: ProductDomain[] = [];
    for (let i = 0; i < productRows.length; i++) {
      ProductDomainRows.push(
        new ProductDomain(
          productRows[i].id,
          productRows[i].title,
          productRows[i].content,
          productRows[i].price,
          productRows[i].sellerEmail,
          productRows[i].buyerEmail,
          productRows[i].isSoldOut,
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
            productRows[i].id,
            productRows[i].title,
            productRows[i].content,
            productRows[i].price,
            productRows[i].sellerEmail,
            productRows[i].buyerEmail,
            productRows[i].isSoldOut,
          ),
        );
      }
    }
    return products;
  };
}
