import UserRepository from '../Repository/user-repository';
import * as path from 'path';
import {IUserData} from '../Specification/interfaces';
export interface IService {
  checkSignedUpByEmail(email: string): Promise<boolean>;
  login(email: string, password: string): Promise<IUserData | undefined>;
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
    this.userRepository.storeUserData(userData);
  };

  login = async (email: string, password: string) => {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      return;
    }
    if (user.password === password) {
      return user;
    }
    return;
  };
}

export default Service;
