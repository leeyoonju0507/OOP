import Database from '../Database/database';
import {IUserData} from '../Specification/interfaces';
import Product from '../Domain/product/product';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';
import User from '../Domain/user/user';
import {inputReceiver} from '../utils';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUserData | undefined>;
  storeUser(thing: any): any;
  storeSeller(user: any): void;
  storeBuyer(user: any): void;
  makeSellerObject(user: IUserData): any;
}

class UserRepository implements IUserRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }
  //회원가입할때 CSV에 유저정보를 저장하고
  storeUser = async (user: any) => {
    await this.db.writeCSV(
      'users.csv',
      `${user.email},${user.password},${user.nickname},${user.money},${user.userType},${user.accountId}`,
    );
    //구매자인지 판매자인지에 따라 또 CSV를 저장한다.
    if (user.userType === 'seller') {
      await this.storeSeller(user);
      // await this.makeSellerObject(user);
    } else if (user.userType === 'buyer') {
      await this.storeBuyer(user);
      // await this.makeBuyerObject(user);
    }
  };

  findUserByEmail = async (email: string) => {
    const userRows: any = await this.db.readCSV('users.csv');
    for (let i: number = 0; i < userRows.length; i++) {
      if (email === userRows[i].email) {
        return userRows[i] as IUserData;
      }
    }
    return;
  };

  //CSV에 저장
  storeSeller = async (user: any) => {
    await this.db.writeCSV(
      'seller.csv',
      `${user.email},${user.password},${user.nickname},${user.money},${user.accountId},${user.numStoredProduct},${user.numSelledProduct}`,
    );
  };
  storeBuyer = async (user: any) => {
    await this.db.writeCSV(
      'buyer.csv',
      `${user.email},${user.password},${user.nickname},${user.money},${user.accountId}`,
    );
  };
  //seller객체를 만든다.
  makeSellerObject = async (user: IUserData) => {
    const seller = new Seller(user.email, user.password, user.nickname, user.money, user.accountId);
    return seller;
  };
}

export default UserRepository;
