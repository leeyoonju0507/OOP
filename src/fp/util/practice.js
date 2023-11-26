const func = (X) => {
  return X.map((x) => x * 2).reduce((acc, cur) => acc + cur, 0);
};
// console.log(func([1, 2, 3]));
// console.log(func([4, 5, 6]));

const curry =
  (originFunc) =>
  (...args) => {
    if (originFunc.length === args.length) {
      return originFunc(...args);
    } else {
      return (...args2) => curry(originFunc)(...args, ...args2);
    }
  };

const Map = curry((callback, arr) => {
  const result = [];
  for (const a of arr) {
    result.push(callback(a));
  }
  return result;
});

const Filter = curry((callback, arr) => {
  const result = [];
  for (const a of arr) {
    if (callback(a)) {
      result.push(a);
    }
  }
  return result;
});

const Reduce = curry((callback, initData, arr) => {
  let result = initData;
  for (const a of arr) {
    result = callback(result, a);
  }
  return result;
});

const go = (arr, ...callbacks) => {
  return Reduce((acc, func) => func(acc), arr, callbacks);
};

const result = go(
  [1, 2, 3, 4, 5],
  Map((a) => a * 3),
  Filter((a) => a % 2 === 0),
  Reduce((acc, cur) => acc + cur, 0),
);

console.log(result);
