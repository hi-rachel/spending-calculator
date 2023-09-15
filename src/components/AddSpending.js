import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import "../index.css";
import { getSum } from "./CalculateSum";

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
  const inputEl = useRef(null);

  useEffect(() => {
    localStorage.setItem("spending", JSON.stringify(spendingItems));
  }, [spendingItems]);

  // useCallback을 이용해 컴포넌트가 처음 렌더링될 때만 함수 생성
  const onChangeItem = useCallback((e) => {
    setInputItem(e.target.value);
  }, []);

  const onChangeSpending = useCallback((e) => {
    setInputSpending(e.target.value);
  }, []);

  // [] 안에 상태값이 바뀌었을 때만 새로 작동
  const onClick = useCallback(() => {
    const nextSpending = spendingItems.concat({
      id: inputItem,
      text: inputItem,
      spending: parseInt(inputSpending),
      time: Date.now(),
    });
    // 내림차순
    nextSpending.sort(function (a, b) {
      return b.time - a.time;
    });
    setSpendingItems(nextSpending);

    setInputItem("");
    setInputSpending("");

    inputEl.current.focus();
  }, [inputItem, inputSpending, spendingItems]);

  const onRemove = (id) => {
    if (window.confirm("정말 이 항목을 지울까요?") === true) {
      const nextSpending = spendingItems.filter((item) => item.id !== id);
      setSpendingItems(nextSpending);
    }
  };

  // useMemo를 사용해 렌더링하는 과정 중 지츨 값이 바뀌었을 때만 연산을 실행하도록 최적화
  // 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식
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
          ref={inputEl}
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
