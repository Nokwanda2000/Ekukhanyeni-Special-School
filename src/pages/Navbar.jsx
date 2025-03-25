import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react'; 
import Logo from '/Ekukhanyeni Special School trpnt logo.png';

const Navbar = () => {
  const topBarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 2rem',
    backgroundColor: '#f3f4f6',
  };

  const logoStyles = {
    height: '80px',
  };

  const contactInfoStyles = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const contactGroupStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const contactHeaderStyles = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#4b5563',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
  };

  const contactItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
  };

  const navBarStyles = {
    padding: '1rem 2rem',
    backgroundColor: 'white',
    marginTop: '2rem',
  };

  const navListStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2.5rem',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
  };

  const navLinkStyles = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '600',
    fontSize: '1.450rem',
    padding: '0.5rem 1rem',
    transition: 'color 0.3s ease',
    letterSpacing: '0.5px',
    fontFamily: '"Poppins", sans-serif',
  };

  return (
    <div>
      <div style={topBarStyles}>
        {/* Logo */}
        <img src={Logo} alt="Logo" style={logoStyles} />

        {/* Contact Information */}
        <div style={contactInfoStyles}>
          <div style={contactGroupStyles}>
            <div style={contactHeaderStyles}>Call</div>
            <div style={contactItemStyles}>
              <Phone size={20} />
              <span>+27 33 398 1325</span>
            </div>
          </div>

          <div style={contactGroupStyles}>
            <div style={contactHeaderStyles}>Opening Hours</div>
            <div style={contactItemStyles}>
              <Clock size={20} />
              <span>Mon - Fri 7 AM - 3 PM</span>
            </div>
          </div>

          <div style={contactGroupStyles}>
            <div style={contactHeaderStyles}>Address</div>
            <div style={contactItemStyles}>
              <MapPin size={20} />
              <span>Mdoni Road, Edendale, Pietermaritzburg, KwaZulu Natal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={navBarStyles}>
        <nav>
          <ul style={navListStyles}>
            <li>
              <Link to="/" style={navLinkStyles}>Home</Link>
            </li>
            <li>
              <Link to="/AboutUspage" style={navLinkStyles}>About</Link>
            </li>
            <li>
              <Link to="/ProgrammesPage" style={navLinkStyles}>Programmes</Link>
            </li>
            <li>
              <Link to="/TeachingStaffPage" style={navLinkStyles}>Teaching Staff</Link>
            </li>
            <li>
              <Link to="/Contactpage" style={navLinkStyles}>Contacts</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
