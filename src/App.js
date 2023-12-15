import React from 'react';
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Blogs from './components/Blogs';
import Userblogs from './components/Userblogs';
import Blogdetail from './components/Blogdetail';
import Addblog from './components/Addblog';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <BrowserRouter>
    <div className='App'>
     <header>
        <Header/>
     </header>
     <main>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup/>} />
     <Route path='/blogs' element={<Blogs/>} /> 
      <Route path='/myBlogs' element={<Userblogs/>} />
      <Route path='/myBlogs/:id' element={<Blogdetail/>}/>
      <Route path='/blogs/add' element={<Addblog/>} />
      </Routes>
     </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
