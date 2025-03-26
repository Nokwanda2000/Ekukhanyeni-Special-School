import React, { useState, useEffect } from 'react';
import { db } from '../utills/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Eventspage() {
  const [events, setEvents] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleOpenModal = (event) => {
    setModalContent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: "'Inter', sans-serif" }}>
      {/* Page Header */}
      <div style={{
        position: 'relative',
        padding: '4rem 0',
        textAlign: 'center',
        background: '#F2F7FD',
        marginBottom: '2rem',
        overflow: 'hidden'
      }}>
        <div style={{
          fontSize: '10vw',
          fontWeight: 'bold',
          color: '#0082FC',
          opacity: '0.1',
          position: 'absolute',
          inset: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}>
          Ekukhanyeni
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1E3A8A', marginBottom: '0.5rem' }}>
            School Events
          </h1>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>
            <span 
              style={{ cursor: 'pointer', transition: 'color 0.2s ease' }} 
              onMouseOver={(e) => (e.target.style.color = '#3182ce')}
              onMouseOut={(e) => (e.target.style.color = '#718096')}
            >
              Home
            </span>{' '} | <span style={{ fontWeight: '500' }}>Events</span>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        padding: '0 20px',
        margin: '0 auto',
        maxWidth: '1200px'
      }}>
        {events.map((event) => (
          <div 
            key={event.id} 
            style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)'
              }
            }}
          >
            <div style={{ 
              height: '180px', 
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={event.imageURL} 
                alt={event.title || event.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                height: '60px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
              }}></div>
            </div>
            <div style={{ 
              padding: '18px',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                color: '#1F2937', 
                fontWeight: '600',
                marginBottom: '8px',
                lineHeight: '1.3'
              }}>
                {event.title || event.name}
              </h2>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                color: '#4B5563'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#4B5563"/>
                  <path d="M12 24C15 24 19.5 16.9706 19.5 12C19.5 7.02944 15.9706 4.5 12 4.5C8.02944 4.5 4.5 7.02944 4.5 12C4.5 16.9706 9 24 12 24Z" stroke="#4B5563" strokeWidth="1.5"/>
                </svg>
                <span style={{ fontSize: '0.875rem' }}>{event.location}</span>
              </div>
              
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
                color: '#4B5563'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: '0.875rem' }}>{event.date}</span>
              </div>

              <p style={{ 
                fontSize: '0.875rem', 
                color: '#4B5563',
                marginBottom: '16px',
                flexGrow: 1,
                lineHeight: '1.5'
              }}>
                {event.description.length > 100 
                  ? `${event.description.substring(0, 100)}...` 
                  : event.description}
              </p>

              <button 
                style={{
                  background: '#FFFFFF',
                  color: '#2563EB',
                  border: '1px solid #2563EB',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  width: 'fit-content',
                  transition: 'all 0.2s ease',
                  alignSelf: 'flex-end',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  ':hover': {
                    background: '#2563EB',
                    color: 'white'
                  }
                }} 
                onClick={() => handleOpenModal(event)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#2563EB';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.color = '#2563EB';
                }}
              >
                View Details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && modalContent && (
        <div style={{
          position: 'fixed',
          inset: '0',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000',
          animation: 'fadeIn 0.3s ease-out'
        }} onClick={handleCloseModal}>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            animation: 'slideUp 0.3s ease-out',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                transition: 'background 0.2s ease',
                ':hover': {
                  background: '#F3F4F6'
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              color: '#1F2937',
              marginBottom: '16px',
              paddingRight: '24px'
            }}>
              {modalContent.title || modalContent.name}
            </h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '24px 1fr',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#4B5563"/>
                <path d="M12 24C15 24 19.5 16.9706 19.5 12C19.5 7.02944 15.9706 4.5 12 4.5C8.02944 4.5 4.5 7.02944 4.5 12C4.5 16.9706 9 24 12 24Z" stroke="#4B5563" strokeWidth="1.5"/>
              </svg>
              <span style={{ color: '#4B5563' }}>{modalContent.location}</span>
              
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ color: '#4B5563' }}>{modalContent.date}</span>
              
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ color: '#4B5563' }}>
                {modalContent.startTime} - {modalContent.endTime}
              </span>
            </div>
            
            <div style={{ 
              background: '#F9FAFB',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Event Description
              </h3>
              <p style={{ 
                fontSize: '0.875rem',
                color: '#4B5563',
                lineHeight: '1.6'
              }}>
                {modalContent.description}
              </p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <button 
                style={{
                  background: '#2563EB',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'background 0.2s ease',
                  ':hover': {
                    background: '#1D4ED8'
                  }
                }}
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}