const curry = (originFunc) => (callback, arr) => {
  if (arr.length !== 0) {
    originFunc(callback, arr);
  } else {
    return (arr) => originFunc(callback, arr);
  }
};
const delayFilter = curry(Filter);
const delayMap = curry(Map);
