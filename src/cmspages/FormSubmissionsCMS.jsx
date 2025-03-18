import React, { useEffect, useState } from 'react';
import { db } from '../utills/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const FormSubmissionsCMS = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSubmissions = async () => {
      const querySnapshot = await getDocs(collection(db, 'sponsors'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubmissions(data);
    };

    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((submission) =>
    submission.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '24px',  }}>
      <div style={{ maxWidth: '960px', margin: 'auto', backgroundColor: 'white', padding: '24px', }}>
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
          <thead style={{}}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal' , color:'grey'}}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Message</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'normal', color:'grey' }}>Subject</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((submission) => (
                <tr key={submission.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{submission.name}</td>
                  <td style={{ padding: '12px' }}>{submission.email}</td>
                  <td style={{ padding: '12px' }}>{submission.message}</td>
                  <td style={{ padding: '12px' }}>{submission.subject || 'Sponsor'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '12px', textAlign: 'center', color: '#6b7280' }}>No submissions found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <span style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '8px' }}>
          </span>
          <div>
            <button style={{ padding: '8px 12px', marginRight: '4px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            {[...Array(totalPages)].map((_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)} style={{ padding: '8px 12px', marginRight: '4px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: 'black', cursor: 'pointer' }}>{index + 1}</button>
            ))}
            <button style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', cursor: indexOfLastItem >= filteredSubmissions.length ? 'not-allowed' : 'pointer', opacity: indexOfLastItem >= filteredSubmissions.length ? 0.5 : 1 }} disabled={indexOfLastItem >= filteredSubmissions.length} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionsCMS;
