import React from 'react';
import ClientFooter from '../components/ClientFooter';
import { Link, Outlet } from 'react-router-dom';
import StrollToTop from '../components/StrollToTop';
import SponsorBanner from '../components/SponsorBanner';
import { MapPin, Phone, Clock } from 'lucide-react';

// Import your logo image - update the path as needed
import logo from '../assets/logo.png'; 

export default function Client() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Info Bar */}
      <div className="bg-gray-100 w-full py-2">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="h-16" />
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            {/* Call */}
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500 p-2">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Call</p>
                <p className="text-sm">+27 33 398 1325</p>
              </div>
            </div>
            
            {/* Operating Hours */}
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500 p-2">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Operating Hours</p>
                <p className="text-sm">Mon - Fri 7 AM - 3 PM</p>
              </div>
            </div>
            
            {/* Address */}
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500 p-2">
                <MapPin className="h-5 w-5 text-white" />
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
      <nav className="bg-white w-full shadow-md">
        <div className="container mx-auto flex justify-center md:justify-start">
          <ul className="flex flex-wrap justify-center">
            <li>
              <Link to="/" className="inline-block px-4 py-4 hover:underline font-medium">Home</Link>
            </li>
            <li>
              <Link to="/Eventspage" className="inline-block px-4 py-4 hover:underline font-medium">Events</Link>
            </li>
            <li>
              <Link to="/TimetablesPage" className="inline-block px-4 py-4 hover:underline font-medium">Timetables</Link>
            </li>
            <li>
              <Link to="/AboutUspage" className="inline-block px-4 py-4 hover:underline font-medium">About Us</Link>
            </li>
            <li>
              <Link to="/ProgrammesPage" className="inline-block px-4 py-4 hover:underline font-medium">Our Programmes</Link>
            </li>
            <li>
              <Link to="/Contactpage" className="inline-block px-4 py-4 hover:underline font-medium">Contact Us</Link>
            </li>
          </ul>
        </div>
      </nav>
     
      

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer Components */}
      <SponsorBanner />
    <ClientFooter />
    <StrollToTop />
    </div>
  );
}