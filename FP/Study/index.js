// const delaySquare = (x) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       return resolve(x * x);
//     }, 1000);
//   });
// };
//
// const add = (a, b) => {
//   return a + b;
// };
//
// console.time();
// L.go([1, 2, 3, 4, 5, 6, 7, 8, 9], L.map(delaySquare), L.take(5), L.reduce(add), console.log, () =>
//   console.timeEnd(),
// );
//
// console.time();
// L.go([1, 2, 3, 4, 5, 6, 7, 8, 9], L.map(delaySquare), C.take(5), L.reduce(add), console.log, () =>
//   console.timeEnd(),
// );
