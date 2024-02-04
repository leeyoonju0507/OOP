import UserRepository, {IUserRepository} from './user-repository.js';
import ProductRepository, {IProductRepository} from './product-repository.js';

export interface IRepository {
  get userRepository(): IUserRepository;
  get productRepository(): IProductRepository;
}
export default class Repository implements IRepository {
  private static instance: Repository;
  private _userRepository: IUserRepository;
  private _productRepository: IProductRepository;

  private constructor() {
    this._userRepository = new UserRepository();
    this._productRepository = new ProductRepository();
  }

  public static getInstance() {
    if (!Repository.instance) {
      Repository.instance = new Repository();
    }
    return Repository.instance;
  }
  public get userRepository() {
    return this._userRepository;
  }
  public get productRepository() {
    return this._productRepository;
  }
}
