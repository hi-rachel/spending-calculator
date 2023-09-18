export const getSum = (numbers) => {
  console.log("합계 계산 중");
  if (numbers.length === 0) return 0;
  const sum = numbers
    .map((item) => item.spending)
    .reduce((prev, cur) => prev + cur, 0);
  console.log(sum);
  return sum;
};
