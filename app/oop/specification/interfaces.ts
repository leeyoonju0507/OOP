export interface IDomain {
  convertStringForCSV(): string;
}
export interface ISingUpData {
  email: string;
  password: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}
