import React from 'react';
import { MapPin, Clock, Phone, User } from 'lucide-react';
import { Link } from "react-router-dom";

// Import images
import schoolLogo from '../../src/assets/Ekukhanyeni Logo 2.jpg';
import departmentLogo from '../../src/assets/Department of Educatiuon.jpg';
import UmgeniLogo from '../../src/assets/sponsor.jpg';
import mLabLogo from '../../src/assets/mlab-2017-results-infographic-.png'; 

const ClientFooter = () => {
  return (
    <footer style={{ backgroundColor: 'white', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        
        {/* School Info */}
        <div style={{ flex: '1 1 250px', marginBottom: '1rem' }}>
          <img 
            src={schoolLogo} 
            alt="School Logo" 
            style={{ height: '6rem', width: '6rem', objectFit: 'contain', marginBottom: '1rem' }}
          />
          <p style={{ fontSize: '1rem', color: '#4B5563', marginBottom: '1rem', lineHeight: '1.4' }}>
            We are committed to guide/help learners who are intellectually impaired to be socially, economically and spiritually independent.
          </p>
          <Link
            to="/CMS"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
            }}
          >
            <User size={16} />
            Staff Sign In
          </Link>
        </div>

        {/* Contact Info */}
        <div style={{ flex: '1 1 250px', marginBottom: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Phone size={20} color="#2563eb" />
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '1rem', color: '#000', margin: '0' }}>Call</h3>
                <p style={{ color: '#4B5563', fontSize: '0.9rem', margin: '0' }}>+27 33 398 1325</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock size={20} color="#2563eb" />
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '1rem', color: '#000', margin: '0' }}>Hours</h3>
                <p style={{ color: '#4B5563', fontSize: '0.9rem', margin: '0' }}>Mon - Fri 7 AM - 3 PM</p>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <MapPin size={20} color="#2563eb" />
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '1rem', color: '#000', margin: '0' }}>Address</h3>
                <p style={{ color: '#4B5563', fontSize: '0.9rem', margin: '0', lineHeight: '1.4' }}>
                  Mdoni Road, Edendale, Pietermaritzburg, KwaZulu Natal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ flex: '1 1 200px', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: '600', fontSize: '1rem', color: '#000', marginBottom: '0.75rem' }}>Quick Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {[
              { name: 'Home', link: '/' },
              { name: 'Events', link: '/events' },
              { name: 'Timetables', link: '/timetables' },
              { name: 'About Us', link: '/about' },
              { name: 'Programmes', link: '/programmes' },
              { name: 'Sponsors', link: '/sponsors' },
              { name: 'Contact', link: '/contact' },
            ].map((item, index) => (
              <a 
                key={index}
                href={item.link} 
                style={{ color: '#4B5563', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Map - Reduced size */}
        <div style={{ flex: '1 1 250px' }}>
          <iframe
            title="School Location Map"
            style={{
              width: '100%',
              height: '10rem',
              borderRadius: '0.375rem',
              border: '1px solid #d1d5db',
            }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.345376110522!2d30.342897775452723!3d-29.641601474064226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5d7db109f64b9%3A0x68eb66586c45506b!2sMdoni%20Rd%2C%20Edendale%2C%20Pietermaritzburg%2C%203211!5e0!3m2!1sen!2sza!4v1710000000000"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Partners/Sponsors - Reduced size */}
      <div style={{ maxWidth: '1100px', margin: '1.5rem auto 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          {[departmentLogo, UmgeniLogo, mLabLogo].map((logo, index) => (
            <img 
              key={index}
              src={logo} 
              alt={`Partner ${index + 1}`} 
              style={{ height: '5rem', objectFit: 'contain' }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;