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
