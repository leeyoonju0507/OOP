import Service, {IService} from '../service/service';
import {ILoginData} from '../specification/interfaces';
import UserService, {IUserService} from '../service/user-service';
import ProductService, {IProductService} from '../service/product-service';
import {inputReceiver} from '../../input';

export interface IHomeScreen {
  mainUI(user: ILoginData): Promise<undefined | boolean>;
  sellerUI(user: ILoginData): Promise<undefined | boolean>;
}
class HomeScreen implements IHomeScreen {
  private userService: IUserService;
  private productService: IProductService;

  constructor() {
    this.userService = new UserService();
    this.productService = new ProductService();
  }

  mainUI = async (user: ILoginData) => {
    console.log(
      user.nickname +
        '님 환영합니다~^^  ====>  ' +
        'UserType:' +
        user.userType +
        '   ' +
        '잔액:' +
        user.money +
        '원',
    );
    if (user.userType === 'seller') {
      return await this.sellerUI(user);
    }
  };

  sellerUI = async (user: ILoginData) => {
    while (1) {
      console.log('======Seller Main-Page======');
      console.log('(1) 창고에 물건을 추가 vs (2)창고 목록보기 vs (3)로그아웃');
      const select = await inputReceiver('메뉴선택하세요: ');
      switch (select) {
        case '1':
          const title = await inputReceiver('title을 입력하세요: ');
          const price = parseInt(await inputReceiver('가격을 입력하세요: '));
          const content = await inputReceiver('내용을 입력하세요: ');
          const canRegister = await this.productService.registerProduct(
            user.email,
            title,
            price,
            content,
          );
          if (!canRegister) {
            console.log('이 판매자는 존재하지 않거나 상품을 등록할 수 없습니다..');
            return;
          }
          console.log('물건을 1개 (창고에) 등록에 성공했습니다.');
          break;
        case '2':
          console.log('~~~~~판매자가 창고에 저장한 물건목록~~~~~');
          const listOfProduct = await this.productService.getSellerProducts(user.email);
          for (let i = 0; i < listOfProduct.length; i++) {
            console.log(`[상품 ${i + 1}번]`);
            console.log(listOfProduct[i].id);
            console.log(listOfProduct[i].title);
            console.log(listOfProduct[i].price);
            console.log(listOfProduct[i].content + '\n');
          }
          break;
        case '3':
          return false;
        default:
          break;
      }
    }
    return true;
  };
}
export default HomeScreen;
