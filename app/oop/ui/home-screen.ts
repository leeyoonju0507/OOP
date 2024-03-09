import UserService, {IUserService} from '../service/user-service';
import ProductService, {IProductService} from '../service/product-service';
import {inputReceiver} from '../../input';
import {IUserClient} from '../domain/user/user';

export interface IHomeScreen {
  mainUI(user: IUserClient): Promise<undefined | boolean>;
  sellerUI(user: IUserClient): Promise<undefined | boolean>;
  buyerUI(user: IUserClient): Promise<undefined | boolean>;
}
class HomeScreen implements IHomeScreen {
  private userService: IUserService;
  private productService: IProductService;

  constructor() {
    this.userService = new UserService();
    this.productService = new ProductService();
  }

  mainUI = async (user: IUserClient) => {
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
    } else if (user.userType === 'buyer') {
      return await this.buyerUI(user);
    }
  };

  sellerUI = async (user: IUserClient) => {
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
          console.log('물건을 1개 (창고에) 등록 성공했습니다.');
          continue;
        case '2':
          console.log('~~~~~판매자가 창고에 저장한 물건목록~~~~~');
          const SellerProductRow = await this.productService.getSellerProductsByEmail(user.email);
          for (let i = 0; i < SellerProductRow.length; i++) {
            console.log(`[상품 ${i + 1}번]`);
            console.log('상품고유아이디: ' + SellerProductRow[i].id);
            console.log('상품이름: ' + SellerProductRow[i].title);
            console.log('상품가격: ' + SellerProductRow[i].price);
            console.log('상품내용: ' + SellerProductRow[i].content + '\n');
          }
          continue;
        case '3':
          return false;
        default:
          break;
      }
    }
    return true;
  };
  buyerUI = async (user: IUserClient) => {
    while (1) {
      console.log('======Buyer Main-Page======');
      console.log('(1) 물건구매하기 vs (2)구매한 물건 목록보기 vs (3)로그아웃');
      const select = await inputReceiver('메뉴를 선택하세요: ');
      switch (select) {
        case '1':
          //모든 상품 보여주기
          const allProducts = await this.productService.getAllProduct();

          allProducts.forEach((e) => {
            console.log(
              `상품고유아이디: ${e.id} 상품이름:${e.title} 상품가격:${e.price} 상품내용:${e.content}`,
            );
          });

          const id = await inputReceiver('구매할 물건의 id를 입력하세요:');
          const canBuy = await this.productService.buyProduct(id, user.email);

          if (!canBuy) {
            console.log('현재 재고가 없습니다.');
            continue;
          }
          console.log('!!물건 구매 성공!!');
          continue;
        case '2':
          console.log('~~~~~구매자가 구매한 물건목록~~~~~');
          const BuyerProductRow = await this.productService.getBuyerProductsByEmail(user.email);
          for (let i = 0; i < BuyerProductRow.length; i++) {
            console.log(`[상품 ${i + 1}번]`);
            console.log('상품고유아이디: ' + BuyerProductRow[i].id);
            console.log('상품이름: ' + BuyerProductRow[i].title);
            console.log('상품가격: ' + BuyerProductRow[i].price);
            console.log('상품내용: ' + BuyerProductRow[i].content + '\n');
          }
          continue;
        case '3':
          return false;
      }
    }
    return true;
  };
}
export default HomeScreen;
