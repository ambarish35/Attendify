import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import RegisterStudent from './components/RegisterStudent'
import TakeAttendance from './components/TakeAttendance'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/registerStudent' element={<RegisterStudent />} />
        <Route path='/attendance' element={<TakeAttendance />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App