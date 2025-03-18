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

  // Search filtering
  const filteredSubmissions = submissions.filter((submission) =>
    submission.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        <h2 className="text-lg font-semibold mb-4">Form Submissions</h2>
        
        <div className="flex justify-between mb-8">
          {/* Search Bar */}
          <div className="w-72">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 p-2 rounded w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          
          
        </div>
        
        {/* Table Headers */}
        <div className="grid grid-cols-5 gap-4 py-3 border-b text-sm font-medium text-gray-500">
          <div>Name</div>
          <div>Email</div>
          <div>Message</div>
          <div>Subject</div>
          <div>View</div>
        </div>
        
        {/* Table Rows */}
        {currentItems.length > 0 ? (
          currentItems.map((submission) => (
            <div key={submission.id} className="grid grid-cols-5 gap-4 py-4 border-b items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-300 rounded-full mr-2 flex items-center justify-center text-white text-xs">
                  {submission.name.charAt(0)}
                </div>
                <span>{submission.name}</span>
              </div>
              <div className="text-sm">{submission.email}</div>
              <div className="text-sm">{submission.message}</div>
              <div className="text-sm">{submission.subject || 'Sponsor'}</div>
              <div>
                <button className="bg-yellow-400 text-sm py-1 px-4 rounded-md">View</button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-4 text-center">No submissions found</div>
        )}
        
    

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            className="px-4 py-2 bg-gray-100 rounded text-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md text-sm">
            {currentPage}
          </div>
          <button
            className="px-4 py-2 bg-gray-100 rounded text-sm"
            disabled={indexOfLastItem >= filteredSubmissions.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionsCMS;
