// const add100After3Sec = (number) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const result = number + 100;
//       console.log(`3초가 지난 후 100을 더해보았다: ${result}`);
//       resolve(result);
//     }, 3000);
//   });
//
// async function task1(number) {
//   console.log(`초기 숫자: ${number}`);
//   const result = await add100After3Sec(number);
//   console.log(`곱하기 2를 해보았다: ${result * 2}`);
// }
// async function task2() {
//   console.log('4단계');
//   console.log('5단계');
// }
//
// const runLoop = () => {
//   task1(50);
//   task2();
// };
//
// runLoop();

setTimeout(() => {
  setTimeout(() => {
    console.log('드디어 끝');
  }, 3000);
}, 5000);

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    resolve(`api 응답 결과: ${1}`);
  });
};
fetch('http://naver.com')
  .then((res) => {})
  .then((res) => {})
  .then((res) => {})
  .catch((e) => {
    console.log(e);
  });

async function test() {
  const x1 = await new Promise();
  const x2 = await new Promise();
  const x3 = await new Promise();
  const x4 = await new Promise();
  const x5 = await new Promise();
}
