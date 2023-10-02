import Database from '../Database/database';
import {ILoginData, IUserData} from '../Specification/interfaces';
import Product from '../Domain/product/product';
import Buyer from '../Domain/user/buyer';
import Seller from '../Domain/user/seller';
import User from '../Domain/user/user';
import {inputReceiver} from '../utils';

export interface IUserRepository {
  findUserByEmail(email: string): Promise<Seller | Buyer | undefined>;
  storeUser(thing: any): any;
  plusNumOfProduct(user: Seller | Buyer): Promise<true | false>;
  showProductInStorage(member: Seller): Promise<void>;
  checkUserByData(data: ILoginData): Promise<typeof Seller | undefined>;
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
      `${user.email},${user.password},${user.nickname},${user.money},${user.userType}`,
    );
  };

  findUserByEmail = async (email: string) => {
    const userRows: any = await this.db.readCSV('users.csv');
    for (let i: number = 0; i < userRows.length; i++) {
      // if (email === userRows[i].email) {
      //   return userRows[i] as IUserData;
      // }
      const userObject: IUserData = userRows[i];
      if (userObject.userType === 'seller') {
        return new Seller(
          userObject.email,
          userObject.password,
          userObject.nickname,
          userObject.money,
          userObject.userType,
        );
      } else {
        return new Buyer(
          userObject.email,
          userObject.password,
          userObject.nickname,
          userObject.money,
          userObject.userType,
        );
      }
    }
  };

  checkUserByData = async (data: any) => {
    const userRows: any = await this.db.readCSV('users.csv');
    for (let i = 0; i < userRows.length; i++) {
      if (
        userRows[i].email === data.email &&
        userRows[i].nickname === data.nickname &&
        userRows[i].userType === data.userType &&
        userRows[i].money === data.money
      ) {
        return Seller.getInstance();
      }
    }
  };

  //회원이 물건을 창고에 구매할수있는지 여부 확인 후 가능하면 true리턴
  plusNumOfProduct = async (member: Seller | Buyer) => {
    if (member instanceof Seller) {
      return member.addStorage();
    }
    return false;
  };

  //회원의 물건을 보여주기
  showProductInStorage = async (member: Seller) => {
    if (!member.getNumStoredProduct()) {
      return;
    }
    console.log(Product.description());
    for (let i = 0; i < member.getNumStoredProduct(); i++) {
      console.log([i + 1] + '번) ' + member.getStorageBefore(i));
    }
  };
}

export default UserRepository;
