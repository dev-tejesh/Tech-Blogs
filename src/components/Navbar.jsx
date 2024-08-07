// import React from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleClick = () => {
    logout();
    navigate('/login')
  };

  return (
    <nav>
      <label htmlFor="check" className="logo">TechBlogs</label>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <FaBars />
      </label>
      {user ? (
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" activeClassName="active">
              Create Post
            </NavLink>
          </li>
          <li>
            <NavLink to="/myblogs" activeClassName="active">
              My Blogs
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/profile" activeClassName="active">
              Profile
            </NavLink>
          </li> */}
          <li>
            <button onClick={handleClick}>Log out</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
