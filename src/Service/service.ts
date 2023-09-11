import Database from '../Database/database';
import UserRepository from '../Repository/user-repository';

class Service {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  checkSignedUpByEmail = async (email: string) => {
    return false;
  };

  login = async (email: string, password: string) => {
    return undefined;
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
