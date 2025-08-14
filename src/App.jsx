import { useState,useEffect } from 'react'
import './App.css'

import Navbar from './Navbar'
import Teams from './Teams'
import Footer from './Footer'
function App() {
  

  return (
    <>
     <div className='container-fluid bg-light p-0 m-0'>
      <Navbar/>
      <Teams/>
      <Footer />
     </div>
    </>
  )
}

export default App
