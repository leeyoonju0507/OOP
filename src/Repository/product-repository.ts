import Database from '../Database/database';
import {ILoginData, IProductData, IUserData} from '../Specification/interfaces';
import Product from '../Domain/product/product';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';
import User from '../Domain/user/user';
import {inputReceiver} from '../utils';

export interface IProductRepository {
  registerProduct(
    checkIsMember: Seller | Buyer,
    title: string,
    content: string,
    price: number,
  ): Promise<boolean>;
  findSellerProductsInStorage(email: string): Promise<Product[]>;
}

class ProductRepository implements IProductRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  registerProduct = async (
    checkIsMember: Seller | Buyer,
    title: string,
    content: string,
    price: number,
  ) => {
    if (checkIsMember instanceof Seller) {
      let product = checkIsMember.register(title, price, content);
      await this.db.writeCSV(
        'products.csv',
        `${product.getproductId()},${title},${content},${price},${checkIsMember.getEmail()},${product.getIsSoldOut()}`,
      );
      return true;
    }

    return false;
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
