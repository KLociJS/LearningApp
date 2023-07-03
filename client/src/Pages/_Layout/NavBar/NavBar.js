import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { LuBrainCircuit } from 'react-icons/lu'
import { FaBars, FaTimes } from 'react-icons/fa'
import { AiOutlineHome, AiOutlineUserAdd, AiOutlineLogin } from 'react-icons/ai'

import { IconContext } from 'react-icons/lib'

import './NavBar.css'


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const closeMobileMenu = () => setIsOpen(false);
    const handleClick = () => setIsOpen(!isOpen);

    return (
        <nav className='navbar'>
            <div className='navbar-container container'>
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    <LuBrainCircuit className='navbar-icon' />
                    Learn
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
                    <li className='nav-item nav-pc-align-left'>
                        <NavLink to='/' className={({isActive})=> 'nav-link' + (isActive ? " activated" : "")}>
                            <div className='centered-label'>
                                <AiOutlineHome className='mobile-icon' size={16}/>
                                Home
                            </div>
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                    <NavLink to='/signup' className={({isActive})=> 'nav-link' + (isActive ? " activated" : "")}>
                        <div className='centered-label'>
                            <AiOutlineUserAdd className='mobile-icon' size={16}/>
                            Singup
                        </div>
                    </NavLink>
                    </li>
                    <li className='nav-item'>
                    <NavLink to='/login' className={({isActive})=> 'nav-link' + (isActive ? " activated" : "")}>
                        <div className='centered-label'>
                            <AiOutlineLogin className='mobile-icon' size={16}/>
                            Login
                        </div>
                    </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
