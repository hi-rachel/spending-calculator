import React from "react";
const MainHeader = () => {
  const handleRemoveAll = () => {
    if (window.confirm("정말 모든 지출 항목을 지우시겠습니까?") === true) {
      localStorage.removeItem("spending");
      window.location.reload();
    }
  };
  return (
    <>
      <button
        className="bg-white hover:shadow-lg py-2 px-6 rounded mx-1 opacity-40"
        onClick={handleRemoveAll}
      >
        모두 지우기
      </button>
      <div className="flex justify-center text-xl font-semibold mt-10">
        <h1 className="text-center">
          <b>용돈 기입장 🧾</b>
        </h1>
      </div>
    </>
  );
};

export default MainHeader;
