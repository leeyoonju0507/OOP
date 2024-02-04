import UserRepository, {IUserRepository} from '../repository/user-repository';
import {ILoginData, IProductData, IUserData} from '../specification/interfaces';
import Buyer from '../domain/user/buyer';
import Seller from '../domain/user/seller';
import ProductRepository, {IProductRepository} from '../repository/product-repository';
import Product from '../domain/product/product';
import Repository, {IRepository} from '../repository/repository';

export interface IUserService {
  checkSignedUpByEmail(email: string): Promise<boolean>;
  signUp(IUserData: {
    email: string;
    password: string;
    nickname: string;
    money: number;
    userType: 'seller' | 'buyer';
  }): Promise<void>;
  login(email: string, password: string): Promise<ILoginData | undefined>;
}

export default class UserService implements IUserService {
  private userRepository: IUserRepository;
  private ProductRepository: IProductRepository;
  private repository: IRepository;

  constructor() {
    this.repository = Repository.getInstance();
    this.userRepository = new UserRepository();
    this.ProductRepository = new ProductRepository();
  }

  checkSignedUpByEmail = async (email: string) => {
    return !!(await this.repository.userRepository.findUserByEmail(email));
  };
  signUp = async (userData: IUserData) => {
    await this.repository.userRepository.storeUser(userData);
  };
  login = async (email: string, password: string) => {
    //repository에서 이메일로 user를 찾고
    const user: Seller | Buyer | undefined =
      await this.repository.userRepository.findUserByEmail(email);
    if (!user) {
      return;
    }
    //도메인 함수를 이용해서 비밀번호 비교
    if (user.getPassword() !== password) {
      return;
    }
    //도메인 함수를 이용해서 return
    return {
      email: user.getEmail(),
      nickname: user.getNickname(),
      money: user.getMoney(),
      userType: user.getUserType(),
    };
  };
}
