import ProductService, {IProductService} from './product-service';
import UserService, {IUserService} from './user-service';

export interface IService {
  get userService(): IUserService;
  get productService(): IProductService;
}
class Service implements IService {
  private static Instanceof: Service;
  private _productService: IProductService;
  private _userService: IUserService;

  private constructor() {
    this._productService = new ProductService();
    this._userService = new UserService();
  }

  public static getInstance() {
    if (!Service.Instanceof) {
      Service.Instanceof = new Service();
    }
    return Service.Instanceof;
  }

  public get userService() {
    return this._userService;
  }
  public get productService() {
    return this._productService;
  }
}
export default Service;
