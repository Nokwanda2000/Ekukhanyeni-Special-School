import React from 'react';
import { MapPin, Clock, Phone, User } from 'lucide-react';

// Import images (ensure they are inside the 'src/assets' folder)
import schoolLogo from '../../src/assets/Ekukhanyeni Logo 2.jpg';
import departmentLogo from '../../src/assets/Department of Educatiuon.jpg';
import UmgeniLogo from '../../src/assets/sponsor.jpg';
import mLabLogo from '../../src/assets/mlab-2017-results-infographic-.png'; 

const ClientFooter = () => {
  return (
    <footer className="bg-white py-8 px-6 md:px-8 lg:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column - School Info */}
          <div className="flex flex-col items-start space-y-6">
            <div>
              <img 
                src={schoolLogo} 
                alt="School Logo" 
                className="h-40 w-40 object-contain"
              />
            </div>
            <p className="text-lg text-gray-700 max-w-xs">
              We are committed to guide/help learners who are intellectually impaired to be socially, economically and spiritually independent.
            </p>
            <a 
              href="/staff-login" 
              className="bg-blue-500 text-white px-10 py-20 rounded-lg text-xl font-medium flex items-center hover:bg-blue-600 transition"
              aria-label="Staff Sign In"
            >
              <User size={28} className="mr-3" />
              Staff Sign In
            </a>
          </div>

          {/* Middle Column - Contact Info */}
          <div className="flex flex-col space-y-8">
            <div className="flex items-center">
              <div className="mr-4 text-blue-500">
                <Phone size={36} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2 text-xl">Call</h3>
                <p className="text-gray-700 text-lg">+27 33 398 1325</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-4 text-blue-500">
                <Clock size={36} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2 text-xl">Operating Times</h3>
                <p className="text-gray-700 text-lg">Mon - Fri 7 AM - 3 PM</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-4 text-blue-500">
                <MapPin size={36} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2 text-xl">Address</h3>
                <p className="text-gray-700 text-lg">
                  Mdoni Road,<br />
                  Edendale,<br />
                  Pietermaritzburg,<br />
                  KwaZulu Natal
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links & Map */}
          <div className="flex flex-col space-y-6">
            <div className="flex flex-row gap-6">
              {/* Quick Links Section */}
              <div className="w-1/2">
                <h3 className="font-medium text-gray-900 mb-3 text-xl">Quick Links</h3>
                <ul className="space-y-2">
                  {[
                    { name: 'Home', link: '/' },
                    { name: 'Events', link: '/events' },
                    { name: 'Timetables', link: '/timetables' },
                    { name: 'About Us', link: '/about' },
                    { name: 'Our Programmes', link: '/programmes' },
                    { name: 'Sponsors', link: '/sponsors' },
                    { name: 'Contact Us', link: '/contact' },
                  ].map((item, index) => (
                    <li key={index}>
                      <a 
                        href={item.link} 
                        className="text-gray-700 hover:text-blue-500 transition text-lg"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Map Section */}
              <div className="w-1/2">
                <iframe
                  title="School Location Map"
                  className="w-full h-64 rounded-lg border-2 border-gray-300"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.345376110522!2d30.342897775452723!3d-29.641601474064226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef5d7db109f64b9%3A0x68eb66586c45506b!2sMdoni%20Rd%2C%20Edendale%2C%20Pietermaritzburg%2C%203211!5e0!3m2!1sen!2sza!4v1710000000000"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Partners/Sponsors Section with vertical divider */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex">
            {/* Vertical line divider with extra space above */}
            <div className="w-1 border-l-2 border-gray-200 self-stretch mt-4"></div>
            <div className="flex-1 flex flex-wrap justify-center items-center gap-12 pl-6">
              <img 
                src={departmentLogo} 
                alt="Department of Basic Education" 
                className="h-36 object-contain"
              />
              <img 
                src={UmgeniLogo}
                alt="Umgeni Water" 
                className="h-36 object-contain"
              />
              <img 
                src={mLabLogo} 
                alt="mLab Southern Africa" 
                className="h-36 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;
