import React, { useState } from "react";
import { Flex, Select, Table } from "antd";
import { Radio }from "antd";
import searchimg from "../../assets/search.svg"
import './styles.css'
import Button from "../Button/index";


const TransactionTable = ({ transactions }) => {
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
    if(sortKey == "date"){
      return new Date(a.date) - new Date(b.date);
    }else if(sortKey == "amount"){
      return a.amount - b.amount;
    }else return b;
  })

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
           <img src={searchimg}/>
         
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
           <button className="btn">Export to CSV</button>
            <button className="btn">Import from CSV</button>
        </div>
       
        </div>

       <Table dataSource={sortedTransactions} columns={columns} />
      
    
    </>
  );
};

export default TransactionTable;
