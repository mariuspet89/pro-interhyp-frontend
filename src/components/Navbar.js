import React from 'react'
import '../styles/navbar.css'
import Logo from '../styles/accesa_white.jpg'
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    let search=null;
    if(location.pathname==="/") 
        search=(<div className='right'>
                        <input type='text'/>
                    </div>);
    let navbar = (
        <div className="navbar">
        <div className='left'>
            <a  href='/'><img src={Logo} alt='logo'/></a>
            <a href='/' className='links'>Users</a>
            <a href='/departments' className='links'>Departments</a>
        </div>
        {search}
        </div>
    )
    return (
      <div>
        {navbar}
      </div>
    )
  
            
}

export default Navbar