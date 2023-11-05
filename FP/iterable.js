// 1. 이러터블 객체의 정의
// iterator() 메소드: 이터레이터 객체를 리턴

// 2. 이터레이터 객체의 정의
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
console.log(result.value);
result = iterator.next();
console.log(result.value);
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
