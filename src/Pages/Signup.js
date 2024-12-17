import React from 'react'
import Header from '../components/Header/index.js'
import SignupSigninComponent from '../components/SignupSignin/index.js'
function Signup() {
  return (
    <div>
      <Header/>
      <div className='container'>
       <SignupSigninComponent/>
      </div>
    </div>
  )
}

export default Signup
