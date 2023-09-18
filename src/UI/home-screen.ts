import {inputReceiver} from '../utils';

class HomeScreen {
  mainUI = async (user: any) => {
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
    console.log('메뉴');
    console.log('상품 구매: 1');
    console.log('로그아웃: 2');
    const sign = await inputReceiver('메뉴를 선택하세요: ');
  };
}

export default HomeScreen;
