import React from 'react';
import ClientFooter from '../components/ClientFooter';
import { Link, Outlet } from 'react-router-dom';
import StrollToTop from '../components/StrollToTop';
import SponsorBanner from '../components/SponsorBanner';
import { MapPin, Phone, Clock, Underline } from 'lucide-react';

// Import your logo image - update the path as needed
import logo from '../assets/Ekukhanyeni Logo 2.jpg'; 

export default function Client() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Info Bar */}
      <div className="bg-gray-100 w-full py-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8">
          {/* Logo */}
          <div className="flex items-center mb-8 md:mb-0">
            <img src={logo} alt="Logo" className="h-30 ml-8" />
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Call */}
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2">
                <Phone className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-sm">Call</p>
                <p className="text-sm">+27 33 398 1325</p>
              </div>
            </div>
            
            {/* Operating Hours */}
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-sm">Operating Hours</p>
                <p className="text-sm">Mon - Fri 7 AM - 3 PM</p>
              </div>
            </div>
            
            {/* Address */}
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-sm">Address</p>
                <p className="text-sm">140m Road,</p>
                <p className="text-sm">Edendale,</p>
                <p className="text-sm">Pietermaritzburg,</p>
                <p className="text-sm">KwaZulu Natal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu - Updated with center alignment and proper spacing */}
     {/* Navigation Menu */}
     <div style={styles.navBar}>
        <div style={styles.navContainer}>
          <nav style={styles.navMenu}>
            <ul style={styles.navList}>
              <li style={styles.navItem}>
                <Link to="/" style={styles.navLink}>Home</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/Eventspage" style={{ ...styles.navLink, ...styles.activeLink }}>Events</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/TimetablesPage" style={styles.navLink}>Timetables</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/AboutUspage" style={styles.navLink}>About Us</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/ProgrammesPage" style={styles.navLink}>Our Programmes</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/Contactpage" style={styles.navLink}>Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <Outlet />
      </main>
      
      {/* Footer Components */}
      <SponsorBanner />
      <ClientFooter />
      <StrollToTop />
    </div>
  );
}

const styles = {
  clientContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  infoBar: {
    backgroundColor: '#f3f4f6',
    width: '100%',
    padding: '0.5rem 0',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logoContainer: {
    marginBottom: '1rem',
  },
  logo: {
    height: '4rem',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginLeft: '1rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  iconContainer: {
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    padding: '0.5rem',
  },
  icon: {
    width: '1.25rem',
    height: '1.25rem',
    color: 'white',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '0.875rem',
  },
  info: {
    fontSize: '0.875rem',
  },
  navBar: {
    borderBottom: '1px solid #e5e7eb',
  },
  navContainer: {
    width: '100%',
  },
  navMenu: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 0',
    
  },
  navList: {
    display: 'flex',
    gap: '1.5rem', // 24px space between nav items
    listStyle: 'none',
    padding: '0',
    
  },
  navItem: {},
  navLink: {
    padding: '0.75rem 1rem',
    fontWeight: '500',
    textDecoration: 'none',
    color: '#333',
    hover: {
      textDecoration: 'underline',
    },
  },
  activeLink: {
    hover: 'underline', // Active link indicator
  },
  
  mainContent: {
    flexGrow: 1,
    padding: '2rem',
  },
};

document.querySelectorAll('.navLink').forEach(link => {
  link.addEventListener('mouseover', (e) => {
    e.target.style.textDecoration = 'underline';
  });
  link.addEventListener('mouseout', (e) => {
    e.target.style.textDecoration = 'none';
  });
});