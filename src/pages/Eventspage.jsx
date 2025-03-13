import React, { useState } from 'react';

export default function Eventspage({ image, name, location, description }) {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div 
        style={{ 
          position: 'relative', 
          padding: '4rem 0', 
          textAlign: 'center', 
          background: '#F2F7FD', 
          marginBottom: '2rem' 
        }}
      >
        <div 
          style={{ 
            fontSize: '10vw', 
            fontWeight: 'bold', 
            color: '#0082FC', 
            opacity: '0.2', 
            position: 'absolute', 
            inset: '0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          Ekukhanyeni
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 'sans-serif', color: '#2d3748', marginBottom: '0.5rem' }}>
          Events
        </h1>
        <div style={{ fontSize: '0.875rem', color: '#718096' }}>
          <span 
            style={{ cursor: 'pointer' }} 
            onMouseOver={(e) => e.target.style.color = '#3182ce'} 
            onMouseOut={(e) => e.target.style.color = '#718096'}
          >
            Home
          </span> | <span style={{ fontWeight: '500' }}>Contacts</span>
        </div>
      </div>
      
      <div className="max-w-sm p-2.5rem 1rem rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full h-48 object-cover" src={image} alt={name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{location}</p>
          <p className="text-gray-600 text-sm mt-2">
            {showMore 
              ? description 
              : description ? `${description.substring(0, 100)}...` : 'No description available'
            }
          </p>
          <button
            onClick={handleToggle}
            className="text-blue-500 hover:underline mt-2"
          >
            {showMore ? 'View Less' : 'View More'}
          </button>
        </div>
      </div>
    </div>
  );
}
