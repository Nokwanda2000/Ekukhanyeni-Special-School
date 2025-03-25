import React, { useState, useEffect } from 'react';
import { db } from '../utills/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import HandshakeIcon from '/handshake.png';

const SponsorBanner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'sponsors'), {
        ...formData,
        timestamp: new Date().toISOString()
      });
      setFormData({ name: '', email: '', phone: '' });
      alert('Thank you for becoming a sponsor!');
    } catch (err) {
      setError('Error submitting your form. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Main container styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: isMobile ? '1rem' : '2rem',
  };

  // Banner styles
  const bannerStyle = {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    background: 'linear-gradient(to right, #FBBF24, #10B981, #3B82F6)',
    borderRadius: '20px',
    padding: isMobile ? '1.5rem' : '2rem',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '1.5rem' : '3rem',
  };

  // Left section styles
  const leftSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    flex: isMobile ? '0 0 auto' : '0 0 30%',
  };

  const titleStyle = {
    fontSize: isMobile ? '1.5rem' : '2rem',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '1rem',
    lineHeight: '1.2',
  };

  const iconStyle = {
    width: isMobile ? '3rem' : '4rem',
    height: isMobile ? '3rem' : '4rem',
  };

  // Form styles
  const formStyle = {
    flex: 1,
    width: '100%',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: '1rem',
    alignItems: 'end'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: 'black',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    marginBottom: '0'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3B82F6',
    color: 'white',
    fontWeight: '600',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    height: '100%',
    boxSizing: 'border-box',
    // Removed gridColumn to make it align with phone number
  };

  return (
    <div style={containerStyle}>
      <div style={bannerStyle}>
        {/* Left section with title and icon */}
        <div style={leftSectionStyle}>
          <h2 style={titleStyle}>Become A Sponsor</h2>
          <img src={HandshakeIcon} alt="Handshake" style={iconStyle} />
        </div>

        {/* Right section with form */}
        <div style={formStyle}>
          <form onSubmit={handleSubmit}>
            <div style={gridStyle}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                style={inputStyle}
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                style={inputStyle}
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                style={inputStyle}
                required
              />
              <button
                type="submit"
                style={{
                  ...buttonStyle,
                  // Position it next to phone number on desktop
                  gridColumn: isMobile ? '1' : '2',
                  // Align with the phone input
                  marginTop: isMobile ? '0' : '0'
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#2563EB')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#3B82F6')}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SponsorBanner;