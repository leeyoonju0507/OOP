import Database from '../Database/database';
import {IUserData} from '../Specification/interfaces';

export interface IUserRepository {
  findUserByEmail(email: string): any;
  storeUserData(thing: any): any;
}

class UserRepository implements IUserRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  findUserByEmail = async (email: string) => {
    const userRows: any = await this.db.readCSV('users.csv');
    for (let i: number = 0; i < userRows.length; i++) {
      if (email === userRows[i].email) {
        return userRows[i] as IUserData;
      }
    }
    return;
  };

  storeUserData = async (thing: any) => {
    const db: Database = new Database();
    await db.writeCSV(
      'users.csv',
      `${thing.email},${thing.password},${thing.nickname},${thing.money},${thing.userType}`,
    );
  };
}

export default UserRepository;
