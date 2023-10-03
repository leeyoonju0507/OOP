import UserRepository, {IUserRepository} from '../Repository/user-repository';
import {ILoginData, IProductData} from '../Specification/interfaces';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';

export interface IService {
  checkSignedUpByEmail(email: string): Promise<boolean>;
  login(email: string, password: string): Promise<ILoginData | undefined>;
  signUp(userData: {
    email: string;
    password: string;
    nickname: string;
    money: number;
    userType: string;
    accountId: any;
  }): Promise<void>;
  registerProduct(email: string, title: string, price: number, content: string): Promise<boolean>;
  getSellerProducts(email: string): Promise<IProductData[]>;
}

class Service implements IService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  checkSignedUpByEmail = async (email: string) => {
    return !!(await this.userRepository.findUserByEmail(email));
  };

  signUp = async (userData: {
    email: string;
    password: string;
    nickname: string;
    money: number;
    userType: string;
  }) => {
    await this.userRepository.storeUser(userData);
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
    const checkIsMember = await this.userRepository.checkUserByData(email);
    if (!checkIsMember) {
      return false;
    }
    //상품을 등록하고 등록성공 여부 return
    const isRegister = await this.userRepository.registerProduct(email, title, content, price);
    if (!isRegister) {
      return false;
    }
    //구매가능한지
    return true;
  };
  //유저가 판매하는 모든 상품목록배열을 return
  getSellerProducts = async (email: string) => {
    //검증,로직처리,가공해서 리턴
    //user가 회원이 맞는지 또 검증
    //user의 상품목록을 가져온다->리턴
    const seller = await this.userRepository.findUserByEmail(email);
    if (!seller) {
      return [];
    }
    // 방법1
    const products = seller.getStorage();

    // 방법2
    const products = await this.productRepository.findSellerProductsInStorage(email);

    // Product[] => IProductData[]
    // 방법1
    // const result: IProductData[] = [];
    // for (let i = 0; i < products.length; i++) {
    //   const product = products[i];
    //   result.push({
    //     title: product.getTitle(),
    //     price: product.getPrice(),
    //     content: product.getContent(),
    //   });
    // }
    // return result;

    // 방법2
    // const result: IProductData[] = [];
    // products.forEach((product) => {
    //   result.push({
    //     title: product.getTitle(),
    //     price: product.getPrice(),
    //     content: product.getContent(),
    //   });
    // });
    // return result;

    // 방법3
    return products.map((product) => {
      return {
        title: product.getTitle(),
        price: product.getPrice(),
        content: product.getContent(),
      };
    });
  };
}

export default Service;
