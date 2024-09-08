import { useState } from 'react'
import './App.css'
import Header from './Pages/Header'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default App
