// import React, { useEffect, useState } from 'react';
// import { db } from '../utills/FirebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';

// const AdminDashboard = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       const querySnapshot = await getDocs(collection(db, 'sponsors'));
//       const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSubmissions(data);
//     };

//     fetchSubmissions();
//   }, []);

//   // Search filtering
//   const filteredSubmissions = submissions.filter((submission) =>
//     submission.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination Logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Form Submissions</h2>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search"
//         className="border p-2 rounded mb-4 w-full"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       {/* Submissions Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.length > 0 ? (
//             currentItems.map((submission) => (
//               <tr key={submission.id} className="border">
//                 <td className="p-2">{submission.name}</td>
//                 <td className="p-2">{submission.email}</td>
//                 <td className="p-2">{submission.phone}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="p-4 text-center">No submissions found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-between mt-4">
//         <button
//           className="p-2 bg-gray-300 rounded"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           Previous
//         </button>
//         <span>Page {currentPage}</span>
//         <button
//           className="p-2 bg-gray-300 rounded"
//           disabled={indexOfLastItem >= filteredSubmissions.length}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
