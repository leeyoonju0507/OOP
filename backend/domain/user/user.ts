import {IDomain, IEntity} from '../../specification/interfaces.js';

export interface IUserEntity extends IEntity {
  readonly email: string;
  readonly password: string;
  readonly nickname: string;
  readonly money: number;
  readonly userType: 'seller' | 'buyer';
}

export interface IUser {
  Email: string;
  Money: number;
  Password: string;
  Nickname: string;
  UserType: 'seller' | 'buyer';
  useMoney: (money: number) => void;
  earnMoney: (money: number) => void;
}
export default class UserDomain implements IUser, IDomain {
  public id: number;
  private email: string;
  private password: string;
  private nickname: string;
  private money: number;
  private userType: 'seller' | 'buyer';

  // 생성자
  constructor(
    id: number,
    email: string,
    password: string,
    nickname: string,
    money: number,
    userType: 'seller' | 'buyer',
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.money = money;
    this.userType = userType;
  }

  public get Email() {
    return this.email;
  }
  public get Money() {
    return this.money;
  }
  public get Password() {
    return this.password;
  }
  public get Nickname() {
    return this.nickname;
  }
  public get UserType() {
    return this.userType;
  }

  public useMoney(money: number) {
    if (this.money < money) {
      return;
    }

    this.money -= money;
  }
  public earnMoney(money: number) {
    this.money += money;
  }
  public convertEntity(): IUserEntity {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      nickname: this.nickname,
      money: this.money,
      userType: this.userType,
    };
  }
}

export interface IUserClient {
  email: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}
