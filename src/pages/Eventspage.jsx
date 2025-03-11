import React from 'react'

export default function Eventspage() {
  return (
    <div>
         <div style={{ 
               position: 'relative', 
               padding: '4rem 0', 
               textAlign: 'center', 
               background: '#F2F7FD', 
               marginBottom: '2rem' 
             }}>
       
       <div style={{ 
           fontSize: '10vw', // Use viewport width for responsive font size
           fontWeight: 'bold', 
           color: '#0082FC', 
           opacity: '0.2', 
           position: 'absolute', 
           inset: '0', 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center' 
       }}>
           Ekukhanyeni
       </div>
               <h1 style={{ fontSize: '3rem', fontWeight: 'sans-serif', color: '#2d3748', marginBottom: '0.5rem' }}>Contacts</h1>
               <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                 <span style={{ cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#3182ce'} onMouseOut={(e) => e.target.style.color = '#718096'}>Home</span> | <span style={{ fontWeight: '500' }}>Contacts</span>
               </div>
             </div>
             
             {/* Map section - Full width container */}
             <div style={{ width: '100%', height: '24rem', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.4962773811662!2d30.351424910789202!3d-29.647370112872633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef6bd30916269f3%3A0x44fe6382070879e3!2sEkukhanyeni%20Special%20School!5e0!3m2!1sen!2sza!4v1741684158708!5m2!1sen!2sza"
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                 allowFullScreen="" 
                 loading="lazy"
                 title="Ekukhanyeni Special School Map"
               ></iframe>
             </div>
    </div>
  )
}
