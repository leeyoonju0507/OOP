// 함수의 합성 1: 함수를 다른 함수의 파라미터로 사용해서 함수를 합성한다
// 목표: 배열 numbers 내부의 모든 원소의 값을 3배하고 2을 더한 후 짝수만 골라서 합을 계산하라

export default () => {
  type TFunc = (...args: any[]) => any;
  type TIterable = number[];

  let numbers = [1, 2, 3];

  const Map = (callback: TFunc, iterable: TIterable) => {
    const newArray = [];
    for (const value of iterable) {
      newArray.push(callback(value));
    }
    return newArray;
  };
  const Filter = (callback: TFunc, iterable: TIterable) => {
    let newArray = [];
    for (const value of iterable) {
      if (callback(value)) {
        newArray.push(value);
      }
    }
    return newArray;
  };
  const Reduce = (callback: TFunc, accumulate: number, iterable: TIterable) => {
    for (const value of iterable) {
      accumulate = callback(accumulate, value);
    }
    return accumulate;
  };

  numbers = Map((v) => v * 3, numbers);
  numbers = Map((v) => v + 2, numbers);
  numbers = Filter((v) => (v % 2 === 0 ? true : false), numbers);
  const sum = Reduce((acc, value) => acc + value, 0, numbers);

  console.log(sum);
};
