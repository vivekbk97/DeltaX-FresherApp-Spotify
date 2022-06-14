import React from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import CreateSong from './pages/CreateSong'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Protect from './Protect'

function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='home' element={<Protect Page={HomePage} />} />
        <Route path='createSong' element={<Protect Page={CreateSong} />} />
      </Routes>
    </div>
  )
}

export default App
