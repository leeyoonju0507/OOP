import Database from '../Database/database';
import Product from '../Domain/product/product';

export interface IProductRepository {
  storeProduct(
    title: string,
    content: string,
    price: number,
    sellerEmail: string,
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
    title: string,
    content: string,
    price: number,
    sellerEmail: string,
    IsSoldOut: boolean,
  ) => {
    await this.db.writeCSV(
      'products.csv',
      `${title},${content},${price},${sellerEmail},${IsSoldOut}`,
    );
    return true;
  };

  findSellerProductsInStorage = async (email: string) => {
    const sellerProductList: Product[] = [];
    const productRows = await this.db.readCSV('products.csv');

    for (let i = 0; i < productRows.length; i++) {
      if (email === productRows[i].sellerEmail) {
        sellerProductList.push(
          new Product(
            parseInt(productRows[i].id),
            productRows[i].title,
            productRows[i].content,
            parseInt(productRows[i].price),
            productRows[i].sellerEmail,
            Boolean(productRows[i].isSoldOut),
          ),
        );
      }
    }
    return sellerProductList;
  };
}

export default ProductRepository;
