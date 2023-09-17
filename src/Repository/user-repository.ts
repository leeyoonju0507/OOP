import Database from '../Database/database';
import {IUserData} from '../Specification/interfaces';

export interface IUserRepository {
  findUserByEmail(email: string): any;
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
}

export default UserRepository;
