import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import "../index.css";
import { getSum } from "./helper/getSum";
import { validateInput } from "./helper/validateInput";
import EditableText from "./EditableText";
import EditableSpending from "./EditableSpending";

const AddSpending = () => {
  // 지출 항목
  const [spendingItems, setSpendingItems] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem("spending"));
    if (storedItems !== null) {
      return storedItems;
    } else return [];
  });

  // 지출 -(false), 수입 +(true)
  const [plusMinus, SetPlusMinus] = useState(false);

  const [inputItem, setInputItem] = useState("");
  // 지출 금액
  const [inputSpending, setInputSpending] = useState("");
  const inputEl = useRef(null);

  const [showAlert, setShowAlert] = useState(false);
  const [removeAlert, setRemoveAlert] = useState(false);

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
        plusMinus: plusMinus,
        id: Date.now(),
        text: inputItem,
        spending: parseInt(inputSpending),
        time: new Date().toISOString().split("T")[0],
      });
      nextSpending.sort(function (a, b) {
        return b.id - a.id;
      });
      setSpendingItems(nextSpending);

      setInputItem("");
      setInputSpending("");

      inputEl.current.focus();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [inputItem, inputSpending, spendingItems, plusMinus]);

  const handleRemove = useCallback(
    (id) => {
      if (window.confirm("정말 이 항목을 지울까요?") === true) {
        const nextSpending = spendingItems.filter((item) => item.id !== id);
        setSpendingItems(nextSpending);
        setRemoveAlert(true);
        setTimeout(() => setRemoveAlert(false), 3000);
      }
    },
    [spendingItems]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  // useMemo를 사용해 렌더링하는 과정 중 지츨 값이 바뀌었을 때만 연산을 실행하도록 최적화
  // 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식
  const spendingSum = useMemo(() => getSum(spendingItems), [spendingItems]);

  const spendigList = spendingItems.map((item) => (
    <>
      <div className="px-2 py-4 flex items-center relative rounded">
        <div className="flex-1 grow mb-2 items-start" key={item}>
          <p className="opacity-40 break-keep w-fit mr-2 absolute left-0 top-0">
            ({item.time})
          </p>
          <li className="flex mt-3 cursor-pointer" key={crypto.randomUUID()}>
            <EditableText initialText={item.text} id={item.id} />
            <EditableSpending
              initialSpending={item.spending}
              id={item.id}
              plusMinus={item.plusMinus}
            />
          </li>
        </div>
        <button
          className="ml-2 h-10 flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        <div>
          <div onClick={() => SetPlusMinus(true)}>✚</div>
          <div onClick={() => SetPlusMinus(false)}>﹣</div>
        </div>
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
      {showAlert && (
        <div className="success-alert font-semibold text-center p-1.5 container rounded-md bg-cyan-100 mb-2 mx-auto w-1/2">
          성공적으로 추가되었습니다.
        </div>
      )}
      {removeAlert && (
        <div className="success-alert font-semibold text-center p-1.5 container rounded-md bg-cyan-100 mb-2 mx-auto w-1/2">
          성공적으로 삭제되었습니다.
        </div>
      )}
      <div className="container mx-auto shadow-lg w-1/2 rounded-md p-6">
        <ul>{spendigList}</ul>
        <div className="flex justify-center mt-6 break-all text-center">
          <b>총 지출: {spendingSum} 원 </b>
        </div>
      </div>
    </>
  );
};

export default AddSpending;
