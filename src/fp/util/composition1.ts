// 1. 절차지향 프로그래밍
// 목표: 배열 numbers 내부의 모든 원소의 값을 3배하고 2을 더한 후 짝수만 골라서 합을 계산하라

export default () => {
  const numbers = [1, 2, 3];
  const newNumbers = [];

  for (let i = 0; i < numbers.length; i++) {
    let newValue = numbers[i] * 3;
    newValue = newValue + 2;
    if (newValue % 2 === 0) {
      newNumbers.push(newValue);
    }
  }

  let sum = 0;
  for (let i = 0; i < newNumbers.length; i++) {
    sum += newNumbers[i];
  }

  console.log(sum);
};
