import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import moment from "moment";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import { addDoc, collection ,query,getDocs} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,db } from "../Firebase";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import { Input } from "antd";

function Dashboard() {

  
  const [user] = useAuthState(auth);

  const [isExpenseModalVisible, setisExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setisIncomeModalVisible] = useState(false);
  const [transactions , setTransactions] = useState([]);
  const [loading , setLoading] = useState(false);
  const [income , setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance , setBalance] = useState(0);
 
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


  useEffect(()=>{
    //get all documents 
    fetchTransactions();
  },[user])

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  const onFinish = (values,type)=>{
    const newTransaction = {
    type : type,
    date: moment(values.date).format("YYYY-MM-DD"),
    amount: parseFloat(values.amount),
    tag : values.tag,
    name: values.name,
   };
   setTransactions([...transactions, newTransaction]);
   setisExpenseModalVisible(false);
   setisIncomeModalVisible(false);
   addTransaction(newTransaction);
  };


  async function addTransaction(transaction) {
    try {
      const docref = await addDoc(
        collection(db,`users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID:", docref.id);
      toast.success("Transaction Added !");
      const newArray = transactions ;
      newArray.push(transaction);
      setTransactions(newArray)
      
    } catch (e) {
      console.log("error adding document",e);
      toast.error("Couldn't add transaction");
      
    }
  }

  useEffect(()=>{
    calculateBalance();
  },[transactions])

    function calculateBalance() {
      let incomeTotal = 0;
      let expenseTotal = 0;
      transactions.forEach((transaction)=>{
        if(transaction.type === "income"){
          incomeTotal += transaction.amount;
        }else{
          expenseTotal += transaction.amount;
        }
      })

      setIncome(incomeTotal);
      setExpense(expenseTotal);
      setBalance(incomeTotal - expenseTotal);
    }

  return (
    (loading?<p>Loading...</p>: <>
      <Header />
      <Cards
        income = {income}
        expense = {expense}
        balance = {balance}
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseModal={handleExpenseModal}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeModal={handleIncomeModal}
        onFinish={onFinish}
      />
    
      <TransactionTable transactions={transactions}></TransactionTable>
    </>)
    
  );
}

export default Dashboard;
