import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../src/utills/FirebaseConfig';
import { getAuth } from 'firebase/auth';

// EventDetailsModal component
const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '25px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>

        <h2 style={{ marginBottom: '20px', color: '#1D4ED8' }}>{event.title}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px' }}>
              <img 
                src={event.imageURL} 
                alt={event.title}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  maxHeight: '300px',
                  objectFit: 'cover'
                }}
              />
            </div>
            
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ marginBottom: '5px', color: '#555' }}>Date & Time</h3>
                <p>{event.date} | {event.startTime} - {event.endTime}</p>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ marginBottom: '5px', color: '#555' }}>Location</h3>
                <p>{event.location}</p>
              </div>
              
              <div>
                <h3 style={{ marginBottom: '5px', color: '#555' }}>Description</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{event.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AddEventModal component
const AddEventModal = ({ isOpen, onClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      image: ''
    };

    if (!title) newErrors.title = 'Title is required';
    if (!date) newErrors.date = 'Date is required';
    if (!startTime) newErrors.startTime = 'Start time is required';
    if (!endTime) newErrors.endTime = 'End time is required';
    if (!location) newErrors.location = 'Location is required';
    if (!description) newErrors.description = 'Description is required';
    if (!image) newErrors.image = 'Image is required';

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      try {
        const eventDocRef = await addDoc(collection(db, "events"), {
          title,
          date,
          startTime,
          endTime,
          location,
          description,
          imageURL: URL.createObjectURL(image),
          createdAt: new Date()
        });

        onAddEvent({
          id: eventDocRef.id,
          title,
          date,
          startTime,
          endTime,
          location,
          description,
          imageURL: URL.createObjectURL(image)
        });

        onClose();
      } catch (error) {
        console.error('Error adding event:', error);
        newErrors.firebase = `Failed to add event: ${error.message}`;
        setErrors(newErrors);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          {errors.firebase && (
            <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>{errors.firebase}</p>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.title && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.title}</p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.date && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.date}</p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.startTime && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.startTime}</p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.endTime && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.endTime}</p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.location && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.location}</p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box',
                minHeight: '100px'
              }}
            />
            {errors.description && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.description}</p>
            )}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.image && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.image}</p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#f5f5f5',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: '#0088ff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer'
              }}
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main EventsCMS component
const EventsCMS = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const eventsPerPage = 5;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (user) {
          // Fetch user data from Firestore 'users' collection by name
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setCurrentUser({
                displayName: userData.name || user.displayName || 'Admin',
                email: userData.email || user.email || '',
                photoURL: userData.photoURL || user.photoURL || '',
                color: userData.color || '#3B82F6'
              });
            });
          } else {
            // If user not found in 'users' collection, use auth data
            setCurrentUser({
              displayName: user.displayName || 'Admin',
              email: user.email || '',
              photoURL: user.photoURL || '',
              color: '#3B82F6'
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user information");
      }
    };

    fetchCurrentUser();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsCollection = collection(db, "events");
        const querySnapshot = await getDocs(eventsCollection);

        const fetchedEvents = [];
        querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          fetchedEvents.push({
            id: doc.id,
            ...eventData
          });
        });

        setEvents(fetchedEvents);
        setError(null);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search term
  const filteredEvents = events.filter(event =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Handle event actions
  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", eventId));
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
      } catch (error) {
        console.error('Error deleting event:', error);
        setError('Failed to delete event. Please try again.');
      }
    }
  };

  const handleAddEvent = () => {
    setIsAddModalOpen(true);
  };

  const handleAddNewEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  // Check if mobile view
  const isMobile = windowWidth < 768;

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: isMobile ? '10px' : '20px'
    }}>
      <h1 style={{
        fontSize: '20px',
        marginBottom: '20px',
        fontWeight: 'bold',
        color:'#3B82F6'
      }}>Events</h1>

      {error && (
        <div style={{
          padding: '10px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: '20px',
        gap: isMobile ? '15px' : '0'
      }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: isMobile ? '100%' : '300px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />

        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {currentUser.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.displayName}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  marginRight: '10px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentUser.color || '#3B82F6',
                marginRight: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {currentUser.displayName?.charAt(0).toUpperCase() || 'A'}
              </div>
            )}
            <div>
              <div style={{ }}>{currentUser.displayName}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{currentUser.email}</div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleAddEvent}
        style={{
          backgroundColor: '#2563EB',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '20px',
          width: isMobile ? '100%' : 'auto'
        }}
      >
        + Add Event
      </button>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading events...</div>
      ) : filteredEvents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          {searchTerm ? 'No events match your search.' : 'No events found. Add your first event!'}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          {isMobile ? (
            <div style={{ width: '100%' }}>
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '15px'
                  }}
                >
                  <div style={{ marginBottom: '10px' }}>
                    <img
                      src={event.imageURL}
                      alt={event.title}
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        marginBottom: '10px'
                      }}
                    />
                    <div style={{ fontWeight: 'bold' }}>{event.title}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{event.date} | {event.startTime} - {event.endTime}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{event.location}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{event.description}</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '10px'
                  }}>
                    <button
                      onClick={() => handleDelete(event.id)}
                      style={{
                        backgroundColor: '#FF4E64',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '8px 0',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '10px'
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Event Title</th>
                  <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Date & Time</th>
                  <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Location</th>
                  <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event) => (
                  <tr key={event.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>{event.title}</td>
                    <td style={{ padding: '15px' }}>{event.date} | {event.startTime} - {event.endTime}</td>
                    <td style={{ padding: '15px' }}>{event.location}</td>
                    <td style={{ padding: '15px' }}>
                      <button
                        onClick={() => handleDelete(event.id)}
                        style={{
                          backgroundColor: '#FF4E64',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '8px 20px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        style={{
                          backgroundColor: '#1D4ED8',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '8px 20px',
                          cursor: 'pointer',
                          marginLeft: '10px'
                        }}
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {filteredEvents.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          gap: '10px'
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 15px',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '5px',
              cursor: currentPage === 1 ? 'default' : 'pointer',
              opacity: currentPage === 1 ? 0.6 : 1
            }}
          >
            Previous
          </button>

          <button
            style={{
              padding: '8px 15px',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            {String(currentPage).padStart(2, '0')}
          </button>

          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={indexOfLastEvent >= filteredEvents.length}
            style={{
              padding: '8px 15px',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '5px',
              cursor: indexOfLastEvent >= filteredEvents.length ? 'default' : 'pointer',
              opacity: indexOfLastEvent >= filteredEvents.length ? 0.6 : 1
            }}
          >
            Next
          </button>
        </div>
      )}

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvent={handleAddNewEvent}
      />

      <EventDetailsModal 
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default EventsCMS;