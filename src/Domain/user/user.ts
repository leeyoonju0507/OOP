import UserRepository from '../../Repository/user-repository';

export interface IUser {}

export default class User {
  // 데이터: 인스턴스 속성
  private email: string;
  private password: string;
  private nickname: string;
  private money: number;

  // 생성자
  constructor(email: string, password: string, nickname: string, money: number) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.money = money;
  }

  // 함수: 인스턴스 메소드
  public getEmail() {
    return this.email;
  }

  public setEmail(newEmail: string) {
    this.email = newEmail;
  }

  public getMoney() {
    return this.money;
  }

  public deposit(money: number) {
    this.money += money;
  }

  public withdraw(money: number) {
    this.money -= money;
  }
}
