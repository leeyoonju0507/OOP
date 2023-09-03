import {inputReceiver} from '../utils';

class AuthScreen {
  loginUI = async () => {
    const email = await inputReceiver('이메일을 입력하세요: ');
    const password = await inputReceiver('비밀번호를 입력하세요: ');
    return {email, password};
  };
  signUpUI = async () => {};
}

export default AuthScreen;
