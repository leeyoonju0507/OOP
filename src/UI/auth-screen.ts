import {inputReceiver} from '../utils';
import Service from '../Service/service';

class AuthScreen {
  private service: Service;

  constructor() {
    this.service = new Service();
  }

  signUpUI = async () => {
    console.log('=======회원가입=======');
    const email = await inputReceiver('email 입력하세요: ');
    const isSignedUp = await this.service.checkSignedUpByEmail(email);
    if (isSignedUp) {
      console.log('이미 가입이 되어있는 email입니다. 인증스크린으로 돌아갑니다.');
      return false;
    } else {
      console.log('사용가능한 이메일 입니다.');
    }
    const password = await inputReceiver('password를 입력하세요: ');
    const nickname = await inputReceiver('nickname을 입력하세요: ');
    // money입력받는 함수
    const readmoney: any = async () => {
      let money: string = await inputReceiver('money를 입력하세요: ');

      for (const m of money) {
        if (!(parseInt(m) >= 0 && parseInt(m) <= 9)) {
          console.log('잔액이 음수이거나 숫자가 아닙니다. 다시 입력하세요.');
          return await readmoney();
        }
      }
      return parseInt(money);
    };
    const money = await readmoney();
    const usertype = await inputReceiver('구매자 or 판매자: ');
    // 개인정보를 Service에게 시켜서 data저장-> Service는 db를 시켜서 저장
    await this.service.write({email, password, nickname, money, usertype});
    console.log('회원가입완료');
    return true;
  };

  loginUI = async () => {
    console.log('=======로그인=======');
    const email = await inputReceiver('이메일을 입력하세요: ');
    const password = await inputReceiver('비밀번호를 입력하세요: ');
    const UserInfo = await this.service.checkLoginedByEmailandPassword(email, password);
    if (!UserInfo) {
      console.log('이메일 또는 비밀번호를 찾을 수 없습니다.');
      return false;
    } else {
      return UserInfo;
    }
  };
}

export default AuthScreen;
