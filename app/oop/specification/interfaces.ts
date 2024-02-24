export interface IUserData {
  id: number;
  email: string;
  password: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}
//client <- service
export interface ILoginData {
  email: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}
