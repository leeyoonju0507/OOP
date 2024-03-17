import {IUserClient} from '../domain/user/user.js';
import ProductRepository, {IProductRepository} from '../repository/product-repository.js';
import Repository, {IRepository} from '../repository/repository.js';
import UserRepository, {IUserRepository} from '../repository/user-repository.js';
import {ISignUpData} from '../specification/interfaces.js';

export interface IUserService {
  checkSignedUpByEmail(email: string): Promise<boolean>;
  signUp(signUpData: ISignUpData): Promise<{
    isSuccess: boolean;
    message: string;
  }>;
  login(email: string, password: string): Promise<IUserClient | undefined>;
}
export default class UserService implements IUserService {
  private repository: IRepository;

  constructor() {
    this.repository = Repository.getInstance();
  }

  checkSignedUpByEmail = async (email: string) => {
    return !!(await this.repository.userRepository.findUserByEmail(email));
  };
  signUp = async (signUpData: ISignUpData) => {
    const {email} = signUpData;
    const user = await this.repository.userRepository.findUserByEmail(email);
    if (user) {
      return {
        isSuccess: false,
        message: '이미 존재하는 회원입니다',
      };
    }

    await this.repository.userRepository.createUser(signUpData);
    return {
      isSuccess: true,
      message: '회원 가입에 성공했습니다',
    };
  };
  login = async (email: string, password: string) => {
    const user = await this.repository.userRepository.findUserByEmail(email);
    if (!user) {
      return;
    }

    if (user.Password !== password) {
      return;
    }

    return {
      email: user.Email,
      nickname: user.Nickname,
      money: user.Money,
      userType: user.UserType,
    };
  };
}
