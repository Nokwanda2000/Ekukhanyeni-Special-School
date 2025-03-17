import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const CMS = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/CMS'); // Redirect to login page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="cms-container">
      {/* CMS Header */}
      {auth.currentUser && (
        <header className="cms-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6'
        }}>
          <h1>Ekukhanyeni CMS</h1>
          <div className="user-controls" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span>{auth.currentUser.email}</span>
            <button 
              onClick={handleSignOut}
              style={{
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </header>
      )}

      {/* CMS Navigation - Only show if user is authenticated */}
      {auth.currentUser && (
        <nav className="cms-nav" style={{
          display: 'flex',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6'
        }}>
          <button 
            onClick={() => navigate('/CMS/UsersCMS')}
            style={{
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Users
          </button>
          <button 
            onClick={() => navigate('/CMS/EventsCMS')}
            style={{
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Events
          </button>
          <button 
            onClick={() => navigate('/CMS/TimetableCMS')}
            style={{
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}
          >
            Timetables
          </button>
        </nav>
      )}

      {/* CMS Content */}
      <main className="cms-content" style={{
        padding: '1rem'
      }}>
        <Outlet />
      </main>
    </div>
  );
};

export default CMS;