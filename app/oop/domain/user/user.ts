import UserRepository from '../../repository/user-repository';

export interface IUserCSV {
  id: string;
  email: string;
  password: string;
  nickname: string;
  money: string;
  userType: 'seller' | 'buyer';
}
export interface IUser {}

export default class User {
  // 데이터: 인스턴스 속성
  protected id: number;
  protected email: string;
  protected password: string;
  protected nickname: string;
  protected money: number;
  protected userType: any;

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

  // 함수: 인스턴스 메소드
  public getEmail() {
    return this.email;
  }

  public setEmail(newEmail: string) {
    this.email = newEmail;
  }

  public setMoneyByStorage(money: number) {
    this.money -= money;
  }

  public getMoney() {
    return this.money;
  }

  public getPassword() {
    return this.password;
  }

  public getNickname() {
    return this.nickname;
  }
  public getUserType() {
    return this.userType;
  }
}
