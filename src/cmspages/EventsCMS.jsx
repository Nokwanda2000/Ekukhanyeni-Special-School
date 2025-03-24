import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '/utills/FirebaseConfig';

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      image: ''
    };

    // Validate fields
    if (!title) newErrors.title = 'Title is required';
    if (!date) newErrors.date = 'Date is required';
    if (!startTime) newErrors.startTime = 'Start time is required';
    if (!endTime) newErrors.endTime = 'End time is required';
    if (!location) newErrors.location = 'Location is required';
    if (!description) newErrors.description = 'Description is required';
    if (!image) newErrors.image = 'Image is required';

    setErrors(newErrors);

    // If no errors, add event
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

        // Add event to the state
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

        // Close modal
        onClose();
      } catch (error) {
        console.error('Error adding event:', error);
        newErrors.firebase = `Failed to add event: ${error.message}`;
        setErrors(newErrors);
      }
    }
  };

  // If modal is not open, don't render anything
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

  // Fetch events from Firestore on component mount
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
        // Delete event document from Firestore
        await deleteDoc(doc(db, "events", eventId));

        // Update state to remove the event
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        console.log(`Deleted event with ID: ${eventId}`);
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
    console.log('New event added:', newEvent);
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
        fontWeight: 'bold'
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

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#eee',
            marginRight: '10px'
          }}></div>
          <span style={{ fontWeight: 'normal' }}>Admin</span>
        </div>
      </div>

      <button
        onClick={handleAddEvent}
        style={{
          backgroundColor: '#0088ff',
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
            // Mobile card view
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
            // Desktop table view
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

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvent={handleAddNewEvent}
      />
    </div>
  );
};

export default EventsCMS;