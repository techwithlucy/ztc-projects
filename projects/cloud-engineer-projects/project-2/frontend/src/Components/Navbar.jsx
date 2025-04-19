import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faChalkboardUser, 
  faBars, 
  faTimes, 
  faSignOutAlt, 
  faSignInAlt 
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authToken = localStorage.getItem("token");
  
  // Determine active page based on current path
  const currentPath = location.pathname;
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("profileImage");
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if a page is active
  const isActive = (path) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Website Logo" className="logo-image" />
          </Link>
        </div>
        
        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
        </div>
        
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            
            <li className={isActive('/courses') ? 'active' : ''}>
              <Link to="/courses" onClick={closeMobileMenu}>
                Courses
              </Link>
            </li>
            
            {authToken && (
              <>
                <li className={isActive('/profile') ? 'active' : ''}>
                  <Link to="/profile" onClick={closeMobileMenu}>
                    <span className="link-text">Profile</span>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                  </Link>
                </li>
                
                <li className={isActive('/learnings') ? 'active' : ''}>
                  <Link to="/learnings" onClick={closeMobileMenu}>
                    <span className="link-text">Learnings</span>
                    <FontAwesomeIcon icon={faChalkboardUser} className="icon" />
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          <div className="auth-buttons">
            {authToken ? (
              <button 
                onClick={handleLogOut} 
                className="btn btn-logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  navigate("/login");
                  closeMobileMenu();
                }}
                className="btn btn-login"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="icon" />
                <span>Login / Sign Up</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;