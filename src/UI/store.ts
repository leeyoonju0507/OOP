import AuthScreen from './auth-screen';
import {inputReceiver} from '../utils';

class Store {
  async init() {
    console.log('=======인증스크린=======');
    console.log('회원가입(0) vs 로그인(1)');
    const sign = await inputReceiver('숫자를 입력하세요: ');
    const p: AuthScreen = new AuthScreen();

    if (sign === '0') {
      await p.signUpUI();
    } else if (sign === '1') {
      await p.loginUI();
    } else {
      console.log('다시 입력하세요');
      await this.init();
    }
  }

  async signin(thing: any) {
    console.log(
      (await thing.nickname) +
        '님 환영합니다~^^  ====>  ' +
        'UserType:' +
        (await thing.usertype) +
        '   ' +
        '잔액:' +
        (await thing.money) +
        '원',
    );
  }
}
export default Store;
