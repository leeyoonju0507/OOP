import UserRepository, {IUserRepository} from '../Repository/user-repository';
import {ILoginData, IProductData, IUserData} from '../Specification/interfaces';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';
import ProductRepository, {IProductRepository} from '../Repository/product-repository';
import Product from '../Domain/product/product';
import Repository, {IRepository} from '../Repository/repository';

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
    return !!(await this.userRepository.findUserByEmail(email));
  };
  signUp = async (userData: IUserData) => {
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
}
