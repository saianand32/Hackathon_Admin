import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Logo from "../../Assets/logo.png"

function Header() {
  return (
    <div className='navHeader'>
      <div className='navLogo'>
        <Link to="/"><img src={Logo} alt="" width="40px" height="40px" /></Link>
        <h4  >DPhi</h4>
      </div>
    </div>
  )
}

export default Header
