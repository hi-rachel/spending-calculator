export const validateInput = (inputItem, inputSpending) => {
  let error = "";
  if (!inputItem) {
    error = "지출 항목을 작성해 주세요.";
  }
  if (!inputSpending) {
    error = "지출 금액(숫자)을 작성해 주세요.";
  }
  if (!inputItem & !inputSpending) {
    error = "지출을 입력해 주세요.";
  }
  if (inputItem && inputSpending) {
    return true;
  } else {
    alert(error);
  }
};
