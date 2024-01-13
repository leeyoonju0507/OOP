import {ILoginData, IUserData} from '../specification/interfaces';
import Buyer from '../domain/user/buyer';
import Seller from '../domain/user/seller';
import Repository, {IRepository} from '../repository/repository';
import handler from './handler';

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

const createUserService = (): IUserService => {
  const repository: IRepository = Repository.getInstance();

  const checkSignedUpByEmail = handler(async (email: string) => {
    return !!(await repository.userRepository.findUserByEmail(email));
  });
  const signUp = handler(async (userData: IUserData) => {
    await repository.userRepository.storeUser(userData);
  });
  const login = handler(async (email: string, password: string) => {
    const user: Seller | Buyer | undefined = await repository.userRepository.findUserByEmail(email);
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
  });

  return {
    checkSignedUpByEmail,
    signUp,
    login,
  };
};

export default createUserService;
