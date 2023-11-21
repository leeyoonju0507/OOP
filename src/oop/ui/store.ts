import AuthScreen, {IAuthScreen} from './auth-screen';
import HomeScreen from './home-screen';
import {ILoginData} from '../specification/interfaces';
import {inputReceiver} from '../../input';

class Store {
  private authScreen: IAuthScreen;
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
      await this.authScreen.signUpUI();
      await this.init();
    } else if (sign === '1') {
      const user: ILoginData | undefined = await this.authScreen.loginUI();
      // 로그인이 실패시(이메일 또는 비번을 못찾을때)
      if (!user) {
        await this.init();
      }
      // 로그인 성공할 때
      else {
        const checkLogout = await this.homeScreen.mainUI(user);
        if (!checkLogout) {
          this.init();
        }
      }
    } else {
      console.log('다시 입력하세요');
      await this.init();
    }
  }
}

export default Store;
