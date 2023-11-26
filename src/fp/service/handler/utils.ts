export type TFunc = (...args: any[]) => any;
type TIterable = number[];

const curry =
  (originalFunc: TFunc) =>
  (...args: any[]) =>
    args.length >= originalFunc.length
      ? originalFunc(...args)
      : (...restArgs: any[]) => curry(originalFunc)(...args, ...restArgs);

const curriedReduce = curry(async (callback: TFunc, accumulate: any, iterable: TIterable) => {
  try {
    for (const value of iterable) {
      accumulate = await callback(accumulate, value);
    }
    return accumulate;
  } catch (e) {
    console.error(e);
    return accumulate;
  }
});

const go = (data: any, ...funcs: TFunc[]) =>
  curriedReduce((acc: any, func: TFunc) => func(acc), data, funcs);

export const pipe =
  (func: TFunc, ...moreFunc: TFunc[]) =>
  (...data: any[]) =>
    go(func(...data), ...moreFunc);
