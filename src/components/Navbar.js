import React from 'react'
import {Link} from 'react-router-dom' 
import Logo from '../assets/images/Logo.png'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar-container'>
        
            <Link to="/" className='logo-link'>
                <img src={Logo} alt='logo' className='logo'/>
            </Link>

            <div className='nav-links'>
                <Link to="/" className='nav-link home-link'>HOME</Link>
                <a href='#exercises' className='nav-link exercise-link'>EXERCISES</a>
            </div>

        </div>
    )
}

export default Navbar
