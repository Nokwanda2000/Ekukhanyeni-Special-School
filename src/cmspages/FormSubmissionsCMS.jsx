// import React, { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';

// const FormSubmissionsDashboard = () => {
//   // Sample data - in a real app, this would come from an API
//   const [submissions, setSubmissions] = useState([
//     { id: 1, name: "John Doe", email: "john@example.com", message: "I'd like to register for the upcoming event.", subject: "Event Registration" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", message: "When does the summer program begin?", subject: "Summer Program" },
//     { id: 3, name: "Mike Johnson", email: "mike@example.com", message: "Please send me more information about your services.", subject: "Information Request" },
//     { id: 4, name: "Sarah Williams", email: "sarah@example.com", message: "I need assistance with my account.", subject: "Account Help" },
//     { id: 5, name: "David Brown", email: "david@example.com", message: "What are the fees for membership?", subject: "Membership Inquiry" },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [filteredSubmissions, setFilteredSubmissions] = useState([]);
//   const [isAdmin, setIsAdmin] = useState(true); 

//   useEffect(() => {
//     // Filter submissions based on search term
//     const results = submissions.filter(submission =>
//       submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       submission.message.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredSubmissions(results);
//   }, [searchTerm, submissions]);

//   // Get current submissions
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   // View submission details
//   const viewSubmission = (id) => {
//     alert(`Viewing submission details for ID: ${id}`);
  
//   };

//   return (
//     <div className="min-h-screen bg-blue-200 p-6">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
//         <div className="flex">    
//           {/* Main content */}
//           <div className="flex-1 p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-xl font-medium">Form Submissions</h1>
//               <div className="flex items-center">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="border rounded-md py-2 px-4 pr-10 w-64"
//                     value={searchTerm}
//                     onChange={handleSearch}
//                   />
//                 </div>
//                 <div className="ml-4 flex items-center">
//                   <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
//                   <span className="text-sm">Admin Login</span>
//                 </div>
//               </div>
//             </div>
            
//             {isAdmin ? (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full border-collapse">
//                     <thead>
//                       <tr className="border-b">
//                         <th className="py-3 text-left font-medium">Name</th>
//                         <th className="py-3 text-left font-medium">Email</th>
//                         <th className="py-3 text-left font-medium">Message</th>
//                         <th className="py-3 text-left font-medium">Subject</th>
//                         <th className="py-3 text-left font-medium">View</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentItems.map((submission) => (
//                         <tr key={submission.id} className="border-b">
//                           <td className="py-4">{submission.name}</td>
//                           <td className="py-4">{submission.email}</td>
//                           <td className="py-4 truncate max-w-xs">{submission.message}</td>
//                           <td className="py-4">{submission.subject}</td>
//                           <td className="py-4">
//                             <button 
//                               onClick={() => viewSubmission(submission.id)}
//                               className="text-blue-500 hover:text-blue-700"
//                             >
//                               View
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 <div className="flex justify-center mt-4">
//                   <button
//                     onClick={() => paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="text-sm px-2"
//                   >
//                     Previous
//                   </button>
//                   <span className="mx-2 text-sm">01</span>
//                   <button
//                     onClick={() => paginate(currentPage + 1)}
//                     disabled={indexOfLastItem >= filteredSubmissions.length}
//                     className="text-sm px-2"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center py-10">
//                 <p className="text-gray-500">Please login as admin to view form submissions.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormSubmissionsDashboard;