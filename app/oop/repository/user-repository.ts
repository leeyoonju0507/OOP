import Database from '../database/database';
import Buyer from '../domain/user/buyer';
import Seller from '../domain/user/seller';
import {IUserEntity} from '../domain/user/user';
import {ISingUpData} from '../specification/interfaces';

export interface IUserRepository {
  createUser(user: ISingUpData): Promise<void>;
  findUserByEmail(email: string): Promise<Seller | Buyer | undefined>;
}

class UserRepository implements IUserRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  //회원가입할때 CSV에 유저정보를 저장하고
  createUser = async (user: ISingUpData) => {
    await this.db.appendCSV(
      'users.csv',
      `${user.email},${user.password},${user.nickname},${user.money},${user.userType}`,
    );
  };
  findUserByEmail = async (email: string) => {
    const userRows = await this.db.readCSV<IUserEntity>('users.csv');
    for (let i: number = 0; i < userRows.length; i++) {
      if (email === userRows[i].email) {
        const userObject = userRows[i];
        if (userObject.userType === 'seller') {
          return new Seller(
            userObject.id,
            userObject.email,
            userObject.password,
            userObject.nickname,
            userObject.money,
            userObject.userType as 'seller' | 'buyer',
          );
        } else {
          return new Buyer(
            userObject.id,
            userObject.email,
            userObject.password,
            userObject.nickname,
            userObject.money,
            userObject.userType as 'seller' | 'buyer',
          );
        }
      }
    }
  };
}

export default UserRepository;
