export interface IEntity {
  id: number;
}
export interface IDomain {
  readonly id: number;
  convertEntity(): IEntity;
}
export interface ISignUpData {
  email: string;
  password: string;
  nickname: string;
  money: number;
  userType: 'seller' | 'buyer';
}
