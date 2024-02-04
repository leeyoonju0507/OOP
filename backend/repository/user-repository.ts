import Database from '../database/database.js';
import {IUserData} from '../specification/interfaces.js';
import Buyer from '../domain/user/buyer.js';
import Seller from '../domain/user/seller.js';

export interface IUserRepository {
  storeUser(user: IUserData): Promise<void>;
  findUserByEmail(email: string): Promise<Seller | Buyer | undefined>;
  // findSellerByEmailWithStorage(email: string): Promise<Seller | Buyer | undefined>;
}

class UserRepository implements IUserRepository {
  static getInstance(): import('./repository.js').IRepository {
    throw new Error('Method not implemented.');
  }
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  //회원가입할때 CSV에 유저정보를 저장하고
  storeUser = async (user: IUserData) => {
    await this.db.writeCSV(
      'users.csv',
      `${user.email},${user.password},${user.nickname},${user.money},${user.userType}`,
    );
  };
  findUserByEmail = async (email: string) => {
    const userRows = await this.db.readCSV('users.csv');
    for (let i: number = 0; i < userRows.length; i++) {
      if (email === userRows[i].email) {
        const userObject = userRows[i];
        if (userObject.userType === 'seller') {
          return new Seller(
            parseInt(userObject.id),
            userObject.email,
            userObject.password,
            userObject.nickname,
            parseInt(userObject.money),
            userObject.userType as 'seller' | 'buyer',
          );
        } else {
          return new Buyer(
            parseInt(userObject.id),
            userObject.email,
            userObject.password,
            userObject.nickname,
            parseInt(userObject.money),
            userObject.userType as 'seller' | 'buyer',
          );
        }
      }
    }
  };
}

export default UserRepository;
