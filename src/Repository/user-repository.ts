import Database from '../Database/database';

export interface IUserRepository {
  findUserByEmail(email: string): any;
  findUserByPassword(password: string): any;
  findEmailIndex(email: string): number;
  findPasswordIndex(password: string): number;
}

class UserRepository {
  private db: Database;
  // private userRows: any;
  constructor() {
    this.db = new Database();
    // this.userRows = this.db.readCSV('users.csv');
  }

  findUserByEmail = async (email: string) => {
    const userRows: any = await this.db.readCSV('users.csv');
    for (let i: number = 0; i < userRows.length; i++) {
      if (email === userRows[i].email) {
        return userRows[i];
      }
    }
    return undefined;
  };

  findUserByPassword = async (password: string) => {
    const userRows: any = await this.db.readCSV('users.csv');
    for (let i: number = 0; i < userRows.length; i++) {
      if (password === userRows[i].password) {
        return userRows[i];
      }
    }
    return undefined;
  };

  findEmailIndex = async (email: string) => {
    const userRows: any = await this.db.readCSV('users.csv');
    for (let i: number = 0; i < userRows.length; i++) {
      if (email === userRows[i].email) {
        return i;
      }
    }
  };

  findPasswordIndex = async (password: string) => {
    const userRows: any = await this.db.readCSV('users.csv');
    for (let i = 0; i < userRows.length; i++) {
      if (password === userRows[i].password) {
        return i;
      }
    }
  };
}

export default UserRepository;
