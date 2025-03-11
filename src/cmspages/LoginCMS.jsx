import React from 'react';

const SignIn = () => {
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'white',
    position: 'relative',
  };

  const backgroundStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '50%',
    overflow: 'hidden',
  };

  const circleStyles = {
    position: 'absolute',
    borderRadius: '50%',
  };

  const largeYellowCircle = {
    backgroundColor: '#f59e0b', // yellow-500
    height: '8rem',
    width: '8rem',
    top: '-2.5rem',
    left: '-2.5rem',
  };

  const largeBlueCircle = {
    backgroundColor: '#3b82f6', // blue-500
    height: '8rem',
    width: '8rem',
    bottom: '0',
    right: '2.5rem',
    opacity: 0.25,
  };

  const mediumOrangeCircle = {
    backgroundColor: '#fb923c', // orange-300
    height: '4rem',
    width: '4rem',
    top: '2.5rem',
    right: '2.5rem',
  };

  const smallBlueCircle = {
    backgroundColor: '#93c5fd', // blue-200
    height: '3rem',
    width: '3rem',
    bottom: '2.5rem',
    left: '5rem',
    opacity: 0.5,
  };

  const formWrapperStyles = {
    backgroundColor: '#f3f4f6', // gray-100
    borderRadius: '0.5rem', // rounded-lg
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-md
  };

  const formContainerStyles = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-lg
    width: '100%',
    maxWidth: '28rem', // max-w-md equivalent
  };

  const titleStyles = {
    fontSize: '2.25rem', // text-4xl
    fontWeight: '700', // font-bold
    textAlign: 'center',
    marginBottom: '1rem',
  };

  const subtitleStyles = {
    fontSize: '1.125rem', // text-lg
    color: '#4b5563', // gray-600
    marginBottom: '2rem',
    textAlign: 'center',
  };

  const inputStyles = {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    border: '1px solid #d1d5db', // border-gray-300
    borderRadius: '0.375rem', // rounded
  };

  const buttonStyles = {
    width: '100%',
    backgroundColor: '#2563eb', // blue-500
    color: 'white',
    padding: '0.5rem',
    borderRadius: '0.375rem', // rounded
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // transition duration-300
  };

  const hoverStyles = {
    backgroundColor: '#1d4ed8', // blue-700 on hover
  };

  return (
    <div style={containerStyles}>
      {/* Background Circles */}
      <div style={backgroundStyles}>
        <div style={{ ...circleStyles, ...largeYellowCircle }}></div>
        <div style={{ ...circleStyles, ...largeBlueCircle }}></div>
        <div style={{ ...circleStyles, ...mediumOrangeCircle }}></div>
        <div style={{ ...circleStyles, ...smallBlueCircle }}></div>
      </div>

      {/* Centered content */}
      <div style={formContainerStyles}>
        <h1 style={titleStyles}>Sign In</h1>
        <p style={subtitleStyles}>Welcome please sign in...</p>

        <img
  src="../../src/assets/Ekukhanyeni Logo 2.jpg"
  alt="Logo"
  className="mb-6"
  style={{
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '150px', // Adjust the width as needed
    height: 'auto', // Maintain the aspect ratio
  }}
/>


        <div style={formWrapperStyles}>
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
          <button
            style={buttonStyles}
            onMouseEnter={(e) => e.target.style.backgroundColor = hoverStyles.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'} // revert to original
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
