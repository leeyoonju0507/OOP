const add100After3Sec = (number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = number + 100;
      console.log(`3초가 지난 후 100을 더해보았다: ${result}`);
      resolve(result);
    }, 3000);
  });

async function task1(number) {
  console.log(`초기 숫자: ${number}`);
  const result = await add100After3Sec(number);
  console.log(`곱하기 2를 해보았다: ${result * 2}`);
}
async function task2() {
  console.log('4단계');
  console.log('5단계');
}

const runLoop = () => {
  task1(50);
  task2();
};

runLoop();
