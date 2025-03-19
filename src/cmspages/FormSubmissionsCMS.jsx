import React, { useEffect, useState } from 'react';
import { db } from '../utills/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const FormSubmissionsCMS = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const itemsPerPage = 5;
  
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
      return value && String(value).toLowerCase().includes(searchQuery.toLowerCase());
    });
  });
  
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '960px', margin: 'auto', backgroundColor: 'white', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Form Submissions</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#eee', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500', marginRight: '12px' }}></div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Admin</span>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search submissions"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '50%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', marginBottom: '16px' }}
        />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Phone Number</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Message</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Subject</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((submission) => (
                <tr key={submission.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{submission.name}</td>
                  <td style={{ padding: '12px' }}>{submission.email}</td>
                  <td style={{ padding: '12px' }}>{submission.phone}</td>
                  <td style={{ padding: '12px' }}>{truncateText(submission.message, 30)}</td>
                  <td style={{ padding: '12px' }}>{submission.subject}</td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => openModal(submission.message)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>No submissions found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
          </span>
          <div>
            <button 
              style={{ 
                padding: '8px 12px', 
                marginRight: '4px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                backgroundColor: 'white', 
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer', 
                opacity: currentPage === 1 ? 0.5 : 1 
              }} 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentPage(index + 1)} 
                style={{ 
                  padding: '8px 12px', 
                  marginRight: '4px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px', 
                  backgroundColor: currentPage === index + 1 ? '#007bff' : 'white', 
                  color: currentPage === index + 1 ? 'white' : 'black', 
                  cursor: 'pointer' 
                }}
              >
                {index + 1}
              </button>
            ))}
            <button 
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                backgroundColor: 'white', 
                cursor: indexOfLastItem >= filteredSubmissions.length ? 'not-allowed' : 'pointer', 
                opacity: indexOfLastItem >= filteredSubmissions.length ? 0.5 : 1 
              }} 
              disabled={indexOfLastItem >= filteredSubmissions.length} 
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {selectedMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h3 style={{ marginBottom: "12px", fontWeight:"bold" }}>Message:</h3>
            <p>{selectedMessage}</p>
            <button
              onClick={closeModal}
              style={{
                marginTop: "12px",
                padding: "6px 12px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSubmissionsCMS;