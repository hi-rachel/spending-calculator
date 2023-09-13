import React from "react";
import MainHeader from "../components/MainHeader";
import AddSpendingItems from "../components/AddSpending";
// import AddSpending from "../components/AddSpending";
// import CalculateSpending from "../components/CalculateSpending";

const Home = () => {
  return (
    <div>
      <>
        <MainHeader />
        <AddSpendingItems />
      </>
    </div>
  );
};

export default Home;
