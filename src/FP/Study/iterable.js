// 1. 이러터블 객체
// iterator() 메소드: 이터레이터 객체를 리턴

// 2. 이터레이터 객체
// iterator() 메소드: 자기 자신을 리턴
// next() 메소드: value와 done을 리턴

// 1, 2, 3, 4, 5 차례대로 출력해보자

// 방법1
const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// 방법2
const iterator = numbers[Symbol.iterator]();
let result = iterator.next();
console.log(result);
result = iterator.next();
console.log(result);
for (const number of iterator) {
  // iterator 객체의 next 함수를 사용해서 작동한다
  console.log(number);
}

const newJeans = new Map();
newJeans.set('김민지', 100000000);
newJeans.set('강해린', 50000000);
newJeans.set('팜하니', 10000000);
// 방법1
for (let i = 0; i < newJeans.size; i++) {
  // 응...?
}

// 방법2
const iter = newJeans[Symbol.iterator]();
console.log(iter.next());
for (const keyValue of iter) {
  console.log(keyValue[0], keyValue[1]);
}

class User {
  GetName() {
    return '권지용';
  }
}
const user1 = new User();
console.log(user1.GetName());
console.log(User.prototype.GetName());

const user2 = {
  GetName() {
    return '권권권';
  },
};
const user3 = {
  GetName: () => {
    return '권권권';
  },
};

console.log(user1);
console.log(user2.GetName());
console.log(user3);

// 이터러블 객체4: 사용자 정의 이터러블
const myIterable1 = {
  [Symbol.iterator]() {
    let i = 5;
    return {
      next() {
        return i === 0 ? {done: true} : {value: i--, done: false};
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};
const iterator4 = myIterable1[Symbol.iterator]();
console.log(iterator4.next());
console.log(iterator4.next());
console.log(iterator4.next());
for (const el of myIterable1) {
  console.log(el);
}

// 이터러블 객체4: 제러레이터 함수를 사용한 사용자 정의 이터러블
function* generator1() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

const myIterable2 = generator1();
const iterator5 = myIterable2[Symbol.iterator]();
console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.next());
for (const el of myIterable2) {
  console.log(el);
}

function* generator2(limit) {
  for (let i = 1; i <= limit; i++) {
    yield i;
  }
}

const myIterable3 = generator2(10000);
const iterator6 = myIterable3[Symbol.iterator]();
console.log(iterator6.next());
console.log(iterator6.next());
console.log(iterator6.next());
for (const el of myIterable3) {
  console.log(el);
}
