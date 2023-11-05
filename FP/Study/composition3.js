// 함수의 합성 요령3

// 목표: 배열 numbers 내부의 모든 값을 2배하고 3을 더하자

// 커리
// 평가 지연을 쉽게 만들어주는 추상적인 함수

const curry =
  (callback1) =>
  (callback2, ...args) =>
    args.length ? callback1(callback2, ...args) : (...args) => callback1(callback2, ...args);

// 커리를 적용한 다양한 추상 함수들
const curriedMap = curry((callback, iterable) => {
  let result = [];
  for (const el of iterable) {
    result.push(callback(el));
  }
  return result;
});
const curriedFilter = curry((callback, iterable) => {
  let result = [];
  for (const el of iterable) {
    if (callback(el)) {
      result.push(el);
    }
  }
  return result;
});
const curriedReduce = curry((callback, acc, iterable) => {
  if (!iterable) {
    iterable = acc[Symbol.iterator]();
    acc = iterable.next().value;
  } else {
    iterable = iterable[Symbol.iterator]();
  }
  for (const el of iterable) {
    acc = callback(acc, el);
  }
  return acc;
});
const curriedGo = curry((initData, ...args) =>
  curriedReduce((acc, func) => func(acc), initData, args),
);
const curriedPipe = curry(
  (f, ...fs) =>
    (...as) =>
      curriedGo(f(...as), ...fs),
);

const result = curriedMap((v) => v * 2);
console.log(result([1, 2, 3]));

// 최종 결론
// 최종 버전
const composedFunction = curriedPipe(
  (v) => v * 2,
  (v) => v + 3,
);
const finalFunc = curriedMap(composedFunction);
console.log(finalFunc([1, 2, 3]));
