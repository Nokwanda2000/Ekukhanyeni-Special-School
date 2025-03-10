import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

const ClientFooter = () => {
  return (
    <footer className="bg-white py-8 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - School Info */}
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <img 
                src="/api/placeholder/100/100" 
                alt="School Logo" 
                className="h-16 w-16 object-contain" 
              />
            </div>
            <p className="text-sm text-gray-700 mb-4 max-w-xs">
              We are committed to guide/help learners who are intellectually impaired to be socially economically and spiritually independent.
            </p>
            <a 
              href="/staff-login" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            >
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              Staff Sign In
            </a>
          </div>

          {/* Middle Column - Contact Info */}
          <div className="flex flex-col">
            <div className="flex items-start mb-6">
              <div className="mr-3 mt-1 text-blue-500">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Call</h3>
                <p className="text-gray-700">+27 33 398 1325</p>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <div className="mr-3 mt-1 text-blue-500">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Operating Times</h3>
                <p className="text-gray-700">Mon - Fri 7 AM - 3 PM</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 mt-1 text-blue-500">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Address</h3>
                <p className="text-gray-700">
                  Mdoni Road,<br />
                  Edendale,<br />
                  Pietermaritzburg,<br />
                  KwaZulu Natal
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links & Map */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-700 hover:text-blue-500">Home</a></li>
                <li><a href="/events" className="text-gray-700 hover:text-blue-500">Events</a></li>
                <li><a href="/timetables" className="text-gray-700 hover:text-blue-500">Timetables</a></li>
                <li><a href="/about" className="text-gray-700 hover:text-blue-500">About Us</a></li>
                <li><a href="/programmes" className="text-gray-700 hover:text-blue-500">Our Programmes</a></li>
                <li><a href="/sponsors" className="text-gray-700 hover:text-blue-500">Sponsors</a></li>
                <li><a href="/contact" className="text-gray-700 hover:text-blue-500">Contact Us</a></li>
              </ul>
            </div>
            <div className="mt-2">
              <img 
                src="/api/placeholder/300/180" 
                alt="Location Map" 
                className="w-full h-40 object-cover rounded-md" 
              />
            </div>
          </div>
        </div>

        {/* Partners/Sponsors Section */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img 
              src="/api/placeholder/140/60" 
              alt="Department of Basic Education" 
              className="h-12 object-contain" 
            />
            <img 
              src="/api/placeholder/140/60" 
              alt="Umgeni Water" 
              className="h-12 object-contain" 
            />
            <img 
              src="/api/placeholder/140/60" 
              alt="mLab Southern Africa" 
              className="h-12 object-contain" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;