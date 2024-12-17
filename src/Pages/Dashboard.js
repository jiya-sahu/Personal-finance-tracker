import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";

function Dashboard() {
  const [isExpenseModalVisible, setisExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setisIncomeModalVisible] = useState(false);

  const showExpenseModal = () => {
    setisExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setisIncomeModalVisible(true);
  };
  const handleExpenseModal = () => {
    setisExpenseModalVisible(false);
  };
  const handleIncomeModal = () => {
    setisIncomeModalVisible(false);
  };

  const onFinish = (values,type)=>{
    console.log("on finish");
    console.log(values);
    console.log(type);
 
  }
  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseModal}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeModal}
        onFinish={onFinish}
      />
    </div>
  );
}

export default Dashboard;
