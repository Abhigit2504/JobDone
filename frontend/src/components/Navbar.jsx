import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">JobDone</Link>
        <input type="text" placeholder="Search jobs..." className="search-bar" />
      </div>
      <div className="navbar-right">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/admin-login" className="nav-link">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;