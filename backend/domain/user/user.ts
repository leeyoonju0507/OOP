// import {IDomain} from '../../specification/interfaces';

import {IDomain} from '../../specification/interfaces.js';

// 데이터 타입 1: 리포지토리에서 사용합니다
export interface IUserEntity {
  id: number;
  email: string;
  password: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}

// 데이터 타입 2: 서비스에서 사용합니다
export interface IUser {
  id: number;
  email: string;
  password: string;
  nickname: string;
  money: number;
  userType: any;
}
export default class UserDomain implements IUser, IDomain {
  // 데이터: 인스턴스 속성
  public readonly id: number;
  public readonly email: string;
  public readonly password: string;
  public readonly nickname: string;
  public readonly money: number;
  public readonly userType: any;

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

  // public setEmail(newEmail: string) {
  //   this.email = newEmail;
  // }

  // public setMoneyByStorage(money: number) {
  //   this.money -= money;
  // }

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

  //CSV에 저장해야되는 문자형태를 스스로 return
  convertStringForCSV(): string {
    return `${this.id},${this.email},${this.password},${this.nickname},${this.money},${this.userType}`;
  }
}

// 데이터 타입 3: 클라이언트에서 사용합니다
export interface IUserClient {
  email: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}
