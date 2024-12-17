import React, { useEffect } from 'react'
import './styles.css'
import {auth} from '../../Firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if (user) {
      navigate('/dashboard');
    }else{
      navigate('/');
    }
  },[user,navigate])

  function logoutfunc() {
    try {
      if (user) {
        signOut(auth).then(() => {
          toast.success('SignedOut Successfully')
          navigate('/')
        }).catch((e) => {
          toast.error(e.message);
        });
      }
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className='navbar'>
      <p className='logo'>Financely</p>
      {user && <p className='logo link' onClick={logoutfunc}>Logout</p>}
    </div>
  )
}

export default  Header;
