import Database from '../Database/database';
import UserRepository from '../Repository/user-repository';
export interface IService {
  checkSignedUpByEmail(email: string): boolean;
  login(email: string, password: string): string;
}

class Service {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  checkSignedUpByEmail = async (email: string) => {
    return await this.userRepository.findUserByEmail(email);
  };

  checkLoginedByEmailandPassword = async (email: string, password: string) => {
    //이 호갱님이 우리 회원맞아?
    const isEmailExist: true | false = await this.userRepository.findUserByEmail(email);
    if (!isEmailExist) {
      return false;
    }
    const isPasswordExist: true | false = await this.userRepository.findUserByPassword(password);
    if (!isPasswordExist) {
      return false;
    }
    //email의 인덱스와 password의 인덱스가 같아야한다.
    if (
      (await this.userRepository.findEmailIndex(email)) ===
      (await this.userRepository.findPasswordIndex(password))
    ) {
      return await this.userRepository.findUserByPassword(password);
    } else {
      return;
    }
  };

  write = async (a: any) => {
    const db: Database = new Database();
    await db.writeCSV(
      'users.csv',
      `${a.email},${a.password},${a.nickname},${a.money},${a.usertype}`,
    );
  };
}

export default Service;
