import React, { useState, useEffect } from 'react';
import HandshakeIcon from '../assets/handshake.png';

const SponsorBanner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '2rem 0',
  };

  const bannerStyle = {
    display: 'flex',
    width: '100%',
    maxWidth: '1000px',
    borderRadius: '2rem',
    overflow: 'hidden',
    background: 'linear-gradient(to right, #FBBF24, #10B981, #3B82F6)',
    padding: '1rem',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    flexDirection: 'column',
  };

  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0 3rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const leftSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '1rem',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'black',
    paddingTop: '1.5rem',
    marginRight: '2rem',
  };

  const iconStyle = {
    marginBottom: '0.8rem',
    width: '4rem',
    height: '4rem',
    fill: 'black',
  };

  const formStyle = {
    flex: 1,
    width: '100%',
  };

  // Dynamic grid style for responsiveness
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', // 1 column for small screens, 2 for larger screens
    gap: '1rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    backgroundColor: 'rgba(254, 240, 138, 0.8)',
    border: '1px solid #ffff',
    color: 'black',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#3B82F6',
    color: 'white',
    fontWeight: 500,
    borderRadius: '0.375rem',
    transition: 'background-color 0.2s',
    border: '1px solid black',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2563EB',
  };

  return (
    <div style={containerStyle}>
      <div style={bannerStyle}>
        <div style={contentStyle}>
          {/* Left side with title and icon */}
          <div style={leftSectionStyle}>
            <h2 style={titleStyle}>
              Become A<br />Sponsor
            </h2>
            <div style={{ marginTop: '0.75rem' }}>
              <img src={HandshakeIcon} alt="Handshake" style={iconStyle} />
            </div>
          </div>

          {/* Form elements */}
          <div style={formStyle}>
            <div style={gridStyle}>
              <input type="text" placeholder="Name" style={inputStyle} />
              <input type="email" placeholder="Email" style={inputStyle} />
              <input type="tel" placeholder="Phone Number" style={inputStyle} />
              <button
                type="submit"
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorBanner;
