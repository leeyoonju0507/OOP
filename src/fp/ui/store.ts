import {IAuthScreen} from './auth-screen';
import {IHomeScreen} from './home-screen';
import {inputReceiver} from '../../input';
import {ILoginData} from '../specification/interfaces';
import createUserService from '../service/user-service';

export const init = async (authScreen: IAuthScreen, homeScreen: IHomeScreen) => {
  console.log('=======인증스크린=======');
  console.log('회원가입(0) vs 로그인(1)');
  const sign = await inputReceiver('숫자를 입력하세요: ');
  const userService = createUserService();
  if (sign === '0') {
    await authScreen.signUpUI(userService);
    await init(authScreen, homeScreen);
  } else if (sign === '1') {
    const user: ILoginData | undefined = await authScreen.loginUI(userService);
    // 로그인이 실패시(이메일 또는 비번을 못찾을때)
    if (!user) {
      await init(authScreen, homeScreen);
    }
    // 로그인 성공할 때
    else {
      const checkLogout = await homeScreen.mainUI(user);
      if (!checkLogout) {
        await init(authScreen, homeScreen);
      }
    }
  } else {
    console.log('다시 입력하세요');
    await init(authScreen, homeScreen);
  }
};
