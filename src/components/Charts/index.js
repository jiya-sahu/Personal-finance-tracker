import React from 'react'
import { Line ,Pie} from '@ant-design/charts';
import './styles.css'
import moment from "moment";
function Charts({sortedTransactions}) {
   
  let dataitem = sortedTransactions.map((item)=>{
    return {date:item.date , amount :item.amount}
})


  const config = {
    data:dataitem,
    width:800,
    height:300,
    xField: 'date',
    yField: 'amount',
  };

 
  let charts;
  

      return(
        <div className='charts-wrapper'>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
          <h2> Your Analytics</h2>
          <Line {...config} />;
          </div>
         
        </div>
        
      )
}

export default Charts
