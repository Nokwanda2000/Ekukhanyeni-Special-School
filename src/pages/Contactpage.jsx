import React, { useState, useEffect } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formType, setFormType] = useState('');
  
  // Ensure page is scrollable
  useEffect(() => {
    // Force document to be scrollable
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
    
    return () => {
      // Cleanup when component unmounts
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setFormType('');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#2d3748', overflowX: 'hidden', backgroundColor: '#F2F7FD' }}>
       {/* Header section with logo background */}
       <div style={{ 
         position: 'relative', 
         padding: '4rem 0', 
         textAlign: 'center', 
         background: '#F2F7FD', 
         marginBottom: '2rem' 
       }}>
        <div style={{ 
          fontSize: '6rem', 
          fontWeight: 'bold', 
          color: '#63B3ED', 
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
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
  {/* Contact form and info section */}
  <div style={{ width: '100%', maxWidth: '72rem', margin: '0 auto', padding: '2.5rem 1rem', overflow: 'visible' }}>
    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }} className="contact-container">



      
      
      {/* Form Section */}
      <div style={{ flex: '1', minWidth: '300px' }} className="form-section">
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'sans-serif', marginBottom: '2rem', color: '#2d3748' }}>Get In Touch</h2>
        
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>



      <div style={{ display: 'flex', alignItems: 'center' }}>
      
      <div>
        <h3 style={{ fontWeight: '500', color: '#4a5568' }}>Reason</h3>
        <select style={{ 
          padding: '0.5rem', 
          border: '1px solid #e2e8f0', 
          borderRadius: '0.375rem', 
          outline: 'none', 
          width: '100%', 
          maxWidth: '200px' 
        }}>
          <option value="general">General</option>
          <option value="sponsor">Sponsor</option>
        </select>
      </div>
    </div>
  
  {/* Input fields... */}
  <div>
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        outline: 'none'
      }}
      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(66, 153, 225, 0.5)'}
      onBlur={(e) => e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}
      required
    />
  </div>
  <div>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        outline: 'none'
      }}
      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(66, 153, 225, 0.5)'}
      onBlur={(e) => e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}
      required
    />
  </div>
  <div>
    <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        outline: 'none'
      }}
      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(66, 153, 225, 0.5)'}
      onBlur={(e) => e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}
    />
  </div>
  <div>
    <textarea
      name="message"
      placeholder="Message"
      value={formData.message}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.375rem',
        height: '10rem',
        resize: 'vertical',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        outline: 'none'
      }}
      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(66, 153, 225, 0.5)'}
      onBlur={(e) => e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}
      required
    ></textarea>
  </div>
  {/* Submit Button */}
  <div>
    <button
      type="submit"
      style={{
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.75rem 3rem',
        borderRadius: '0.375rem',
        fontWeight: '500',
        transition: 'background-color 200ms',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: 'none',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
    >
      Submit
    </button>
  </div>
</form>
      </div>

      {/* Contact Info Section */}
     {/* Contact Info Section */}
<div style={{ flex: '1', minWidth: '300px', marginTop: '0' }} className="contact-info">
  <h2 style={{ fontSize: '2.25rem', fontWeight: 'sans-serif', marginBottom: '2.5rem', color: '#2d3748' }}>Our Contacts</h2>
  
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {/* Phone */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '1.5rem' }}>
        <div style={{ 
          backgroundColor: '#63b3ed', 
          color: 'white', 
          width: '2.5rem', 
          height: '2.5rem', 
          borderRadius: '9999px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1rem', width: '2rem' }} viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
        </div>
      </div>
      <div>
        <h3 style={{ fontWeight: '500', color: '#4a5568' }}>Call</h3>
        <p style={{ color: '#2d3748', fontSize: '1.25rem', fontWeight: '500' }}>+27 33 398 1325</p>
      </div>
    </div>
    
  
    
  </div>
</div>
    </div>
  </div>
</div>
      {/* Back to top button */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50 }}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            backgroundColor: 'blue', 
            color: 'white', 
            width: '3rem', 
            height: '3rem', 
            borderRadius: '9999px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: 'background-color 200ms',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#d69e2e'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ecc94b'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ContactPage;