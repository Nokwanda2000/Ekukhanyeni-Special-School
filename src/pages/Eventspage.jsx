import React, { useState, useEffect } from 'react';
import { db } from '../utills/FirebaseConfig'; // Firebase config
import { collection, getDocs } from 'firebase/firestore';


const events = [
  // {
  //   title: "Tech Conference 2023",
  //   location: "San Francisco, CA",
  //   startTime: "2023-11-05 10:00 AM",
  //   endTime: "2023-11-05 5:00 PM",
  //   description: "Join us for the biggest tech conference of the year, featuring industry experts and the latest in technology trends.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjY1OXwwfDF8c2VhcmNofDEwfHxjb250ZXh0fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
  // },
  // {
  //   title: "UI/UX Design Workshop",
  //   location: "New York, NY",
  //   startTime: "2023-11-12 9:00 AM",
  //   endTime: "2023-11-12 4:00 PM",
  //   description: "A hands-on workshop focusing on UI/UX design principles, trends, and best practices.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  // },
];

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
    <div style={{ padding: '2rem' , fontFamily: 'arial' }}>
    {/* Page Header */}
    <div style={{
      position: 'relative',
      padding: '4rem 0',
      textAlign: 'center',
      background: '#F2F7FD',
      marginBottom: '2rem'
    }}>
      <div style={{
        fontSize: '10vw',
        fontWeight: 'bold',
        color: '#0082FC',
        opacity: '0.2',
        position: 'absolute',
        inset: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Ekukhanyeni
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '0.5rem' }}>
        Events
      </h1>
      <div style={{ fontSize: '0.875rem', color: '#718096' }}>
        <span style={{ cursor: 'pointer' }} onMouseOver={(e) => (e.target.style.color = '#3182ce')}
          onMouseOut={(e) => (e.target.style.color = '#718096')}>
          Home
        </span>{' '} | <span style={{ fontWeight: '500' }}>Contacts</span>
      </div>
    </div>

    {/* Events Grid */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      padding: '0 20px'
    }}>
      {events.map((event) => (
        <div key={event.id} style={{
          background: 'white',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s'
        }}>
          <div style={{ height: '200px', overflow: 'hidden' }}>
            <img src={event.imageUrl} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: '15px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#333', fontWeight: 'bold' }}>{event.name}</h2>
            <h2 style={{ fontSize: '1rem', color: '#666' }}>{event.location}</h2>
            <h2 style={{ fontSize: '1rem', color: '#666' }}>{event.date}</h2>
            <h2 style={{ fontSize: '1rem', color: '#666' }}>{event.startTime} - {event.endTime}</h2>
            <h2 style={{ fontSize: '1rem', color: '#666' }}>{event.description}</h2>
          </div>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <button style={{
              background: '#0082FC',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              borderRadius: '5px'
            }} onClick={() => handleOpenModal(event)}
              onMouseOver={(e) => e.target.style.background = '#005bb5'}
              onMouseOut={(e) => e.target.style.background = '#0082FC'}>
              View More
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
        zIndex: '1000'
      }} onClick={handleCloseModal}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
        }} onClick={(e) => e.stopPropagation()}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{modalContent.name}</h2>
          <p><strong>Location:</strong> {modalContent.location}</p>
          <p><strong>Date:</strong> {modalContent.date}</p>
          <p><strong>Start Time:</strong> {modalContent.startTime}</p>
          <p><strong>End Time:</strong> {modalContent.endTime}</p>
          <p><strong>Description:</strong> {modalContent.description}</p>
          <button style={{
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '5px',
            marginTop: '10px'
          }} onClick={handleCloseModal}
            onMouseOver={(e) => e.target.style.background = 'darkred'}
            onMouseOut={(e) => e.target.style.background = 'red'}>
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  );
}
