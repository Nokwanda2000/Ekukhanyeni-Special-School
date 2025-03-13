import React from 'react';

const SignIn = () => {
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'white',
    position: 'relative',
    backgroundImage: "url('../../src/assets/signin bg.png')", // Change to your actual image path
    backgroundSize: 'cover',
  };

  // Circle decoration styles
  const circleStyles = {
    position: 'absolute',
    borderRadius: '50%',
  };

  // Top right orange circle
  const topOrangeCircle = {
    backgroundColor: '#FFA500',
    height: '4rem',
    width: '4rem',
    top: '5rem',
    right: '25%',
  };

  // Bottom right orange circle (half visible)
  const bottomOrangeCircle = {
    backgroundColor: '#FFA500',
    height: '6rem',
    width: '6rem',
    bottom: '-1rem',
    right: '30%',
  };

  // Large yellow circle on left
  const largeYellowCircle = {
    backgroundColor: '#FFDD00',
    height: '8rem',
    width: '8rem',
    top: '7rem',
    left: '20%',
  };

  // Blue striped circles
  const stripedCircleLeft = {
    height: '7rem',
    width: '7rem',
    bottom: '5rem',
    left: '15%',
    background: 'repeating-linear-gradient(45deg, #007BFF, #007BFF 10px, #f0f8ff 10px, #f0f8ff 20px)',
    borderRadius: '50%',
  };

  const stripedCircleTop = {
    height: '5rem',
    width: '5rem',
    top: '10%',
    left: '25%',
    background: 'repeating-linear-gradient(45deg, #007BFF, #007BFF 10px, #f0f8ff 10px, #f0f8ff 20px)',
    borderRadius: '50%',
  };

  // Form container styles
  const formContainerStyles = {
    width: '100%',
    maxWidth: '28rem',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem', // Add padding for better spacing
    borderRadius: '10px', // Optional: Rounded corners
  
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  

  // Title and subtitle styles
  const titleStyles = {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#000',
  };

  const subtitleStyles = {
    fontSize: '1.125rem',
    color: '#8D8D00',
    marginBottom: '1.5rem',
  };

  // Logo styles
  const logoStyles = {
    width: '10rem',
    height: 'auto',
    marginBottom: '2rem',
  };

  // Input styles
  const inputStyles = {
    width: '100%',
    padding: '1rem',
    marginBottom: '1rem',
    border: 'none',
    borderRadius: '0.375rem',
    backgroundColor: '#f0f0f0',
    fontSize: '1rem',
  };

  // Button styles
  const buttonStyles = {
    width: '100%',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '0.5rem',
  };

  return (
    <div style={containerStyles}>
      {/* Background Decorative Elements */}
     

      {/* Form Content */}
      <div style={formContainerStyles}>
      <img
          src="../../src/assets/Ekukhanyeni Logo 2.jpg"
          alt="School Logo"
          style={logoStyles}
        />

        <h1 style={titleStyles}>Sign In</h1>
        <p style={subtitleStyles}>Welcome please sign in...</p>
        <div style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Email address"
            style={inputStyles}
          />
          <input
            type="password"
            placeholder="Password"
            style={inputStyles}
          />
          <button style={buttonStyles}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;