import React from 'react'
import { useEffect } from 'react';
import '../assets/style/navbar.css'
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  useEffect(()=>{
    console.log(location)
},[location])
  return (
    <>
    <h1>{location.path}</h1>
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">StreamPad</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse like" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={`nav-link ${location.path === '/home' ? 'active' : ''}`} aria-current="page" to="/" >Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.path === '/features' ? 'active' : ''}`} aria-current="page" to="/feature" >Features</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.path === '/howWork' ? 'active' : ''}`} to="/howWork">How it works</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link ${location.path === '/blog' ? 'active' : ''}`} to="/blog">Blog</NavLink>
        </li>

{/* ============================================ */}
      </ul>
      <ul className="navbar-nav  ">
       
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Log in</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Get started free</NavLink>
        </li>

      </ul>

      
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar