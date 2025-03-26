import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Clock, Menu, X } from 'lucide-react';
import Logo from '/Ekukhanyeni Special School trpnt logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Color Palette
  const colors = {
    primary: '#1E40AF', // Deep blue
    secondary: '#2563EB', // Bright blue
    background: '#F3F4F6', // Light gray
    text: '#1F2937', // Dark gray
    white: '#FFFFFF',
  };

  // Responsive Container
  const containerStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1rem',
  };

  // Info Bar Styles
  const infoBarStyles = {
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.primary}`,
    padding: '1rem 0',
  };

  // Contact Info Styles
  const contactInfoStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  // Navigation Styles
  const navStyles = {
    backgroundColor: colors.white,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  const navContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
  };

  const navListStyles = {
    display: 'flex',
    gap: '1.5rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const navLinkStyles = {
    textDecoration: 'none',
    color: colors.text,
    fontWeight: 600,
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    transition: 'all 0.3s ease',
  };

  const activeLinkStyles = {
    backgroundColor: colors.primary,
    color: colors.white,
  };

  // Mobile Menu Styles
  const mobileMenuToggleStyles = {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  };

  // Responsive Menu
  const responsiveMenuStyles = {
    '@media (max-width: 768px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: colors.white,
      zIndex: 50,
      transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease-in-out',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      padding: '2rem',
    },
  };

  return (
    <header>
      {/* Info Bar */}
      <div style={infoBarStyles}>
        <div style={containerStyles}>
          <div style={contactInfoStyles}>
            {/* Logo */}
            <img 
              src={Logo} 
              alt="Ekukhanyeni Special School Logo" 
              style={{ height: '100px', objectFit: 'contain' }} 
            />

            {/* Contact Details */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={24} color={colors.secondary} />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Call Us</p>
                  <p style={{ margin: 0, color: colors.text }}>+27 33 398 1325</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={24} color={colors.secondary} />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Hours</p>
                  <p style={{ margin: 0, color: colors.text }}>Mon-Fri 7 AM - 3 PM</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={24} color={colors.secondary} />
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Location</p>
                  <p style={{ margin: 0, color: colors.text }}>Sutherlands Road, Pietermaritzburg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={navStyles}>
        <div style={{...containerStyles, ...navContainerStyles}}>
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            style={{
              ...mobileMenuToggleStyles,
              background: 'none', 
              border: 'none', 
              cursor: 'pointer'
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Menu */}
          <ul 
            style={{
              ...navListStyles,
              ...responsiveMenuStyles,
              '@media (min-width: 769px)': {
                flexDirection: 'row',
              }
            }}
          >
            {[
              { path: '/', label: 'Home' },
              { path: '/Eventspage', label: 'Events' },
              { path: '/TimetablesPage', label: 'Timetables' },
              { path: '/AboutUspage', label: 'About Us' },
              { path: '/ProgrammesPage', label: 'Our Programmes' },
              { path: '/Contactpage', label: 'Contact Us' }
            ].map(({ path, label }) => (
              <li key={path}>
                <Link 
                  to={path} 
                  style={{
                    ...navLinkStyles,
                    ...(location.pathname === path ? activeLinkStyles : {})
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;