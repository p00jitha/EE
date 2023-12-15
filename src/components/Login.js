import React,{useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { authActions } from "./store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
 const dispath=useDispatch();
 const navigate = useNavigate(); 
  const sendRequest = async () => {
    const res = await axios
      .post('http://localhost:5000/login', {
        username:username,
        password:password
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"));
  };

  return (
    <>
      <div className='container' >
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-outline mb-4"></div>
          <div className="form-outline mb-4"></div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">Username</label>
            <input type="text" id="form2Example1" className="form-control" placeholder='enter username' name='username' value={username} onChange={(e)=>setUsername(e.target.value)} autocomplete="off" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example2">Password</label>
            <input type="password" id="form2Example2" className="form-control" placeholder='enter password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="btn btn-danger btn-block mb-4">Register</button>
          <div className="row mb-4">
            <div className="row">
              <p>Already Registered?<a href="/login" style={{ color: '#C70039' }}>Login</a></p>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
