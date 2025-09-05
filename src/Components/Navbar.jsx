import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeStyleLoader from './ThemeStyleLoader';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
  <ThemeStyleLoader/>
      {/* Overlay */}
      <div
        className={`offcanvas-menu-overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Offcanvas Menu */}
      <div className={`offcanvas-menu-wrapper ${menuOpen ? 'show-offcanvas-menu-wrapper' : ''}`}>
        <div className="canvas-close" onClick={() => setMenuOpen(false)}>
          <i className="fa fa-close"></i>
        </div>
        <div className="canvas-search search-switch">
          <i className="fa fa-search"></i>
        </div>
        
        {/* Mobile Navigation Menu - Match Original Theme */}
        <nav className="canvas-menu" style={{ display: 'block' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link
                to="/" 
                style={{ 
                  display: 'block', 
                  padding: '10px 0', 
                  color: '#151515', 
                  textDecoration: 'none',
                  borderBottom: '1px solid #151515',
                  fontWeight: 500,
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#f36100'}
                onMouseLeave={(e) => e.target.style.color = '#151515'}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="#" 
                style={{ 
                  display: 'block', 
                  padding: '10px 0', 
                  color: '#151515', 
                  textDecoration: 'none',
                  borderBottom: '1px solid #151515',
                  fontWeight: 500,
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#f36100'}
                onMouseLeave={(e) => e.target.style.color = '#151515'}
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="#" 
                style={{ 
                  display: 'block', 
                  padding: '10px 0', 
                  color: '#151515', 
                  textDecoration: 'none',
                  borderBottom: '1px solid #151515',
                  fontWeight: 500,
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#f36100'}
                onMouseLeave={(e) => e.target.style.color = '#151515'}
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link 
                to="/C" 
                style={{ 
                  display: 'block', 
                  padding: '10px 0', 
                  color: '#151515', 
                  textDecoration: 'none',
                  borderBottom: '1px solid #151515',
                  fontWeight: 500,
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#f36100'}
                onMouseLeave={(e) => e.target.style.color = '#151515'}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                to="/l" 
                style={{ 
                  display: 'block', 
                  padding: '10px 0', 
                  color: '#151515', 
                  textDecoration: 'none',
                  borderBottom: '1px solid #151515',
                  fontWeight: 500,
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#f36100'}
                onMouseLeave={(e) => e.target.style.color = '#151515'}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link 
                to="/r" 
                style={{ 
                  display: 'block', 
                  padding: '10px 0', 
                  color: '#151515', 
                  textDecoration: 'none',
                  borderBottom: '1px solid #151515',
                  fontWeight: 500,
                  fontFamily: '"Oswald", sans-serif',
                  fontSize: '15px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#f36100'}
                onMouseLeave={(e) => e.target.style.color = '#151515'}
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="canvas-social">
          <Link to="#"><i className="fa fa-facebook"></i></Link>
          <Link to="#"><i className="fa fa-twitter"></i></Link>
          <Link to="#"><i className="fa fa-youtube-play"></i></Link>
          <Link to="#"><i className="fa fa-instagram"></i></Link>
        </div>
      </div>

      {/* Header */}
      <header className="header-section">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="logo">
                <Link to="/">
                  <img src="/img/logo.png" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="nav-menu">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/ab">About Us</Link></li>
                  <li><Link to="/C">Contact</Link></li>
                  <li><Link to="/l">Login</Link></li>
                  <li><Link to="/r">Register</Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="top-option">
                <div className="to-search search-switch">
                  <i className="fa fa-search"></i>
                </div>
                <div className="to-social">
                  <Link to="#"><i className="fa fa-facebook"></i></Link>
                  <Link to="#"><i className="fa fa-twitter"></i></Link>
                  <Link to="#"><i className="fa fa-youtube-play"></i></Link>
                  <Link to="#"><i className="fa fa-instagram"></i></Link>
                </div>
              </div>
            </div>
          </div>

          {/* Hamburger icon */}
          <div className="canvas-open" onClick={() => setMenuOpen(true)}>
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;