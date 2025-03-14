import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { db } from '../utills/FirebaseConfig'; // Import Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Ensure page is scrollable
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
    
    return () => {
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

  
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Add a timestamp to the form data
    const dataWithTimestamp = {
      ...formData,
      timestamp: serverTimestamp()  // Correctly using serverTimestamp()
    };

    // Add a new document with a generated ID
    await addDoc(collection(db, 'contacts'), dataWithTimestamp);
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error submitting form. Please try again.');
  }
};
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#2d3748', overflowX: 'hidden', backgroundColor: '#F2F7FD' }}>
      <div style={{ 
        position: 'relative', 
        padding: '4rem 0', 
        textAlign: 'center', 
        background: '#F2F7FD', 
        marginBottom: '2rem' 
      }}>
        <div style={{ 
          fontSize: '10vw', 
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
        <div style={{ width: '100%', maxWidth: '72rem', margin: '0 auto', padding: '2.5rem 1rem', overflow: 'visible' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', flexWrap: 'wrap' }} className="contact-container">
            <div style={{ flex: '1', minWidth: '300px', flexBasis: '45%' }} className="form-section">
              <h2 style={{ fontSize: '2.25rem', fontWeight: 'sans-serif', marginBottom: '2rem', color: '#2d3748' }}>Get In Touch</h2>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: '500', color: '#4a5568' }}>Reason</span>
                    <select 
                      style={{ 
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        outline: 'none'
                      }}
                      name="reason"
                      onChange={handleChange}
                      required
                    >
                      <option value="general">General</option>
                      <option value="sponsor">Sponsor</option>
                    </select>
                  </div>
                </div>
                
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
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#0082FB',
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
                    onMouseOut={(e) => e.target.style.backgroundColor = '#0082FB'}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            <div style={{ flex: '1', minWidth: '300px', marginTop: '0', flexBasis: '45%' }} className="contact-info">
              <h2 style={{ fontSize: '2.25rem', fontWeight: 'sans-serif', marginBottom: '2.5rem', color: '#2d3748' }}>Our Contacts</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '1.5rem' }}>
                    <div>
                      <Phone color="#63b3ed" />
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
    </div>
  );
};

export default ContactPage;
