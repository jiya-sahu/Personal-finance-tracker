import React, { useState } from "react";
import { Select, Table } from "antd";
import { Radio }from "antd";
import searchimg from "../../assets/search.svg"
import './styles.css'
import { unparse } from "papaparse";
import { parse } from "papaparse";
import { toast } from "react-toastify";




const TransactionTable = ({ transactions ,addTransaction,fetchTransactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypefilter] = useState("");
  const [sortKey, setSortkey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];
  let filteredTransaction = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransaction.sort((a,b)=>{
    if(sortKey === "date"){
      return new Date(a.date) - new Date(b.date);
    }else if(sortKey === "amount"){
      return a.amount - b.amount;
    }else return b;
  })


  function exportToCsv() {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: 10,
          // justifyContent:"space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
           <img src={searchimg} alt="searchimg"/>
         
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search by name"

          />
         
        </div>

        <Select  onChange={(value) => setTypefilter(value)} value={typeFilter} allowClear>
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>

        </div>

        
          <div
          style={
            {
               display:"flex",
               justifyContent:"space-between",
              alignItems: "center", 
              marginBottom:"1rem",
              padding:"1rem"
            }
          }>
         
          <h2>My Transactions</h2>
         
        <div>
        <Radio.Group onChange={(e)=>setSortkey(e.target.value)} value={sortKey}>
          <Radio.Button value="">No sort</Radio.Button>
          <Radio.Button value="date">Sort by date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        </div>
        <div
         style={{
          display:"flex",
          justifyContent:"center",
          gap: "1rem",
          width: "400px"
         }}>
           <button className="btn" onClick={exportToCsv}>Export to CSV</button>
           <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
        </div>
       
        </div>

       <Table dataSource={sortedTransactions} columns={columns} />
      
    
    </>
  );
};

export default TransactionTable;
