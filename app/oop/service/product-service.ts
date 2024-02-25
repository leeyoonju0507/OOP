import {IProduct, IProductClient} from '../domain/product/product';
import Buyer from '../domain/user/buyer';
import Repository, {IRepository} from '../repository/repository';

export interface IProductService {
  registerProduct(email: string, title: string, price: number, content: string): Promise<boolean>;
  getSellerProducts(email: string): Promise<IProductClient[]>;
  checkSoldOutfProduct(id: string): Promise<boolean>;
  buyProduct(id: string, buyerEmail: string): Promise<void>;
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
    if (checkIsMember instanceof Buyer) {
      return false;
    }

    //상품을 등록하고 등록성공 여부 return
    const isRegister = await this.repository.productRepository.createProduct({
      title,
      content,
      price,
      sellerEmail: email,
      buyerEmail: 'null',
      IsSoldOut: false,
    });

    if (!isRegister) {
      return false;
    }
    //등록가능한지
    return true;
  };
  getSellerProducts = async (email: string) => {
    const seller = await this.repository.userRepository.findUserByEmail(email);
    if (!seller) {
      return [];
    }

    const sellerProducts: IProduct[] = await this.repository.productRepository.findProductsByEmail(
      'seller',
      email,
    );

    const productClients: IProductClient[] = [];
    for (let i = 0; i < sellerProducts.length; i++) {
      const product = sellerProducts[i];
      productClients.push({
        id: product.getProductId(),
        title: product.getTitle(),
        price: product.getPrice(),
        content: product.getContent(),
      });
    }

    return productClients;
  };
  checkSoldOutfProduct = async (id: string) => {
    const ExistOfProduct = await this.repository.productRepository.getIsProductExist(id);
    if (!ExistOfProduct) {
      return false;
    }
    return true;
  };
  buyProduct = async (id: string, buyerEmail: string) => {
    await this.repository.productRepository.updateProduct({
      id: id,
      buyerEmail,
      isSoldOut: true,
    });
  };
}
