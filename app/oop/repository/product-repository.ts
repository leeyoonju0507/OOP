import Database from '../database/database';
import {IProductCSV, Product, ProductCSV} from '../domain/product/product';

export interface IProductRepository {
  storeProduct(
    title: string,
    content: string,
    price: number,
    sellerEmail: string,
    buyerEmail: string,
    IsSoldOut: boolean,
  ): Promise<boolean>;
  findSellerProductsInStorage(email: string): Promise<Product[]>;
  getIsProductExist(id: string): Promise<boolean>;
  buyProduct(id: string, buyerEmail: string): Promise<void>;
}

class ProductRepository implements IProductRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  storeProduct = async (
    title: string,
    content: string,
    price: number,
    sellerEmail: string,
    buyerEmail: string,
    IsSoldOut: boolean,
  ) => {
    await this.db.appendCSV(
      'products.csv',
      `${title},${content},${price},${sellerEmail},${buyerEmail},${IsSoldOut}`,
    );
    return true;
  };

  findSellerProductsInStorage = async (email: string) => {
    const sellerProductList: Product[] = [];
    //csv파일의 data를 읽어서 Product인스턴스 생성
    const productRows = await this.db.readCSV<IProductCSV>('products.csv');

    for (let i = 0; i < productRows.length; i++) {
      if (email === productRows[i].sellerEmail) {
        sellerProductList.push(
          new Product(
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
    // return Product[]
    return sellerProductList;
  };

  getIsProductExist = async (id: string) => {
    const productRows = await this.db.readCSV<IProductCSV>('products.csv');
    for (let i = 0; i < productRows.length; i++) {
      if (productRows[i].id === id && productRows[i].isSoldOut === 'false') {
        return true;
      }
    }
    return false;
  };

  buyProduct = async (id: string, buyerEmail: string) => {
    const productRows = await this.db.readCSV<IProductCSV>('products.csv');
    for (let i = 0; i < productRows.length; i++) {
      if (productRows[i].id === id) {
        productRows[i].buyerEmail = buyerEmail;
        productRows[i].isSoldOut = 'true';
        break;
      }
    }
    const productCSVList: ProductCSV[] = [];
    for (let i: number = 0; i < productRows.length; i++) {
      productCSVList.push(
        new ProductCSV(
          productRows[i].id,
          productRows[i].title,
          productRows[i].price,
          productRows[i].content,
          productRows[i].sellerEmail,
          productRows[i].buyerEmail,
          productRows[i].isSoldOut,
        ),
      );
    }
    // 원래는 await this.db.writeAllCSV('products.csv', productRows);이었는데 ProductCSV클래스를 또 만듦
    await this.db.writeAllCSV('products.csv', productCSVList);
  };
}

export default ProductRepository;
