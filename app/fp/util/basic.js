// 1. 함수 ...args
function func1(...args) {
  // args는 배열이다
  return args[0];
}
func1(1, 2, 3);

// 2. 익명 함수
// func1과 func2는 거의 같다
const func2 = (...args) => {
  return args[0];
};
func2(1, 2, 3);

// 3. 익명 함수 줄여 쓰기
// 함수 내부에 리턴을 제외하고 다른 코드가 없다면 func2를 다음과 같이 줄여 쓸 수 있다
const func3 = (...args) => args[0];
func3(1, 2, 3);

// 4. 삼항 연산자
// func4는 func5로 줄여 쓸 수 있다
const func4 = (x) => {
  if (x % 2 === 0) {
    return '짝수';
  } else {
    return '홀수';
  }
};
func4(10);
const func5 = (x) => {
  return x % 2 === 0 ? '짝수' : '홀수';
};
func5(10);

// 5. 불변성
const func6 = (x) => {
  x += 1;
  return x;
};

let myNumber = 1;
myNumber = func6(myNumber);
console.log(myNumber);

const func7 = (obj) => {
  myObj.x = 2;
};

const myObj = {
  x: 1,
};
func7(myObj);
console.log(myObj.x);
