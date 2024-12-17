import React from 'react'
import './styles.css'
import {Card,Row} from "antd";
import Button from '../Button/index';
function Cards({showExpenseModal,showIncomeModal}) {

  return (
    <Row className='my-row' >
      <Card className= "my-card" title="Current Balance">
       <p>₹0</p>
       <Button text={"Recent Balance"} blue={true} ></Button>
      </Card>
      <Card className= "my-card" title="Total Income">
       <p>₹0</p>
       <Button text={"Add Income"} blue={true} onClick={showIncomeModal}></Button>
      </Card>
      <Card className= "my-card" title="Total Expenses">
       <p>₹0</p>
       <Button text={"Add Expense"} blue={true} onClick={showExpenseModal}></Button>
      </Card>
    </Row>
  )
}

export default Cards
