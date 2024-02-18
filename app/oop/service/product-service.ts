// import {IProductData} from '../specification/interfaces';/
import {IProduct, IProductClient} from '../domain/product/product';
import Buyer from '../domain/user/buyer';
import Repository, {IRepository} from '../repository/repository';

export interface IProductService {
  registerProduct(email: string, title: string, price: number, content: string): Promise<boolean>;
  getSellerProducts(email: string): Promise<IProduct[]>;
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
    const isRegister = await this.repository.productRepository.storeProduct(
      title,
      content,
      price,
      email,
      'null',
      false,
    );

    if (!isRegister) {
      return false;
    }
    //등록가능한지
    return true;
  };

  //유저가 판매하는 모든 상품목록배열을 return
  getSellerProducts = async (email: string) => {
    //이 고객이 회원인지 아닌지 검사
    const seller = await this.repository.userRepository.findUserByEmail(email);
    if (!seller) {
      return [];
    }
    //Product:Domain[]
    const productsList = await this.repository.productRepository.findSellerProductsInStorage(email);
    //Product:Domain형태 -> Product:DTO형태
    const result: IProductClient[] = [];
    for (let i = 0; i < productsList.length; i++) {
      const product = productsList[i];
      result.push({
        id: product.getProductId(),
        title: product.getTitle(),
        price: product.getPrice(),
        content: product.getContent(),
      });
    }
    //ui한테 Product:DTO[]로 return
    return result;
  };

  checkSoldOutfProduct = async (id: string) => {
    const ExistOfProduct = await this.repository.productRepository.getIsProductExist(id);
    if (!ExistOfProduct) {
      return false;
    }
    return true;
  };

  buyProduct = async (id: string, buyerEmail: string) => {
    await this.repository.productRepository.storeBuyerProduct(id, buyerEmail);
  };
}
