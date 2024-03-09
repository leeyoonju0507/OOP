export interface IDomain {
  convertStringForCSV(): string;
}
export interface ISignUpData {
  email: string;
  password: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}
