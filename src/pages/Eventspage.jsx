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
               <h1 style={{ fontSize: '3rem', fontWeight: 'sans-serif', color: '#2d3748', marginBottom: '0.5rem' }}>Events</h1>
               <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                 <span style={{ cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#3182ce'} onMouseOut={(e) => e.target.style.color = '#718096'}>Home</span> | <span style={{ fontWeight: '500' }}>Contacts</span>
               </div>
             </div>
             
           <section>
           <article class="bg-white p-4 rounded shadow">
      <img alt="A detailed description of the first news image" class="w-full h-40 object-cover rounded mb-4" height="400" src="https://storage.googleapis.com/a1aa/image/rusxCBzXVBiLbCc-BVvMljU9W9_SOemj2dr8k7WNI_k.jpg" width="600"/>
      <h3 class="text-xl font-bold mb-2">
       News Title 1
      </h3>
      <p class="text-gray-700">
       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      </p>
     </article>
           </section>
    </div>
  )
}
