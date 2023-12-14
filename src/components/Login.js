import React from 'react'

const Login = () => {
  return (
    <>
      <div className='container' >
        <form >
          <h1>Login</h1>
          <div className="form-outline mb-4"></div>
          <div className="form-outline mb-4"></div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">Email address</label>
            <input type="email" id="form2Example1" className="form-control" placeholder='enter email' name='email' autocomplete="off" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example1">Username</label>
            <input type="text" id="form2Example1" className="form-control" placeholder='enter username' name='username' autocomplete="off" />
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" for="form2Example2">Password</label>
            <input type="password" id="form2Example2" className="form-control" placeholder='enter password' name='password' />
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
