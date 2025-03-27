import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sinup from './components/pages/Signup'
import LoginPage from './components/pages/Login'
import Addrecipe from './components/pages/Addrecipe'
import Home from './components/pages/Home'
import Singlerecipe from './components/pages/Singlerecipe'
import Profile from './components/pages/Profile'
import ViewRecipe from './components/pages/ViewRecipe'
import Editrecipe from './components/pages/Editrecipe'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Sinup/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/addrecipe' element={<Addrecipe/>} />
          <Route path='/viewsinglerecipe/:id' element={<Singlerecipe/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/viewrecipe' element={<ViewRecipe/>} />
          <Route path='/editrecipepage/:id' element={<Editrecipe/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
