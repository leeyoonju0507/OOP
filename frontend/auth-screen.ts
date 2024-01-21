import {ILoginData} from './specification/interfaces';

export interface IAuthScreen {
  signUpUI(): Promise<boolean>;
  loginUI(): Promise<ILoginData | undefined>;
}

class AuthScreen implements IAuthScreen {
  constructor() {}

  signUpUI = async () => {
    // console.log('=======회원가입 페이지=======');
    // const email = await inputReceiver('email 입력하세요: ');
    // const isSignedUp = await this.userService.checkSignedUpByEmail(email);
    // if (isSignedUp) {
    //   console.log('이미 가입이 되어있는 email입니다. 인증스크린으로 돌아갑니다.');
    //   return false;
    // }
    // console.log('사용가능한 이메일 입니다.');
    // const password = await inputReceiver('password를 입력하세요: ');
    // const nickname = await inputReceiver('nickname을 입력하세요: ');
    // const moneyString = await inputReceiver('money를 입력하세요: ');
    // const money = parseInt(moneyString);
    // const userTypeString = await inputReceiver('buyer or seller: ');
    // let userType: 'seller' | 'buyer';
    // if (userTypeString === 'seller') {
    //   userType = 'seller';
    // } else {
    //   userType = 'buyer';
    // }
    // await this.userService.signUp({email, password, nickname, money, userType});
    return true;
  };

  loginUI = async () => {
    // console.log('=======로그인 페이지=======');
    // const email = await inputReceiver('이메일을 입력하세요: ');
    // const password = await inputReceiver('비밀번호를 입력하세요: ');
    // const userInfo: ILoginData | undefined = await this.userService.login(email, password);
    // if (!userInfo) {
    //   console.log('이메일 또는 비밀번호를 찾을 수 없습니다.');
    //   return;
    // }
    // return userInfo as ILoginData;
    throw new Error();
  };
}

export default AuthScreen;