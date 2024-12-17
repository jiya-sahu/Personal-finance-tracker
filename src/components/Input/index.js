import React from 'react'
import './styles.css'
function Input({label,state,setState,type,placeholder}) {
  return (
    <div className='input-wrapper'>
      <p className='label-input'>{label}</p>
      <input 
      value={state} 
      type={type}
      placeholder={placeholder}
      onChange={(e)=>setState(e.target.value)}
      className='custom-input'/>
    </div>
  )
}

export default Input
