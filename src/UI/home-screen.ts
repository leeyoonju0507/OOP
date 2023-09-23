import {inputReceiver} from '../utils';
import Service, {IService} from '../Service/service';
import {IUserData} from '../Specification/interfaces';
import Seller from '../Domain/user/seller';
import Product from '../Domain/product/product';
class HomeScreen {
  private service: IService;

  constructor() {
    this.service = new Service();
  }

  mainUI = async (user: IUserData) => {
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
      const seller = await this.service.showProductInStorage(user);
      await this.sellerUI(seller);
    }
  };
  sellerUI = async (seller: Seller) => {
    while (true) {
      console.log('======Seller Main-Page======');
      if (seller.getNumStoredProduct() === 0) {
        console.log('판매자가 물건을 가지고 있지 않습니다.');
      } else {
        Product.description();
        for (let i: number = 0; i < seller.getNumStoredProduct(); i++) {
          console.log(`productId ${i + 1}번:` + seller.getStorage(i));
        }
      }

      console.log('(1) 창고에 물건을 추가 vs (2)로그아웃');
      const select = await inputReceiver('메뉴선택하세요: ');
      if (select === '1') {
        await seller.addStorage(); //seller는 storage(창고)에 물건을 추가한다.
      } else if (select === '2') return;
    }
  };
}

export default HomeScreen;
