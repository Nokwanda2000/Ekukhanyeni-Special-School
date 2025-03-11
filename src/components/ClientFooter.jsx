import React from 'react';
import { MapPin, Clock, Phone, User } from 'lucide-react';
import { Link } from "react-router-dom";

// Import images (ensure they are inside the 'src/assets' folder)
import schoolLogo from '../../src/assets/Ekukhanyeni Logo 2.jpg';
import departmentLogo from '../../src/assets/Department of Educatiuon.jpg';
import UmgeniLogo from '../../src/assets/sponsor.jpg';
import mLabLogo from '../../src/assets/mlab-2017-results-infographic-.png'; 

const ClientFooter = () => {
  return (
    <footer style={{ backgroundColor: 'white', padding: '2.5rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        
        {/* Left Column - School Info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '280px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <img 
              src={schoolLogo} 
              alt="School Logo" 
              style={{ height: '8rem', width: '8rem', objectFit: 'contain' }}
            />
          </div>
          <p style={{ fontSize: '1.1rem', color: '#4B5563', marginBottom: '1.5rem', lineHeight: '1.5' }}>
            We are committed to guide/help learners who are intellectually impaired to be socially, economically and spiritually independent.
          </p>
          <Link
            to="/CMS"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.25rem',
              borderRadius: '0.375rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
            }}
            aria-label="Staff Sign In"
          >
            <User size={20} />
            Staff Sign In
          </Link>
        </div>

        {/* Middle Column - Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ color: '#2563eb' }}>
              <Phone size={32} />
            </div>
            <div>
              <h3 style={{ fontWeight: '600', fontSize: '1.25rem', color: '#000', marginBottom: '0.375rem' }}>Call</h3>
              <p style={{ color: '#4B5563', fontSize: '1.1rem' }}>+27 33 398 1325</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ color: '#2563eb' }}>
              <Clock size={32} />
            </div>
            <div>
              <h3 style={{ fontWeight: '600', fontSize: '1.25rem', color: '#000', marginBottom: '0.375rem' }}>Operating Times</h3>
              <p style={{ color: '#4B5563', fontSize: '1.1rem' }}>Mon - Fri 7 AM - 3 PM</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
            <div style={{ color: '#2563eb' }}>
              <MapPin size={32} />
            </div>
            <div>
              <h3 style={{ fontWeight: '600', fontSize: '1.25rem', color: '#000', marginBottom: '0.375rem' }}>Address</h3>
              <p style={{ color: '#4B5563', fontSize: '1.1rem', lineHeight: '1.5' }}>
                Mdoni Road,<br />
                Edendale,<br />
                Pietermaritzburg,<br />
                KwaZulu Natal
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '180px' }}>
          <h3 style={{ fontWeight: '600', fontSize: '1.25rem', color: '#000', marginBottom: '1.25rem' }}>Quick Links</h3>
          <ul style={{ paddingLeft: '0', margin: '0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { name: 'Home', link: '/' },
              { name: 'Events', link: '/events' },
              { name: 'Timetables', link: '/timetables' },
              { name: 'About Us', link: '/about' },
              { name: 'Our Programmes', link: '/programmes' },
              { name: 'Sponsors', link: '/sponsors' },
              { name: 'Contact Us', link: '/contact' },
            ].map((item, index) => (
              <li key={index}>
                <a 
                  href={item.link} 
                  style={{ color: '#4B5563', fontSize: '1.1rem', textDecoration: 'none' }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Map Section */}
        <div style={{ flexGrow: 1, minWidth: '280px', maxWidth: '380px' }}>
          <iframe
            title="School Location Map"
            style={{
              width: '100%',
              height: '14rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
            }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.345376110522!2d30.342897775452723!3d-29.641601474064226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5d7db109f64b9%3A0x68eb66586c45506b!2sMdoni%20Rd%2C%20Edendale%2C%20Pietermaritzburg%2C%203211!5e0!3m2!1sen!2sza!4v1710000000000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Partners/Sponsors Section */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <img 
            src={departmentLogo} 
            alt="Department of Basic Education" 
            style={{ height: '7.5rem', objectFit: 'contain' }}
          />
          <img 
            src={UmgeniLogo}
            alt="Umgeni Water" 
            style={{ height: '7.5rem', objectFit: 'contain' }}
          />
          <img 
            src={mLabLogo} 
            alt="mLab Southern Africa" 
            style={{ height: '7.5rem', objectFit: 'contain' }}
          />
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;