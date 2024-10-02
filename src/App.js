import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Pages/Signup.js'
import Dashboard from './Pages/Dashboard.js'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Signup/>}/>
      <Route path='/dashboard' element = {<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
