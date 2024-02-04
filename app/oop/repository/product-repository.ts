import Database from '../database/database';
import Product from '../domain/product/product';

export interface IProductRepository {
  storeProduct(
    title: string,
    content: string,
    price: number,
    sellerEmail: string,
    IsSoldOut: boolean,
  ): Promise<boolean>;
  findSellerProductsInStorage(email: string): Promise<Product[]>;
  getSoldOutOfProduct(id: string): Promise<boolean>;
  storeBuyerProduct(id: string, buyerEmail: string): Promise<void>;
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

  getSoldOutOfProduct = async (id: string) => {
    const ProductRows = await this.db.readCSV('products.csv');

    for (let i = 0; i < ProductRows.length; i++) {
      if (ProductRows[i].id === id && ProductRows[i].isSoldOut === 'false') {
        return true;
      }
    }
    return false;
  };

  storeBuyerProduct = async (id: string, buyerEmail: string) => {
    const ProductRows = await this.db.readCSV('products.csv');

    for (let i = 0; i < ProductRows.length; i++) {
      if (ProductRows[i].id === id) {
        ProductRows[i].isSoldOut = 'true';
        const updateRow = [];
        updateRow.push(ProductRows[i].id);
        updateRow.push(ProductRows[i].title);
        updateRow.push(ProductRows[i].content);
        updateRow.push(ProductRows[i].price);
        updateRow.push(ProductRows[i].sellerEmail);
        updateRow.push(ProductRows[i].isSoldOut);
        await this.db.updateCSV('products.csv', updateRow);
        await this.db.writeCSV(
          'buyer_products.csv',
          `${ProductRows[i].title},${ProductRows[i].content},${ProductRows[i].price},${buyerEmail}`,
        );
      }
    }
  };
}

export default ProductRepository;
