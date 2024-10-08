import './App.css'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Login } from './Pages/Login'
import { Dashboard } from './Pages/Dashboard'
import { SendMoney } from './Pages/SendMoney'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>

    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/sendMoney/:id' element={<SendMoney/>}/>

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
