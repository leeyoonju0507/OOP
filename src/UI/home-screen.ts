import {inputReceiver} from '../utils';
import Service, {IService} from '../Service/service';
import {ILoginData} from '../Specification/interfaces';

class HomeScreen {
  private service: IService;

  constructor() {
    this.service = new Service();
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
      await this.sellerUI(user);
    }
  };
  sellerUI = async (user: ILoginData) => {
    console.log('======Seller Main-Page======');
    console.log('(1) 창고에 물건을 추가 vs (2)창고 목록보기 vs (3)로그아웃');
    const select = await inputReceiver('메뉴선택하세요: ');
    if (select === '1') {
      const canBuy: false | true = await this.service.buyProduct(user);
      if (!canBuy) {
        console.log('이 판매자는 존재하지 않거나 구매할 수 없습니다.');
        return;
      }
      console.log('물건을 1개 (창고에) 구매 성공했습니다.');
      await this.sellerUI(user);
    } else if (select === '2') {
      console.log('~~~~~판매자가 창고에 저장한 물건목록~~~~~');
      await this.service.showProduct(user);
      await this.sellerUI(user);
    } else if (select === '3') {
      return;
    }
  };
}

export default HomeScreen;
