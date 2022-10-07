import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import './index.css'
import FullPost from './pages/FullPost/FullPost'
import Home from './pages/Home/Home'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Header />
    <div className='wrapper max-w-6xl mx-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<FullPost />} />
      </Routes>
    </div>
  </BrowserRouter>
)
