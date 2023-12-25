import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Blogs from './components/Blogs';
import Userblogs from './components/Userblogs';
import Blogdetail from './components/Blogdetail';
import Addblog from './components/Addblog';
import { useSelector } from 'react-redux';
import Home from './components/Home'
import Sample from './components/Sample'

function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <BrowserRouter>
    <div className='App'>
     <main>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sample" element={<Sample />} />
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
