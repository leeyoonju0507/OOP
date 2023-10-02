import UserRepository, {IUserRepository} from '../Repository/user-repository';
import * as path from 'path';
import {IUserData} from '../Specification/interfaces';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';
import {ILoginData} from '../Specification/interfaces';

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
  buyProduct(user: ILoginData): Promise<true | false>;
  showProduct(user: ILoginData): Promise<void>;
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

  buyProduct = async (user: ILoginData) => {
    //이 고객이 회원인지 아닌지 검사
    const checkmember = await this.userRepository.checkUserByData(user);
    if (!checkmember) {
      return false;
    }
    //구매가능한지
    return !!(await this.userRepository.plusNumOfProduct());
  };

  showProduct = async (user: ILoginData) => {
    const member: Seller | Buyer | undefined = await this.userRepository.findUserByEmail(
      user.email,
    );
    if (member instanceof Seller) {
      return await this.userRepository.showProductInStorage(member);
    }
  };
}

export default Service;
