export interface IUserData {
  id: number;
  email: string;
  password: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}

export interface ILoginData {
  email: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}

export interface IProductData {
  id: any;
  title: string;
  price: number;
  content: string;
}
