// import React from 'react';
// import { Link } from 'react-router-dom';
// import { MapPin, Phone, Clock } from 'lucide-react';

// // Import your logo image
// import logo from '../assets/logo.png'; // Update the path as needed

// const Navbar = () => {
//   return (
//     <div className="w-full">
//       {/* Info Bar */}
//       <div className="bg-gray-100 w-full py-2">
//         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
//           {/* Logo */}
//           <div className="flex items-center mb-4 md:mb-0">
//             <img src={logo} alt="Logo" className="h-16" />
//           </div>
          
//           {/* Contact Info */}
//           <div className="flex flex-col md:flex-row gap-4 md:gap-8">
//             {/* Call */}
//             <div className="flex items-center gap-2">
//               <div className="rounded-full bg-blue-500 p-2">
//                 <Phone className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-bold text-sm">Call</p>
//                 <p className="text-sm">+27 33 398 1325</p>
//               </div>
//             </div>
            
//             {/* Operating Hours */}
//             <div className="flex items-center gap-2">
//               <div className="rounded-full bg-blue-500 p-2">
//                 <Clock className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-bold text-sm">Operating Hours</p>
//                 <p className="text-sm">Mon - Fri 7 AM - 3 PM</p>
//               </div>
//             </div>
            
//             {/* Address */}
//             <div className="flex items-center gap-2">
//               <div className="rounded-full bg-blue-500 p-2">
//                 <MapPin className="h-5 w-5 text-white" />
//               </div>
//               <div>
//                 <p className="font-bold text-sm">Address</p>
//                 <p className="text-sm">140m Road,</p>
//                 <p className="text-sm">Edendale,</p>
//                 <p className="text-sm">Pietermaritzburg,</p>
//                 <p className="text-sm">KwaZulu Natal</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Simple Navigation Menu - updated to match the image */}
//       <div className="bg-white w-full border-t border-gray-200">
//         <div className="container mx-auto flex justify-center">
//           <nav className="flex space-x-8 text-base">
//             <Link to="/" className="py-2 px-4 hover:text-gray-700">Home</Link>
//             <Link to="/Eventspage" className="py-2 px-4 hover:text-gray-700 border-b-2 border-gray-800">Events</Link>
//             <Link to="/TimetablesPage" className="py-2 px-4 hover:text-gray-700">Timetables</Link>
//             <Link to="/AboutUspage" className="py-2 px-4 hover:text-gray-700">About Us</Link>
//             <Link to="/ProgrammesPage" className="py-2 px-4 hover:text-gray-700">Our Programmes</Link>
//             <Link to="/Contactpage" className="py-2 px-4 hover:text-gray-700">Contact Us</Link>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;