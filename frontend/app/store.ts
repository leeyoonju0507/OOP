import AuthScreen, {IAuthScreen} from './auth-screen.js';
import HomeScreen from './home-screen.js';
import {ILoginData} from '../specification/interfaces';

class Store {
  private authScreen: IAuthScreen;
  private homeScreen: HomeScreen;
  //////////////////////////////
  private signupButton: HTMLElement;
  private loginButton: HTMLElement;
  // private registerOrBuyScreen: HTMLElement;
  // private selectScreen: HTMLElement;
  private showSignUpScreen: HTMLElement;
  private showLoginScreen: HTMLElement;
  private signupForm: HTMLElement;
  private loginForm: HTMLElement;

  constructor() {
    this.authScreen = new AuthScreen();
    this.homeScreen = new HomeScreen();

    this.signupButton = document.getElementById('signup-button') as HTMLElement;
    this.loginButton = document.getElementById('login-button') as HTMLElement;
    // this.registerOrBuyScreen = document.getElementById('register|Buy') as HTMLElement;

    // this.selectScreen = document.getElementById('select-screen') as HTMLElement;
    this.showSignUpScreen = document.getElementById('show-signup-screen') as HTMLElement;
    this.showLoginScreen = document.getElementById('show-login-screen') as HTMLElement;
    this.signupForm = document.getElementById('signup-form') as HTMLElement;
    this.loginForm = document.getElementById('login-form') as HTMLElement;
  }

  init() {
    this.showSignUpScreen.addEventListener('click', async () => {
      if (this.signupForm.style.display === 'block') {
        this.signupForm.style.display = 'none';
      } else if (this.signupForm.style.display === 'none') {
        this.loginForm.style.display = 'none';
        this.signupForm.style.display = 'block';
        this.signupButton.addEventListener('click', async () => {
          const signupResult = await this.authScreen.signUp();
          if (signupResult === undefined) {
            alert('회원 정보 다시 입력해주세요');
          } else {
            alert('회원가입 성공!');
          }
        });
      }
    });
    this.showLoginScreen.addEventListener('click', async () => {
      if (this.loginForm.style.display === 'block') {
        this.loginForm.style.display = 'none';
      } else if (this.loginForm.style.display === 'none') {
        this.signupForm.style.display = 'none';
        this.loginForm.style.display = 'block';
        this.loginButton.addEventListener('click', async () => {
          const loginResult = await this.authScreen.login();
          if (loginResult === undefined) {
            alert('아이디 또는 비밀번호를 다시 입력하세요');
          } else {
            this.loginForm.style.display = 'none';
            const checkLogout = await this.homeScreen.mainUI(loginResult);
            if (!checkLogout) {
              this.init();
            }
            // this.registerOrBuyScreen.style.display = 'block';
          }
        });
      }
    });
  }
}

export default Store;
