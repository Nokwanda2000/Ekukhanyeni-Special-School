import React, { useEffect, useState } from 'react';
import { db } from '../utills/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const FormSubmissionsCMS = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const itemsPerPage = 5;
  
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

  // Function to open modal with selected message
  const openModal = (message) => {
    setSelectedMessage(message);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedMessage(null);
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Fetch sponsors collection
        const querySnapshot = await getDocs(collection(db, "sponsors"));
        const sponsorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          subject: "sponsor", // Ensure subject is explicitly "sponsor"
          ...doc.data(),
        }));
  
        // Fetch contacts collection
        const querySnapshot2 = await getDocs(collection(db, "contacts"));
        const contactsData = querySnapshot2.docs.map((doc) => ({
          id: doc.id,
          subject: "general", // Ensure subject is explicitly "general"
          ...doc.data(),
        }));
  
        // Merge both datasets into one array
        setSubmissions([...sponsorsData, ...contactsData]);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
  
    fetchSubmissions();
  }, []);
  
  const filteredSubmissions = submissions.filter((submission) => {
    // Only search through these specific fields
    const searchableFields = ['name', 'email', 'phone', 'message', 'subject'];
    
    return searchableFields.some(field => {
      const value = submission[field];
      return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
  
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

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
      }}>Form Submissions</h1>
      
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
          placeholder="Search submissions"
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
      
      {isMobile ? (
        // Mobile card view
        <div style={{ width: '100%' }}>
          {currentItems.length > 0 ? (
            currentItems.map((submission) => (
              <div 
                key={submission.id} 
                style={{ 
                  border: '1px solid #eee', 
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '15px'
                }}
              >
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold' }}>{submission.name}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{submission.email}</div>
                </div>
                <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                  <strong>Phone:</strong> {submission.phone}
                </div>
                <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                  <strong>Subject:</strong> {submission.subject}
                </div>
                <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                  {truncateText(submission.message, 50)}
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '10px'
                }}>
                  <button
                    onClick={() => openModal(submission.message)}
                    style={{
                      backgroundColor: '#0088ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '8px 0',
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    View Full Message
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              {searchTerm ? 'No submissions match your search.' : 'No submissions found.'}
            </div>
          )}
        </div>
      ) : (
        // Desktop table view
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginTop: '10px'
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Phone Number</th>
                <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Subject</th>
                <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Message</th>
                <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((submission) => (
                  <tr key={submission.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>{submission.name}</td>
                    <td style={{ padding: '15px' }}>{submission.email}</td>
                    <td style={{ padding: '15px' }}>{submission.phone}</td>
                    <td style={{ padding: '15px' }}>{submission.subject}</td>
                    <td style={{ padding: '15px' }}>{truncateText(submission.message, 30)}</td>
                    <td style={{ padding: '15px' }}>
                      <button
                        onClick={() => openModal(submission.message)}
                        style={{
                          backgroundColor: '#0088ff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '8px 20px',
                          cursor: 'pointer'
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>
                    {searchTerm ? 'No submissions match your search.' : 'No submissions found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {filteredSubmissions.length > 0 && (
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
            disabled={indexOfLastItem >= filteredSubmissions.length}
            style={{
              padding: '8px 15px',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '5px',
              cursor: indexOfLastItem >= filteredSubmissions.length ? 'default' : 'pointer',
              opacity: indexOfLastItem >= filteredSubmissions.length ? 0.6 : 1
            }}
          >
            Next
          </button>
        </div>
      )}
      
      {/* Modal for full message */}
      {selectedMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '400px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <h2 style={{ marginBottom: '20px' }}>Full Message</h2>
            <p>{selectedMessage}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                onClick={closeModal}
                style={{
                  backgroundColor: '#FF4E64',
                  color:'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 15px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSubmissionsCMS;