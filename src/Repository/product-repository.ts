import Database from '../Database/database';
import {ILoginData, IProductData, IUserData} from '../Specification/interfaces';
import Product from '../Domain/product/product';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';
import User from '../Domain/user/user';
import {inputReceiver} from '../utils';

export interface IProductRepository {
  storeProduct(
    email: string,
    title: string,
    content: string,
    price: number,
    productId: string,
    IsSoldOut: boolean,
  ): Promise<boolean>;
  findSellerProductsInStorage(email: string): Promise<Product[]>;
}

class ProductRepository implements IProductRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  storeProduct = async (
    email: string,
    title: string,
    content: string,
    price: number,
    productId: string,
    IsSoldOut: boolean,
  ) => {
    await this.db.writeCSV(
      'products.csv',
      `${productId},${title},${content},${price},${email},${IsSoldOut}`,
    );
    return true;
  };

  //CSV => Product[]
  findSellerProductsInStorage = async (email: string) => {
    const sellerProductList: Product[] = [];
    const productRows: any = await this.db.readCSV('products.csv');

    for (let i = 0; i < productRows.length; i++) {
      if (email === productRows[i].sellerEmail) {
        sellerProductList.push(
          new Product(productRows[i].title, productRows[i].price, productRows[i].content),
        );
      }
    }
    return sellerProductList;
  };
}

export default ProductRepository;
