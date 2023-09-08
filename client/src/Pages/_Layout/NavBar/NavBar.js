import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { logout } from '_Constants'

import { LuBrainCircuit } from 'react-icons/lu'
import { FaBars, FaTimes } from 'react-icons/fa'
import { AiOutlineHome, AiOutlineUserAdd, AiOutlineLogin } from 'react-icons/ai'
import { BiNotepad } from 'react-icons/bi'


import './NavBar.css'
import { AuthBasedRender, RoleBasedRender } from 'Components'
import { useLogout } from 'Hooks'


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const closeMobileMenu = () => setIsOpen(false)
    const handleClick = () => setIsOpen(!isOpen)

    const { handleLogout } = useLogout()

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
                    <RoleBasedRender allowedroles={['User']}>
                        <li className='nav-item'>
                            <NavLink to='/' className={({isActive})=> 'nav-link' + (isActive ? " activated" : "")}>
                                <div className='centered-label'>
                                    <AiOutlineHome className='mobile-icon' size={16}/>
                                    Home
                                </div>
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/article' className={({isActive})=> 'nav-link' + (isActive ? " activated" : "")}>
                                <div className='centered-label'>
                                        <BiNotepad className='mobile-icon' size={16}/>
                                        My Notes
                                </div>
                            </NavLink>
                        </li>
                    </RoleBasedRender>
                    <RoleBasedRender allowedroles={['Admin']}>
                        <li className='nav-item'>
                        <NavLink to='/users' className={({isActive})=> 'nav-link' + (isActive ? " activated" : "")}>
                            <div className='centered-label'>
                                <AiOutlineUserAdd className='mobile-icon' size={16}/>
                                Users
                            </div>
                        </NavLink>
                        </li>
                    </RoleBasedRender>
                    <RoleBasedRender allowedroles={['User', 'Admin', 'Moderator', 'Author']}>
                        <li className='nav-item nav-pc-align-right'>
                            <button className='nav-link' onClick={handleLogout}>
                                <div className='centered-label'>
                                    <AiOutlineUserAdd className='mobile-icon' size={16}/>
                                    Logout
                                </div>
                            </button>
                        </li>
                    </RoleBasedRender>
                    <AuthBasedRender>
                        <li className='nav-item nav-pc-align-right'>
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
                    </AuthBasedRender>
                </ul>
            </div>
        </nav>
    )
}
