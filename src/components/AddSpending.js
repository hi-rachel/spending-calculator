import React, { useState, useMemo, useEffect } from "react";
import "../index.css";

const getSum = (numbers) => {
  console.log("합계 계산 중");
  if (numbers.length === 0) return 0;
  const sum = numbers
    .map((item) => item.spending)
    .reduce((prev, cur) => prev + cur, 0);
  console.log(sum);
  return sum;
};

const AddSpending = () => {
  // 지출 항목
  const [spendingItems, setSpendingItems] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem("spending"));
    if (storedItems !== null) {
      return storedItems;
    } else return [];
  });

  const [inputItem, setInputItem] = useState("");

  // 지출 금액
  const [inputSpending, setInputSpending] = useState("");

  useEffect(() => {
    localStorage.setItem("spending", JSON.stringify(spendingItems));
  }, [spendingItems]);

  const onChangeItem = (e) => setInputItem(e.target.value);
  const onChangeSpending = (e) => setInputSpending(e.target.value);

  const onClick = () => {
    const nextSpending = spendingItems.concat({
      id: inputItem,
      text: inputItem,
      spending: parseInt(inputSpending),
      time: Date.now(),
    });
    const sortSpending = nextSpending.sort(function (a, b) {
      return b.time - a.time;
    });
    setSpendingItems(nextSpending);

    setInputItem("");
    setInputSpending("");
  };

  const onRemove = (id) => {
    if (window.confirm("정말 이 항목을 지울까요?") === true) {
      const nextSpending = spendingItems.filter((item) => item.id !== id);
      setSpendingItems(nextSpending);
    }
  };

  const spendingSum = useMemo(() => getSum(spendingItems), [spendingItems]);

  const spendigList = spendingItems.map((item) => (
    <>
      <div className="flex mb-2 justify-center" key={item}>
        <li>
          {item.text}: {item.spending}원
        </li>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
          onClick={() => onRemove(item.id)}
        >
          ⅹ
        </button>
      </div>
    </>
  ));
  return (
    <>
      <div>{}</div>
      <div className="flex flex-wrap justify-center align-middle mt-6 mb-6">
        <input
          type="text"
          value={inputItem}
          onChange={onChangeItem}
          className="px-4 py-3 rounded-full"
          placeholder="지출 항목"
        />
        <input
          type="number"
          value={inputSpending}
          onChange={onChangeSpending}
          className="px-4 py-3 rounded-full"
          placeholder="지출 금액"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClick}
        >
          추가
        </button>
      </div>
      <div className="container mx-auto shadow-lg w-1/2 rounded-md overflow-y-scroll p-6">
        <ul>{spendigList}</ul>
        <div className="flex justify-center mt-6">
          <b>총 지출: {spendingSum}원 </b>
        </div>
      </div>
    </>
  );
};

export default AddSpending;
