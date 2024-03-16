import {ILoginData} from '../specification/interfaces';

export interface IAuthScreen {
  signUp(): Promise<boolean | undefined>;
  login(): Promise<ILoginData | undefined>;
}

class AuthScreen implements IAuthScreen {
  private loginEmailInput: HTMLInputElement;
  private loginPasswordInput: HTMLInputElement;

  private loginEmail: string;
  private loginPassword: string;
  //  private loginForm:HTMLElement;
  ////////////////////////////////////////////////
  private signupEmailInput: HTMLInputElement;
  private signupPasswordInput: HTMLInputElement;
  private signupNicknameInput: HTMLInputElement;
  private signupMoneyInput: HTMLInputElement;
  private signupUserTypeInput: HTMLInputElement;

  private signupEmail: string;
  private signupPassword: string;
  private signupNickname: string;
  private signupMoney: number | null;
  private signupUserType: 'buyer' | 'seller' | null;
  // private signupForm:HTMLElement;

  constructor() {
    //this.loginForm = document.getElementById('login-info') as HTMLElement;
    this.loginEmailInput = document.getElementById('login-id-input') as HTMLInputElement;
    this.loginPasswordInput = document.getElementById('login-password-input') as HTMLInputElement;
    this.loginEmail = '';
    this.loginPassword = '';
    // this.signupForm = document.getElementById("signup-info") as HTMLElement;
    this.signupEmailInput = document.getElementById('signup-email-input') as HTMLInputElement;
    this.signupPasswordInput = document.getElementById('signup-password-input') as HTMLInputElement;
    this.signupNicknameInput = document.getElementById('signup-nickname-input') as HTMLInputElement;
    this.signupMoneyInput = document.getElementById('signup-money-input') as HTMLInputElement;
    this.signupUserTypeInput = document.getElementById('signup-usertype-input') as HTMLInputElement;
    this.signupEmail = '';
    this.signupPassword = '';
    this.signupNickname = '';
    this.signupMoney = null;
    this.signupUserType = 'buyer' || 'seller' || null;

    /////////////////////////////////////////////////
    this.signupEmailInput.addEventListener('input', (e) => {
      this.signupEmail = this.signupEmailInput.value;
    });
    this.signupPasswordInput.addEventListener('input', (e) => {
      this.signupPassword = this.signupPasswordInput.value;
    });
    this.signupNicknameInput.addEventListener('input', (e) => {
      this.signupNickname = this.signupNicknameInput.value;
    });
    this.signupMoneyInput.addEventListener('input', (e) => {
      this.signupMoney = parseInt(this.signupMoneyInput.value);
    });
    this.signupUserTypeInput.addEventListener('change', (e) => {
      if (this.signupUserTypeInput.value === 'buyer') {
        this.signupUserType = 'buyer';
      } else if (this.signupUserTypeInput.value === 'seller') {
        this.signupUserType = 'seller';
      } else {
        this.signupUserType = null;
      }
    });
    /////////////////////////////////////////////////
    this.loginEmailInput.addEventListener('input', () => {
      this.loginEmail = this.loginEmailInput.value;
    });
    this.loginPasswordInput.addEventListener('input', () => {
      this.loginPassword = this.loginPasswordInput.value;
    });
  }

  signUp = async () => {
    console.log(
      this.signupEmail +
        ' ' +
        this.signupPassword +
        ' ' +
        this.signupNickname +
        ' ' +
        this.signupMoney +
        ' ' +
        this.signupUserType,
    );
    if (
      !this.signupEmail ||
      !this.signupPassword ||
      !this.signupNickname ||
      !this.signupMoney ||
      !this.signupUserType
    ) {
      return undefined;
    }
    const signupResult = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify({
        signupEmail: this.signupEmail,
        signupPassword: this.signupPassword,
        signupNickname: this.signupNickname,
        signupMoney: this.signupMoney,
        signupUserType: this.signupUserType,
      }),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });
    const result = await signupResult.json();
    console.log(result);
    if (result === true) {
      return true;
    }
  };

  // login = async () => {
  //   if (!this.loginEmail || !this.loginPassword) {
  //     return undefined;
  //   }
  //   const loginResult = await fetch('http://localhost:3000/login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       loginUserEmail: this.loginEmail,
  //       loginUserPassword: this.loginPassword,
  //     }),
  //     headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  //   });
  //   const result = await loginResult.json();
  //   console.log(result);
  //   if (result.msg === '로그인 실패') {
  //     return undefined;
  //   } else {
  //     return {
  //       email: result.email,
  //       nickname: result.nickname,
  //       money: result.money,
  //       userType: result.userType,
  //     };
  //   }
  // };
  login = async () => {
    if (!this.loginEmail || !this.loginPassword) {
      return undefined;
    }
    const loginResult = await fetch(
      `http://localhost:3000/login?loginUserEmail=${this.loginEmail}&loginUserPassword=${this.loginPassword}`,
    );
    const result = await loginResult.json();
    console.log(result);
    if (result.msg === '로그인 실패') {
      console.log(result.msg);
      return undefined;
    } else {
      return {
        email: result.email,
        nickname: result.nickname,
        money: result.money,
        userType: result.userType,
      };
    }
  };
}

export default AuthScreen;
