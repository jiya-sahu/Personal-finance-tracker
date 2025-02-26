import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Pages/Signup.js'
import Dashboard from './Pages/Dashboard.js'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Signup/>}/>
      <Route path='/dashboard' element = {<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
