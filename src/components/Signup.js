import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Header from './Header';
function Signup() {
  const divStyle={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    minHeight:'90vh',
    color:'blue'
  }
  const loginStyle={
    width:'450px',
    height:'550px',
    display:'flex',
    flexDirection:'column',
    padding:'30px 25px 30px 25px',
    boxShadow:'5px 5px 5px 5px blue'
  }
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate(); 

  const sendRequest = async () => {
    const res = await axios
      .post('http://localhost:5000/signup', {
        email:email,
        username:username,
        password:password,
        blogs:[]
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      sendRequest()
        .then(() => navigate("/login"));
  };


  return (
    <>
      <div className='container' >
        <Header/>
        <div className='container' style={divStyle}>
        <div className='box' style={loginStyle}>
        <form onSubmit={handleSubmit}>
          <h1>Signup</h1>
          <div className="form-outline mb-4"></div>
          <div className="form-outline mb-4"></div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">Email address</label>
            <input type="email" id="form2Example1" className="form-control" placeholder='enter email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} autocomplete="off" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">Username</label>
            <input type="text" id="form2Example1" className="form-control" placeholder='enter username' name='username' value={username} onChange={(e)=>setUsername(e.target.value)} autocomplete="off" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example2">Password</label>
            <input type="password" id="form2Example2" className="form-control" placeholder='enter password' value={password} onChange={(e)=>setPassword(e.target.value)} name='password' />
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
          <div className="row mb-4">
            <div className="row">
              <p>Already Registered?<a href="/login" style={{ color: 'blue' }}>Login</a></p>
            </div>
          </div>
        </form>
        </div>
        </div>
      </div>
    </>
  )
}
export default Signup
