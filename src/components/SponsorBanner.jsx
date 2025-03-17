import React, { useState, useEffect } from 'react';
import { db } from '../utills/FirebaseConfig'; // Assuming firebase.js is in the same folder
import { addDoc, collection } from 'firebase/firestore';
import HandshakeIcon from '../assets/handshake.png';

// SponsorBanner component
const SponsorBanner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Add form data to Firestore
      await addDoc(collection(db, 'sponsors'), formData);
      setFormData({ name: '', email: '', phone: '' }); // Clear form after successful submission
      alert('Thank you for becoming a sponsor!');
    } catch (err) {
      setError('Error submitting your form. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    // maxWidth: '1000px',
    // borderRadius: '2rem',
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
    width: '100%', // Make button match the width of input
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
                  style={buttonStyle}
                  onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorBanner;
