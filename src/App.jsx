import React from 'react'
import Habit from './Dashboard/Habit/habit'
import Alerts from './Dashboard/Alerts/Alerts'
import Users from './Dashboard/Users/Users'
import Login from './Auth/Login/Login'
import Home from './Dashboard/Home/Home'
import Test from './Components/Test'
import { Routes,Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Login/>}/>
        <Route path='/' element={<Test/>}/>
        <Route path='/habits' element={<Habit/>}/>
        <Route path='/alerts' element= {<Alerts/>}/>
      </Routes>

    </div>
  )
}

export default App