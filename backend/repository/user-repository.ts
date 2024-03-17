import UserDomain, {IUserEntity} from '../domain/user/user.js';
import {ISignUpData} from '../specification/interfaces.js';
import BaseRepository, {IBaseRepository} from './base-repository.js';

export interface IUserRepository extends IBaseRepository {
  createUser(user: ISignUpData): Promise<void>;
  findUserByEmail(email: string): Promise<UserDomain | undefined>;
}

export default class UserRepository extends BaseRepository implements IUserRepository {
  constructor() {
    super('users.csv');
  }

  // 생성, 검색, 업데이트, 삭제
  createUser = async (user: ISignUpData) => {
    await this.db.appendCSV(
      'users.csv',
      `${user.email},${user.password},${user.nickname},${user.money},${user.userType}`,
    );
  };
  findUserByEmail = async (email: string) => {
    const userRows = await this.db.readCSV<IUserEntity>('users.csv');
    for (let i = 0; i < userRows.length; i++) {
      if (email === userRows[i].email) {
        const userObject = userRows[i];
        if (userObject.userType === 'seller') {
          return new UserDomain(
            userObject.id,
            userObject.email,
            userObject.password,
            userObject.nickname,
            userObject.money,
            userObject.userType as 'seller' | 'buyer',
          );
        } else {
          return new UserDomain(
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
