import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const FormSubmissionsDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const [submissions, setSubmissions] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", message: "I'd like to register for the upcoming event.", subject: "Event Registration" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", message: "When does the summer program begin?", subject: "Summer Program" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", message: "Please send me more information about your services.", subject: "Information Request" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", message: "I need assistance with my account.", subject: "Account Help" },
    { id: 5, name: "David Brown", email: "david@example.com", message: "What are the fees for membership?", subject: "Membership Inquiry" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // Assuming admin is logged in

  useEffect(() => {
    // Filter submissions based on search term
    const results = submissions.filter(submission =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubmissions(results);
  }, [searchTerm, submissions]);

  // Get current submissions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // View submission details
  const viewSubmission = (id) => {
    alert(`Viewing submission details for ID: ${id}`);
    // In a real app, this would open a modal or navigate to a details page
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
        <div className="flex p-6">
          {/* Logo and navigation */}
          <div className="w-48 pr-6 border-r">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-blue-500 rounded-full w-20 h-20 flex items-center justify-center mb-2">
                <div className="bg-yellow-300 rounded-full w-10 h-10"></div>
              </div>
              <span className="text-gray-500 text-sm">STMCB</span>
            </div>
            
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-500 font-medium block">Dashboard</a>
              </li>
              <li>
                <a href="#" className="bg-blue-500 text-white py-2 px-4 rounded-md block text-center">Users</a>
              </li>
              <li>
                <a href="#" className="bg-blue-500 text-white py-2 px-4 rounded-md block text-center">Events</a>
              </li>
              <li>
                <a href="#" className="bg-blue-500 text-white py-2 px-4 rounded-md block text-center">Timetable</a>
              </li>
              <li>
                <a href="#" className="bg-blue-500 text-white py-2 px-4 rounded-md block text-center">Form Submissions</a>
              </li>
            </ul>
          </div>
          
          {/* Main content */}
          <div className="flex-1 pl-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold">Form Submissions</h1>
              <div className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border rounded-md py-2 px-4 pr-10 w-64"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
                <div className="ml-4 flex items-center">
                  <div className={`w-4 h-4 rounded-full ${isAdmin ? 'bg-gray-300' : 'bg-gray-200'} mr-2`}></div>
                  <span className="text-sm">Admin Login</span>
                </div>
              </div>
            </div>
            
            {isAdmin ? (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentItems.map((submission) => (
                        <tr key={submission.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{submission.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{submission.email}</td>
                          <td className="px-6 py-4 truncate max-w-xs">{submission.message}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{submission.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button 
                              onClick={() => viewSubmission(submission.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between mt-4 pb-4">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 ${currentPage === 1 ? 'text-gray-400' : 'text-black'}`}
                  >
                    Previous
                  </button>
                  <div className="flex items-center">
                    <span className="border border-gray-300 px-3 py-1 mx-1">{String(currentPage).padStart(2, '0')}</span>
                  </div>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= filteredSubmissions.length}
                    className={`px-4 py-2 ${indexOfLastItem >= filteredSubmissions.length ? 'text-gray-400' : 'text-black'}`}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Please login as admin to view form submissions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionsDashboard;