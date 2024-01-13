// 함수의 합성 2: 함수가 함수를 리턴하면 함수의 평가를 지연시킬 수 있다
// 목표: 배열 numbers 내부의 모든 원소의 값을 3배하고 2을 더한 후 짝수만 골라서 합을 계산하라

export default () => {
  type TFunc = (...args: any[]) => any;
  type TIterable = number[];

  const curry =
    (originalFunc: TFunc) =>
    (...args: any[]) =>
      args.length >= originalFunc.length
        ? originalFunc(...args)
        : (...restArgs: any[]) => curry(originalFunc)(...args, ...restArgs);

  // curry를 사용해서 평가 지연
  const curriedMap = curry((callback: TFunc, iterable: TIterable) => {
    const newArray = [];
    for (const value of iterable) {
      newArray.push(callback(value));
    }
    return newArray;
  });
  const curriedFilter = curry((callback: TFunc, iterable: TIterable) => {
    let newArray = [];
    for (const value of iterable) {
      if (callback(value)) {
        newArray.push(value);
      }
    }
    return newArray;
  });
  const curriedReduce = curry((callback: TFunc, accumulate: any, iterable: TIterable) => {
    for (const value of iterable) {
      accumulate = callback(accumulate, value);
    }
    return accumulate;
  });

  const go = (data: any, ...funcs: TFunc[]) => curriedReduce((acc: any, func: TFunc) => func(acc), data, funcs);

  // curry를 쓰지 않고 평가 지연
  const pipe =
    (func: TFunc, ...moreFunc: TFunc[]) =>
    (...data: any[]) =>
      go(func(...data), ...moreFunc);

  const composed = pipe(
    curriedMap((v: number) => v * 3),
    curriedMap((v: number) => v + 2),
    curriedFilter((v: number) => (v % 2 === 0 ? true : false)),
    curriedReduce((acc: number, value: number) => acc + value, 0),
  );

  const sum = composed([1, 2, 3]);
  console.log(sum);
};
