import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { AiOutlineHome, AiOutlineLogin, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BiNotepad } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuBrainCircuit } from "react-icons/lu";

import { AuthBasedRender, RoleBasedRender } from "Components";
import { useAuth } from "Hooks";
import NavSearchBar from "./Components/SearchBar/NavSearchBar";
import useLogout from "./Hooks/useLogout";
import "./NavBar.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMobileMenu = () => setIsOpen(false);
  const handleClick = () => setIsOpen(!isOpen);

  const { handleLogout } = useLogout();

  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <LuBrainCircuit className="navbar-icon" />
          WDN
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
              <div className="centered-label">
                <AiOutlineHome className="mobile-icon" size={16} />
                Home
              </div>
            </NavLink>
          </li>
          <RoleBasedRender allowedRoles={["User"]}>
            <li className="nav-item">
              <NavLink
                to="/article"
                className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                <div className="centered-label">
                  <BiNotepad className="mobile-icon" size={16} />
                  My Notes
                </div>
              </NavLink>
            </li>
          </RoleBasedRender>
          <RoleBasedRender allowedRoles={["Admin"]}>
            <li className="nav-item">
              <NavLink
                to="/users"
                className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                <div className="centered-label">
                  <AiOutlineUserAdd className="mobile-icon" size={16} />
                  Users
                </div>
              </NavLink>
            </li>
          </RoleBasedRender>
          <RoleBasedRender allowedRoles={["Admin", "Moderator"]}>
            <li className="nav-item">
              <NavLink
                to="/moderation-dashboard"
                className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                <div className="centered-label">
                  <AiOutlineUserAdd className="mobile-icon" size={16} />
                  Moderation
                </div>
              </NavLink>
            </li>
          </RoleBasedRender>
          <NavSearchBar />
          <RoleBasedRender allowedRoles={["User", "Admin", "Moderator", "Author"]}>
            <li className="nav-item nav-pc-align-right">
              <NavLink
                to={`profile/${user?.userName}`}
                className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                <div className="centered-label">
                  <AiOutlineUser className="mobile-icon" size={16} />
                  Profile
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                <div className="centered-label">
                  <AiOutlineUserAdd className="mobile-icon" size={16} />
                  Logout
                </div>
              </button>
            </li>
          </RoleBasedRender>
          <AuthBasedRender>
            <li className="nav-item nav-pc-align-right">
              <NavLink
                to="/signup"
                className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                <div className="centered-label">
                  <AiOutlineUserAdd className="mobile-icon" size={16} />
                  Signup
                </div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
                <div className="centered-label">
                  <AiOutlineLogin className="mobile-icon" size={16} />
                  Login
                </div>
              </NavLink>
            </li>
          </AuthBasedRender>
        </ul>
      </div>
    </nav>
  );
}
