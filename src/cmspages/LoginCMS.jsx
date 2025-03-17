import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfQfe_LO3LiCr9UiLhuAwaAB16K2HToxI",
  authDomain: "ekukhanyeni-73230.firebaseapp.com",
  projectId: "ekukhanyeni-73230",
  storageBucket: "ekukhanyeni-73230.firebasestorage.app",
  messagingSenderId: "94881707429",
  appId: "1:94881707429:web:4f5a4160d3515676b8e44c",
  measurementId: "G-J4WBLBPNMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already signed in, redirect to dashboard
        navigate('/UsersCMS');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully:', userCredential.user);
      
      // Redirect to dashboard after successful login
      navigate('/UsersCMS');
    } catch (error) {
      console.error('Error signing in:', error);
      
      // Handle specific error codes
      if (error.code === 'auth/invalid-credential' || 
          error.code === 'auth/user-not-found' || 
          error.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '0.5rem',
    opacity: loading ? 0.7 : 1,
  };

  // Error message styles
  const errorStyles = {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem',
    width: '100%',
  };

  return (
    <div style={containerStyles}>
      <div style={formContainerStyles}>
        <img
          src="../../src/assets/Ekukhanyeni Logo 2.jpg"
          alt="School Logo"
          style={logoStyles}
        />

        <h1 style={titleStyles}>Sign In</h1>
        <p style={subtitleStyles}>Welcome please sign in...</p>
        
        {error && <p style={errorStyles}>{error}</p>}
        
        <form onSubmit={handleSignIn} style={{ width: '100%' }}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyles}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyles}
            required
          />
          <button 
            type="submit" 
            style={buttonStyles}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;