import React from 'react'
import Habit from './Dashboard/Habit/habit'
import Alerts from './Dashboard/Alerts/Alerts'
import Users from './Dashboard/Users/Users'
import Login from './Auth/Login/Login'
import Home from './Dashboard/Home/Home'
import Test from './Components/Test'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
function App() {
  return (
    <div className='flex  w-full h-[100vh] '>
      <Sidebar />
      <div className='w-[80%]'>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/habits' element={<Habit/>}/>
        <Route path='/alerts' element= {<Alerts/>}/>
      </Routes>
      </div>

    </div>
  )
}

export default App