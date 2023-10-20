import UserRepository, {IUserRepository} from '../Repository/user-repository';
import {ILoginData, IProductData} from '../Specification/interfaces';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';
import ProductRepository, {IProductRepository} from '../Repository/product-repository';

export interface IService {
  checkSignedUpByEmail(email: string): Promise<boolean>;
  signUp(IUserData: {
    email: string;
    password: string;
    nickname: string;
    money: number;
    userType: 'seller' | 'buyer';
  }): Promise<void>;
  login(email: string, password: string): Promise<ILoginData | undefined>;
  registerProduct(email: string, title: string, price: number, content: string): Promise<boolean>;
  getSellerProducts(email: string): Promise<IProductData[]>;
}

class Service implements IService {
  private userRepository: IUserRepository;
  private ProductRepository: IProductRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.ProductRepository = new ProductRepository();
  }

  checkSignedUpByEmail = async (email: string) => {
    return !!(await this.userRepository.findUserByEmail(email));
  };

  signUp = async (IUserData: {
    email: string;
    password: string;
    nickname: string;
    money: number;
    userType: 'buyer' | 'seller';
  }) => {
    await this.userRepository.storeUser(IUserData);
  };

  login = async (email: string, password: string) => {
    const user: Seller | Buyer | undefined = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return;
    }
    if (user.getPassword() !== password) {
      return;
    }
    return {
      email: user.getEmail(),
      nickname: user.getNickname(),
      money: user.getMoney(),
      userType: user.getUserType(),
    };
  };

  registerProduct = async (email: string, title: string, price: number, content: string) => {
    //이 고객이 회원인지 아닌지 검사
    const checkIsMember: Seller | Buyer | undefined =
      await this.userRepository.findUserByEmail(email);
    if (!checkIsMember) {
      return false;
    }

    //상품을 등록하고 등록성공 여부 return
    const isRegister = await this.ProductRepository.registerProduct(
      checkIsMember,
      title,
      content,
      price,
    );
    if (!isRegister) {
      return false;
    }
    //등록가능한지
    return true;
  };

  //유저가 판매하는 모든 상품목록배열을 return
  getSellerProducts = async (email: string) => {
    // 방법1
    // const seller = await this.userRepository.findSellerByEmailWithStorage(email);
    // if (!seller) {
    //   return [];
    // }
    // const products = seller.getStorage();

    // 방법2
    const seller = await this.userRepository.findUserByEmail(email);
    if (!seller) {
      return [];
    }

    const productsList = await this.ProductRepository.findSellerProductsInStorage(email);

    // Product[] => IProductData[]
    // 데이터 가공 방법1
    const result: IProductData[] = [];
    for (let i = 0; i < productsList.length; i++) {
      const product = productsList[i];
      result.push({
        productId: product.getproductId(),
        title: product.getTitle(),
        price: product.getPrice(),
        content: product.getContent(),
      });
    }
    return result;

    // 데이터 가공 방법2
    // const result: IProductData[] = [];
    // products.forEach((product) => {
    //   result.push({
    //     title: product.getTitle(),
    //     price: product.getPrice(),
    //     content: product.getContent(),
    //   });
    // });
    // return result;

    // 데이터 가공 방법3
    // return products.map((product) => {
    //   return {
    //     title: product.getTitle(),
    //     price: product.getPrice(),
    //     content: product.getContent(),
    //   };
    // });
  };
}

export default Service;
