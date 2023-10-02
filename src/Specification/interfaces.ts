export interface IUserData {
  email: string;
  password: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
  accountId: any;
}

export interface ILoginData {
  email: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}

export interface IProductData {
  title: string;
  price: number;
  content: string;
}
