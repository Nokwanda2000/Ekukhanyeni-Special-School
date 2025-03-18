import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react'; // Import icons
import Logo from '../assets/Ekukhanyeni Special School trpnt logo.png';

const Navbar = () => {
  return (
    <div>
      {/* Info Bar with Logo and Contact Information */}
      <div className="bg-gray-100 w-full py-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8">
          {/* Logo */}
          <div className="flex items-center mb-8 md:mb-0">
            <img src={Logo} alt="Logo" className="h-30 ml-8" />
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-4 ">
            {/* Call */}
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2">
                <Phone className="h-5 w-5 text-blue-500" />
                <Phone className="h-5 w-5 text-gray-100" />
                <Phone className="h-5 w-5 text-gray-100" />
                <Phone className="h-5 w-5 text-gray-100" />
                <Phone className="h-5 w-5 text-gray-100" />
               
              </div>
              <div>
                <p className="font-bold text-sm">Call</p>
                <p className="text-sm">+27 33 398 1325</p>
                <p className="text-sm text-gray-100">Edendale,</p>
                <p className="text-sm text-gray-100">Pietermaritzburg,</p>
                <p className="text-sm text-gray-100">KwaZulu Natal</p>
              </div>
            </div>
            
            {/* Operating Hours */}
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <Clock className="h-5 w-5 text-gray-100" />
                <Clock className="h-5 w-5 text-gray-100" />
                <Clock className="h-5 w-5 text-gray-100" />
                <Clock className="h-5 w-5 text-gray-100" />
              </div>
              <div>
                <p className="font-bold text-sm">Operating Hours</p>
                <p className="text-sm">Mon - Fri 7 AM - 3 PM</p>
                <p className="text-sm text-gray-100">Edendale,</p>
                <p className="text-sm text-gray-100">Pietermaritzburg,</p>
                <p className="text-sm text-gray-100">KwaZulu Natal</p>
              </div>
            </div>
            
            {/* Address */}
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2">
                <MapPin className=" mt-10 h-5 w-5 text-blue-500" />
                <MapPin className=" mt-10 h-5 w-5 text-gray-100" />
                <MapPin className=" mt-10 h-5 w-5 text-gray-100" />
                <MapPin className=" mt-10 h-5 w-5 text-gray-100" />
                <MapPin className=" mt-10 h-5 w-5 text-gray-100" />
                
              </div>
              <div>
                <p className="font-bold text-sm">Address</p>
                <p className="text-sm">140m Road,</p>
                <p className="text-sm">Edendale,</p>
                <p className="text-sm">Pietermaritzburg,</p>
                <p className="text-sm">KwaZulu Natal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div style={styles.navBar}>
        <div style={styles.navContainer}>
          <nav style={styles.navMenu}>
            <ul style={styles.navList}>
              <li style={styles.navItem}>
                <Link to="/" style={styles.navLink}>Home</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/Eventspage" style={{ ...styles.navLink, ...styles.activeLink }}>Events</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/TimetablesPage" style={styles.navLink}>Timetables</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/AboutUspage" style={styles.navLink}>About Us</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/ProgrammesPage" style={styles.navLink}>Our Programmes</Link>
              </li>
              <li style={styles.navItem}>
                <Link to="/Contactpage" style={styles.navLink}>Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

const styles = {
  navBar: {
    borderBottom: '1px solid #e5e7eb',
  },
  navContainer: {
    width: '100%',
  },
  navMenu: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 0',
    
  },
  navList: {
    display: 'flex',
    gap: '1.5rem', // 24px space between nav items
    listStyle: 'none',
    padding: '0',

  },
  navItem: {},
  navLink: {
    padding: '0.75rem 1rem',
    fontWeight: '500',
    textDecoration: 'none',
    color: '#333',
  },
  activeLink: {
    textDecoration: 'underline', // Active link indicator
  },
};

export default Navbar;







// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { MapPin, Phone, Clock } from 'lucide-react'; // Import icons
// import Logo from '../assets/Ekukhanyeni Special School trpnt logo.png';

// const Navbar = () => {
//   // State to handle mobile menu toggle
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Toggle menu visibility
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div>
//       {/* Info Bar with Logo and Contact Information */}
//       <div className="bg-gray-100 w-full py-2">
//         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8">
//           {/* Logo */}
//           <div className="flex items-center mb-8 md:mb-0">
//             <img src={Logo} alt="Logo" className="h-30 ml-8" />
//           </div>
          
//           {/* Contact Info */}
//           <div className="flex flex-col md:flex-row gap-4 ">
//             {/* Call */}
//             <div className="flex items-center gap-2">
//               <div className="rounded-full p-2">
//                 <Phone className="h-5 w-5 text-blue-500" />
//               </div>
//               <div>
//                 <p className="font-bold text-sm">Call</p>
//                 <p className="text-sm">+27 33 398 1325</p>
//               </div>
//             </div>
            
//             {/* Operating Hours */}
//             <div className="flex items-center gap-2">
//               <div className="rounded-full p-2">
//                 <Clock className="h-5 w-5 text-blue-500" />
//               </div>
//               <div>
//                 <p className="font-bold text-sm">Operating Hours</p>
//                 <p className="text-sm">Mon - Fri 7 AM - 3 PM</p>
//               </div>
//             </div>
            
//             {/* Address */}
//             <div className="flex items-center gap-2">
//               <div className="rounded-full p-2">
//                 <MapPin className=" mt-10 h-5 w-5 text-blue-500" />
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

//       {/* Mobile Hamburger Menu */}
//       <div className="md:hidden flex justify-between items-center px-8 py-4 bg-gray-800 text-white">
//         <button onClick={toggleMenu} className="text-white">
//           {isMenuOpen ? 'Close Menu' : 'Open Menu'}
//         </button>
//       </div>

//       {/* Navigation Menu */}
//       <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
//         <div className="container mx-auto">
//           <nav>
//             <ul className="flex flex-col md:flex-row justify-center gap-8 py-4 md:py-0 bg-gray-100 md:bg-transparent">
//               <li>
//                 <Link to="/" className="text-gray-800 hover:underline py-2 px-4 block">Home</Link>
//               </li>
//               <li>
//                 <Link to="/Eventspage" className="text-gray-800 hover:underline py-2 px-4 block">Events</Link>
//               </li>
//               <li>
//                 <Link to="/TimetablesPage" className="text-gray-800 hover:underline py-2 px-4 block">Timetables</Link>
//               </li>
//               <li>
//                 <Link to="/AboutUspage" className="text-gray-800 hover:underline py-2 px-4 block">About Us</Link>
//               </li>
//               <li>
//                 <Link to="/ProgrammesPage" className="text-gray-800 hover:underline py-2 px-4 block">Our Programmes</Link>
//               </li>
//               <li>
//                 <Link to="/Contactpage" className="text-gray-800 hover:underline py-2 px-4 block">Contact Us</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

