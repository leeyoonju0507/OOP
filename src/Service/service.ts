import UserRepository, {IUserRepository} from '../Repository/user-repository';
import * as path from 'path';
import {IUserData} from '../Specification/interfaces';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';

export interface IService {
  checkSignedUpByEmail(email: string): Promise<boolean>;
  login(email: string, password: string): Promise<IUserData | undefined>;
  signUp(userData: {
    email: string;
    password: string;
    nickname: string;
    money: number;
    userType: string;
    accountId: any;
  }): Promise<void>;
  showProductInStorage(user: IUserData): Promise<Seller>;
}

class Service implements IService {
  private userRepository: UserRepository;

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
    accountId: any;
  }) => {
    await this.userRepository.storeUser(userData);
  };

  login = async (email: string, password: string) => {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return;
    }
    if (user.password !== password) {
      return;
    }
    return user;
  };

  showProductInStorage = async (user: IUserData) => {
    const seller: Seller = await this.userRepository.makeSellerObject(user);
    return seller;
  };
}

export default Service;
