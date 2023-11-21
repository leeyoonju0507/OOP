export type TFunc = (...args: any[]) => any;

const curry =
  (callback: TFunc) =>
  (...args: any[]) =>
    args.length >= callback.length
      ? callback(...args)
      : (...restArgs: any[]) => curry(callback)(...args, ...restArgs);

const curriedReduce = curry(
  async (callback: (acc: any[], value: any) => any, acc: any[], iterable: any[]) => {
    try {
      for (const value of iterable) {
        acc = await callback(acc, value);
      }
      return acc;
    } catch (e) {
      console.error(e);
      return acc;
    }
  },
);

const curriedGo = curry((initValues: any[]) => (funcs: TFunc[]) => {
  return curriedReduce(
    (acc: any | any[], func: TFunc) => (Array.isArray(acc) ? func(...acc) : func(acc)),
    initValues,
    funcs,
  );
});

export const pipe =
  (...funcs: TFunc[]) =>
  (...initValues: any[]) =>
    curriedGo(initValues)(funcs);
