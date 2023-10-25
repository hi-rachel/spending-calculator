export const getSum = (numbers) => {
  console.log("합계 계산 중");
  let sum = 0;
  numbers.forEach((item) => {
    if (item.plusMinus === true) {
      sum += item.spending;
    } else if (item.plusMinus === false) {
      sum -= item.spending;
    }
  });
  return sum;
};
