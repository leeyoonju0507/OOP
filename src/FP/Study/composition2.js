// 함수의 합성 요령2

// 목표: 배열 numbers 내부의 모든 값을 2배하고 3을 더하자

// 단계1
// 함수의 결과로 함수를 리턴해서 평가(계산)을 지연시킨다
// 평가를 지연시키면 내가 원하는 순간에 계산할 수 있어서 메모리를 절약할 수 있다
let numbers = [1, 2, 3];
const customMap = (callback) => {
  return (array) => {
    const newArray = [];
    for (const value of array) {
      newArray.push(callback(value));
    }
    return newArray;
  };
};
const makeDouble = customMap((v) => {
  return v * 2;
});
numbers = makeDouble(numbers);
const addThree = customMap((v) => {
  return v + 3;
});
numbers = addThree(numbers);

const customReduce = (callback, accumulate, iterable) => {
  for (const value of iterable) {
    accumulate = callback(accumulate, value);
  }
  return accumulate;
};

// 단계5
// 합성된 다양한 함수들을 연쇄적으로 합성해서 재사용성을 높이는데 도움을 주는 함수 go 함수를 만든다
numbers = [1, 2, 3];
const go = (initData, ...args) => customReduce((acc, func) => func(acc), initData, args);
const finalResult = go(
  1,
  (v) => v * 2,
  (v) => v + 3,
);
console.log(finalResult);

// go의 평가를 지연해서 pipe를 얻는다
const pipe =
  (func, ...moreFunc) =>
  (...initData) =>
    go(func(...initData), ...moreFunc);

// 최종 결론
const composedFunction = pipe(
  (v) => v * 2,
  (v) => v + 3,
);
const finalFunc = customMap(composedFunction);
console.log(finalFunc([1, 2, 3]));
