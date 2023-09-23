import AuthScreen, {IAuthScreen} from './auth-screen';
import {inputReceiver} from '../utils';
import HomeScreen from './home-screen';

class Store {
  private authScreen: AuthScreen;
  private homeScreen: HomeScreen;

  constructor() {
    this.authScreen = new AuthScreen();
    this.homeScreen = new HomeScreen();
  }

  async init() {
    console.log('=======인증스크린=======');
    console.log('회원가입(0) vs 로그인(1)');
    const sign = await inputReceiver('숫자를 입력하세요: ');
    if (sign === '0') {
      const result = await this.authScreen.signUpUI();
      if (!result) {
        await this.init();
      }
    } else if (sign === '1') {
      const user = await this.authScreen.loginUI();
      // 로그인이 안될때(이메일 또는 비번을 못찾을때)
      if (!user) {
        await this.init();
      }
      // 로그인 성공할 때
      else {
        await this.homeScreen.mainUI(user);
      }
    } else {
      console.log('다시 입력하세요');
      await this.init();
    }
  }
}

export default Store;
