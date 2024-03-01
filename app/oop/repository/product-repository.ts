import Database from '../database/database';
import {IProductEntity, ProductDomain} from '../domain/product/product';
import {IDomain} from '../specification/interfaces';

export interface IProductRepository {
  createProduct(productInfo: {
    title: string;
    content: string;
    price: number;
    sellerEmail: string;
    buyerEmail: string;
    IsSoldOut: boolean;
  }): Promise<boolean>;
  findProductsByEmail(type: 'seller' | 'buyer', email: string): Promise<ProductDomain[]>;
  getIsProductExist(id: string): Promise<boolean>;
  updateProduct(properties: {id: string; buyerEmail: string; isSoldOut: boolean}): Promise<void>;
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
    return true;
  };
  findProductsByEmail = async (type: 'seller' | 'buyer', email: string) => {
    const products: ProductDomain[] = [];
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');
    for (let i = 0; i < productRows.length; i++) {
      if (type === 'seller') {
        if (email === productRows[i].sellerEmail) {
          products.push(
            new ProductDomain(
              parseInt(productRows[i].id),
              productRows[i].title,
              productRows[i].content,
              parseInt(productRows[i].price),
              productRows[i].sellerEmail,
              productRows[i].buyerEmail,
              Boolean(productRows[i].isSoldOut),
            ),
          );
        }
      } else {
        if (email === productRows[i].buyerEmail) {
          products.push(
            new ProductDomain(
              parseInt(productRows[i].id),
              productRows[i].title,
              productRows[i].content,
              parseInt(productRows[i].price),
              productRows[i].sellerEmail,
              productRows[i].buyerEmail,
              Boolean(productRows[i].isSoldOut),
            ),
          );
        }
      }
    }
    return products;
  };
  getIsProductExist = async (id: string) => {
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');
    for (let i = 0; i < productRows.length; i++) {
      if (productRows[i].id === id && productRows[i].isSoldOut === 'false') {
        return true;
      }
    }
    return false;
  };
  updateProduct = async (properties: {id: string; buyerEmail: string; isSoldOut: boolean}) => {
    const productRows = await this.db.readCSV<IProductEntity>('products.csv');

    for (let i = 0; i < productRows.length; i++) {
      if (productRows[i].id === properties.id) {
        productRows[i].buyerEmail = properties.buyerEmail;
        productRows[i].isSoldOut = `${properties.isSoldOut}`;
        break;
      }
    }

    const domains: IDomain[] = [];
    for (let i: number = 0; i < productRows.length; i++) {
      domains.push(
        new ProductDomain(
          parseInt(productRows[i].id),
          productRows[i].title,
          productRows[i].content,
          parseInt(productRows[i].price),
          productRows[i].sellerEmail,
          productRows[i].buyerEmail,
          productRows[i].isSoldOut === 'true',
        ),
      );
    }
    // 원래는 await this.db.writeAllCSV('products.csv', productRows);이었는데 ProductCSV클래스를 또 만듦
    await this.db.writeAllCSV(
      'products.csv',
      domains.map((v) => v.convertStringForCSV()),
    );
  };
}
