import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Menu, X } from 'lucide-react';
import Logo from '/Ekukhanyeni Special School trpnt logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar - Contact Information */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="contact-info">
            <div className="contact-group">
              <div className="contact-header">Call</div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+27 33 398 1325</span>
              </div>
            </div>

            <div className="contact-group">
              <div className="contact-header">Opening Hours</div>
              <div className="contact-item">
                <Clock size={16} />
                <span>Mon - Fri 7 AM - 3 PM</span>
              </div>
            </div>

            <div className="contact-group">
              <div className="contact-header">Address</div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Mdoni Road, Edendale, Pietermaritzburg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-nav">
        <div className="nav-content">
          {/* Logo */}
          <Link to="/" className="logo-link">
            <img src={Logo} alt="Ekukhanyeni Special School Logo" className="logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/Eventspage" className="nav-link">Events</Link>
              </li>
              <li className="nav-item">
                <Link to="/TimetablesPage" className="nav-link">Timetables</Link>
              </li>
              <li className="nav-item">
                <Link to="/AboutUsPage" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/Programmespage" className="nav-link">Programmes</Link>
              </li>
              <li className="nav-item">
                <Link to="/Contactpage" className="nav-link">Contacts</Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/Eventspage" className="mobile-nav-link" onClick={toggleMobileMenu}>Events</Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/TimetablesPage" className="mobile-nav-link" onClick={toggleMobileMenu}>Timetables</Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/AboutUsPage" className="mobile-nav-link" onClick={toggleMobileMenu}>About Us</Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/Programmespage" className="mobile-nav-link" onClick={toggleMobileMenu}>Programmes</Link>
            </li>
            <li className="mobile-nav-item">
              <Link to="/Contactpage" className="mobile-nav-link" onClick={toggleMobileMenu}>Contacts</Link>
            </li>
          </ul>
        </nav>
      </div>

      <style jsx>{`
        :root {
          --primary-color: #2563eb;
          --primary-hover: #1d4ed8;
          --text-color: #1f2937;
          --text-light: #6b7280;
          --bg-color: #ffffff;
          --topbar-bg: #f3f4f6;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --transition: all 0.3s ease;
        }

        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          transition: var(--transition);
        }

        .navbar-container.scrolled {
          box-shadow: var(--shadow);
        }

        .scrolled .top-bar {
          display: none;
        }

        .scrolled .main-nav {
          padding: 0.75rem 2rem;
        }

        /* Top Bar Styles */
        .top-bar {
          background-color: var(--topbar-bg);
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .top-bar-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .contact-info {
          display: flex;
          justify-content: flex-end;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .contact-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .contact-header {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-color);
        }

        .contact-item svg {
          color: var(--primary-color);
        }

        /* Main Navigation */
        .main-nav {
          background-color: var(--bg-color);
          padding: 1.25rem 2rem;
          transition: var(--transition);
          position: relative;
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .logo-link {
          display: flex;
          align-items: center;
          min-width: fit-content;
        }

        .logo {
          height: 80px;
          width: auto;
          transition: var(--transition);
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: block;
          flex-grow: 1;
        }

        .nav-list {
          display: flex;
          justify-content: flex-end;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
          white-space: nowrap;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-color);
          font-weight: 500;
          font-size: 1.1rem;
          padding: 0.5rem 0;
          transition: var(--transition);
          position: relative;
        }

        .nav-link:hover {
          color: var(--primary-color);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background-color: var(--primary-color);
          transition: var(--transition);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-color);
          padding: 0.5rem;
          z-index: 1001;
        }

        /* Mobile Navigation */
        .mobile-nav {
          display: none;
          background-color: var(--bg-color);
          width: 100%;
          position: absolute;
          left: 0;
          top: 100%;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index: 999;
          transform: translateY(-10px);
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .mobile-nav.open {
          display: block;
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 1rem 0;
        }

        .mobile-nav-item {
          border-bottom: 1px solid #f3f4f6;
        }

        .mobile-nav-link {
          display: block;
          padding: 1.25rem 2rem;
          text-decoration: none;
          color: var(--text-color);
          font-weight: 500;
          font-size: 1.1rem;
          transition: var(--transition);
        }

        .mobile-nav-link:hover {
          background-color: #f9fafb;
          color: var(--primary-color);
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .contact-info {
            gap: 1.5rem;
          }
          
          .nav-list {
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .top-bar-content {
            padding: 0 1rem;
          }

          .contact-info {
            justify-content: center;
            gap: 1rem;
          }

          .contact-group {
            align-items: center;
            text-align: center;
          }

          .main-nav {
            padding: 1rem;
          }

          .logo {
            height: 70px;
          }

          .desktop-nav {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .mobile-nav {
            display: none;
          }

          .mobile-nav.open {
            display: block;
          }
        }

        @media (max-width: 480px) {
          .contact-info {
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }

          .contact-group {
            width: 100%;
          }

          .contact-item span {
            font-size: 0.8rem;
          }

          .logo {
            height: 60px;
          }

          .mobile-nav-link {
            padding: 1rem 1.5rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
