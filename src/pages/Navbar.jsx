import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react'; // Import icons
import Logo from '/Ekukhanyeni Special School trpnt logo.png';

const Navbar = () => {
  // State to handle mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const infoBarStyles = {
    backgroundColor: '#f3f4f6',
    width: '100%',
    padding: '0.5rem 0',
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const infoItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const infoTextStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
  };

  const navBarStyles = {
    borderBottom: '1px solid #e5e7eb',
    padding: '1rem 0',
    backgroundColor: '#f3f4f6',
  };

  const navContainerStyles = {
    width: '100%',
  };

  const navMenuStyles = {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 0',
  };

  const navListStyles = {
    display: 'flex',
    gap: '1.5rem', // 24px space between nav items
    listStyle: 'none',
    padding: '0',
  };

  const navItemStyles = {};

  const navLinkStyles = {
    padding: '0.75rem 1rem',
    fontWeight: '500',
    textDecoration: 'none',
    color: '#333',
  };

  const activeLinkStyles = {
    textDecoration: 'underline',
  };

  const mobileMenuStyles = {
    display: isMenuOpen ? 'block' : 'none',
    backgroundColor: '#f3f4f6',
  };

  return (
    <div>
      {/* Info Bar with Logo and Contact Information */}
      <div style={infoBarStyles}>
        <div style={containerStyles}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', marginLeft: '2rem' }}>
            <img src={Logo} alt="Logo" style={{ height: '120px' }} />
          </div>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Call */}
            <div style={infoItemStyles}>
              <div style={{ borderRadius: '50%', padding: '0.5rem', backgroundColor: '#e5e7eb' }}>
                <Phone style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
              </div>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Call</p>
                <p style={infoTextStyles}>+27 33 398 1325</p>
              </div>
            </div>

            {/* Operating Hours */}
            <div style={infoItemStyles}>
              <div style={{ borderRadius: '50%', padding: '0.5rem', backgroundColor: '#e5e7eb' }}>
                <Clock style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
              </div>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Operating Hours</p>
                <p style={infoTextStyles}>Mon - Fri 7 AM - 3 PM</p>
              </div>
            </div>

            {/* Address */}
            <div style={infoItemStyles}>
              <div style={{ borderRadius: '50%', padding: '0.5rem', backgroundColor: '#e5e7eb' }}>
                <MapPin style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
              </div>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Address</p>
                <p style={infoTextStyles}>Sutherlands Road</p>
                <p style={infoTextStyles}>Masons Mill</p>
                <p style={infoTextStyles}>Pietermaritzburg</p>
                <p style={infoTextStyles}>3201</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1f2937', color: 'white' }}>
        <button onClick={toggleMenu} style={{ color: 'white', background: 'none', border: 'none', fontSize: '1rem' }}>
          {isMenuOpen ? 'Close Menu' : 'Open Menu'}
        </button>
      </div>

      {/* Navigation Menu */}
      <div style={mobileMenuStyles}>
        <div style={navContainerStyles}>
          <nav>
            <ul style={navListStyles}>
              <li style={navItemStyles}>
                <Link to="/" style={navLinkStyles}>Home</Link>
              </li>
              <li style={navItemStyles}>
                <Link to="/Eventspage" style={{ ...navLinkStyles, ...activeLinkStyles }}>Events</Link>
              </li>
              <li style={navItemStyles}>
                <Link to="/TimetablesPage" style={navLinkStyles}>Timetables</Link>
              </li>
              <li style={navItemStyles}>
                <Link to="/AboutUspage" style={navLinkStyles}>About Us</Link>
              </li>
              <li style={navItemStyles}>
                <Link to="/ProgrammesPage" style={navLinkStyles}>Our Programmes</Link>
              </li>
              <li style={navItemStyles}>
                <Link to="/Contactpage" style={navLinkStyles}>Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
