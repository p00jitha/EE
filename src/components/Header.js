import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const Header = () => {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn)
  return (
    <>
     <div className="container">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <Link to='/login' className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">EXPROLE&EXPRESS
      </Link>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
       {isLoggedIn &&  <><li><Link to='/blogs' className="nav-link px-2 link-secondary">ALL BLOGS</Link></li> 
        <li><Link to='/myBlogs' className="nav-link px-2 link-dark">MY BLOGS</Link></li></> }
      </ul>

      <div className="col-md-3 text-end">
      {!isLoggedIn && <><Link to='/login'><button type="button" className="btn btn-outline-primary me-2">Login</button></Link>
      <Link to='/signup'><button type="button" className="btn btn-primary">Signup</button></Link> </> }
     {isLoggedIn && <Link to='/logout'><button type="button" className="btn btn-outline-primary me-2">Logout</button></Link> }
      </div>
    </header>
  </div>
    </>
  )
}

export default Header
