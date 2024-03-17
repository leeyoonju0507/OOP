import {IProductClient, IProductDomain, ProductDomain} from '../domain/product/product.js';
import Repository, {IRepository} from '../repository/repository.js';
import UserDomain from '../domain/user/user.js';

export interface IProductService {
  registerProduct(email: string, title: string, price: number, content: string): Promise<boolean>;
  getSellerProducts(email: string): Promise<IProductClient[]>;
  getAllProduct(): Promise<IProductClient[]>;
  buyProduct(id: number, buyerEmail: string): Promise<boolean>;
  getBuyerProductsByEmail(email: string): Promise<IProductClient[]>;
}
export default class ProductService implements IProductService {
  private repository: IRepository;

  constructor() {
    this.repository = Repository.getInstance();
  }

  registerProduct = async (email: string, title: string, price: number, content: string) => {
    //이 고객이 회원인지 아닌지 검사
    const checkIsMember = await this.repository.userRepository.findUserByEmail(email);
    if (!checkIsMember) {
      return false;
    }

    await this.repository.productRepository.createProduct({
      title,
      content,
      price,
      sellerEmail: email,
      buyerEmail: 'null',
      IsSoldOut: false,
    });

    return true;
  };
  getSellerProducts = async (sellerEmail: string) => {
    const seller = await this.repository.userRepository.findUserByEmail(sellerEmail);
    if (!seller) {
      return [];
    }

    const sellerProducts =
      await this.repository.productRepository.findSellerProductsByEmail(sellerEmail);

    const products: IProductClient[] = [];
    for (let i = 0; i < sellerProducts.length; i++) {
      products.push({
        id: sellerProducts[i].ID,
        title: sellerProducts[i].Title,
        price: sellerProducts[i].Price,
        content: sellerProducts[i].Content,
      });
    }

    return products;
  };
  getAllProduct = async () => {
    const products: IProductClient[] = [];

    const productDomains: ProductDomain[] =
      await this.repository.productRepository.findAllProducts();
    for (let i = 0; i < productDomains.length; i++) {
      products.push({
        id: productDomains[i].ID,
        title: productDomains[i].Title,
        price: productDomains[i].Price,
        content: productDomains[i].Content,
      });
    }
    return products;
  };
  getBuyerProductsByEmail = async (email: string) => {
    const buyer = await this.repository.userRepository.findUserByEmail(email);
    if (!buyer || buyer instanceof UserDomain) {
      return [];
    }

    const buyerProducts = await this.repository.productRepository.findBuyerProductsByEmail(email);
    const productClients: IProductClient[] = [];
    for (let i = 0; i < buyerProducts.length; i++) {
      const product = buyerProducts[i];
      productClients.push({
        id: product.id,
        title: product.Title,
        price: product.Price,
        content: product.Content,
      });
    }
    return productClients;
  };
  buyProduct = async (id: number, buyerEmail: string) => {
    const buyer = await this.repository.userRepository.findUserByEmail(buyerEmail);
    if (!buyer) {
      console.log(1);
      return false;
    }

    const product = await this.repository.productRepository.checkProductSoldOut(id);
    if (!product) {
      console.log(2);
      return false;
    }

    const seller = await this.repository.userRepository.findUserByEmail(product.SellerEmail);
    if (!seller) {
      console.log(3);
      return false;
    }

    if (buyer.Money < product.Price) {
      console.log(4);
      return false;
    }

    // 도메인 객체 변경
    buyer.useMoney(product.Price);
    seller.earnMoney(product.Price);
    product.setSoldOut(buyerEmail);

    // 리포지토리를 이용해서 영구 변경
    await this.repository.userRepository.save(buyer);
    await this.repository.userRepository.save(seller);
    await this.repository.productRepository.save(product);

    return true;
  };
}
