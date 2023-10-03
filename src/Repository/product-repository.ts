import Database from '../Database/database';
import {ILoginData, IUserData} from '../Specification/interfaces';
import Product from '../Domain/product/product';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';
import User from '../Domain/user/user';
import {inputReceiver} from '../utils';

export interface IProductRepository {
  registerProduct(email: string, title: string, content: string, price: number): Promise<boolean>;
  findSellerProductsInStorage(email: string): Promise<Product[]>;
}

class ProductRepository implements IProductRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  registerProduct = async (email: string, title: string, content: string, price: number) => {
    return true;
  };

  findSellerProductsInStorage = async (email: string) => {
    const products = [];

    return products;
  };
}

export default ProductRepository;
