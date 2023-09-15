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
  const handleChangeItem = useCallback((e) => {
    setInputItem(e.target.value);
  }, []);

  const handleChangeSpending = useCallback((e) => {
    setInputSpending(e.target.value);
  }, []);

  const handleClick = useCallback(() => {
    if (validateInput(inputItem, inputSpending) === true) {
      const nextSpending = spendingItems.concat({
        id: inputItem,
        text: inputItem,
        spending: parseInt(inputSpending),
        time: Date.now(),
      });
      nextSpending.sort(function (a, b) {
        return b.time - a.time;
      });
      setSpendingItems(nextSpending);

      setInputItem("");
      setInputSpending("");

      inputEl.current.focus();
    }
  }, [inputItem, inputSpending, spendingItems]);

  const handleRemove = (id) => {
    if (window.confirm("정말 이 항목을 지울까요?") === true) {
      const nextSpending = spendingItems.filter((item) => item.id !== id);
      setSpendingItems(nextSpending);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const validateInput = (inputItem, inputSpending) => {
    let error = "";
    if (!inputItem) {
      error = "지출 항목을 작성해 주세요.";
    }
    if (!inputSpending) {
      error = "지출 금액을 작성해 주세요.";
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
          onClick={() => handleRemove(item.id)}
        >
          ⅹ
        </button>
      </div>
    </>
  ));
  return (
    <>
      <div
        className="flex flex-wrap justify-center align-middle mt-6 mb-6"
        onKeyDown={handleKeyDown}
      >
        <input
          type="text"
          value={inputItem}
          onChange={handleChangeItem}
          className="px-4 py-3 rounded-full"
          placeholder="지출 항목"
          ref={inputEl}
          required
        />
        <input
          type="number"
          value={inputSpending}
          onChange={handleChangeSpending}
          className="px-4 py-3 rounded-full"
          placeholder="지출 금액"
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
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
