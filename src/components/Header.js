import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/images/logo512.png'; // Adjust if your logo is elsewhere
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={logo} alt="Fortune Builders Logo" className="logo-img" />
        <h1 className="logo-text">Fortune Builders</h1>
      </div>

      <nav className="nav-links">
        <Link to="/launchpad">Launchpad</Link>
        <Link to="/keystone">Keystone</Link>
        <Link to="/fortune">Fortune</Link>
      </nav>
    </header>
  );
};

export default Header;
