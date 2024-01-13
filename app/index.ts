import {inputReceiver} from './input';
// import Database from './oop/database/database';
// import Store from './oop/ui/store';
import Database from './fp/database/database';
import createAuthScreen, {IAuthScreen} from './fp/ui/auth-screen';
import HomeScreen, {IHomeScreen} from './fp/ui/home-screen';
import {init} from './fp/ui/store';
import composition1 from './fp/util/composition1';
import composition2 from './fp/util/composition2';
import composition3 from './fp/util/composition3';

const doExample = async () => {
  console.log('==================================================');
  console.log('inputReceiver 예제를 실행합니다');
  const name = await inputReceiver('이름을 입력하세요: ');
  const age = await inputReceiver('나이를 입력하세요: ');

  console.log(`입력받은 이름: ${name}, 입력받은 나이: ${age}`);
  console.log();

  // database 사용법
  console.log('database 예제를 실행합니다');
  const db = new Database();
  await db.writeCSV('example.csv', `${name},${age}`);
  const readContents = await db.readCSV('example.csv');
  console.log('example.csv에서 읽어온 콘텐츠: ', readContents);
  console.log('example.csv 파일을 열어보세요');
  console.log('==================================================');
};

const main = async () => {
  // await doExample();

  // oop
  // const store = new Store();
  // await store.init();

  // 함수형 프로그래밍 연습
  composition1();
  composition2();
  composition3();

  // fp
  // const authScreen: IAuthScreen = createAuthScreen();
  // const homeScreen: IHomeScreen = new HomeScreen();
  // await init(authScreen, homeScreen);
};

main();
