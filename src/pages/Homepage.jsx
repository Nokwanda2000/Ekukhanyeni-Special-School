import React from 'react';
import { Link } from 'react-router-dom';

const EkukhanyeniProfessionalSchool = () => {
  return (
    <>
    {/* Hero Section - Full Width */}
    <section style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/slide2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'clamp(600px, 50vh, 500px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        width: '100%',

      }}>
        <div style={{width: '100%', padding: '0 20px'}}>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 42px)',
            fontWeight: '700',
            marginBottom: '16px'
          }}>Welcome to Ekukhanyeni Special School</h1>
          <p style={{
            fontSize: 'clamp(16px, 4vw, 20px)',
            marginBottom: '24px',
            fontWeight: '300'
          }}>
            Empowering intellectually challenged learners to become independent and thrive in society
          </p>
          <Link to="/AboutUspage" style={{ color: '#0088cc', textDecoration: 'none', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          <button 
            style={{
              backgroundColor: '#2563EB',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: 'clamp(14px, 3vw, 16px)',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            Learn More
          </button>
          </Link>
        </div>
      </section>
    <div style={{
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#333',
      lineHeight: '1.6',
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
      backgroundColor: '#f8f9fa',
      overflowX: 'hidden',
    }}>
    
      

      {/* Mission Statement */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 30px)',
            color: '#1848A1',
            marginBottom: '24px',
            fontWeight: '600'
          }}>Our Mission</h2>
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 18px)',
            lineHeight: '1.8',
            color: '#555'
          }}>
            We are committed to guide and help learners who are intellectually impaired to become socially, economically, and spiritually independent members of society through specialized education and support.
          </p>
        </div>
      </section>

      {/* Support Section */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: '#f8f9fa',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative text */}
        <div style={{
          position: 'absolute',
          fontSize: 'clamp(80px, 20vw, 150px)',
          color: 'rgba(173, 216, 230, 0.2)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          fontWeight: '700',
          zIndex: '0'
        }}>
          Ekukhanyeni
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: '1'
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 30px)',
            color: '#1848A1',
            marginBottom: '24px',
            fontWeight: '600'
          }}>Feel Free To Help Out</h2>
          <p style={{
            fontSize: 'clamp(16px, 3.5vw, 18px)',
            lineHeight: '1.6',
            color: '#555',
            maxWidth: '800px',
            marginBottom: '40px'
          }}>
            Become a donor, sponsor, or volunteer at our school and make a lasting impact on the lives of students and the community. Your support helps us provide quality education and care.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            maxWidth: '1000px'
          }}>
            <div style={{
              flex: '1 1 300px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '30px 20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center',
              minWidth: '250px'
            }}>
              <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '15px' }}>Donate</h3>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>Make a one-time or recurring donation to support our programs and facilities.</p>
              <button style={{
                backgroundColor: '#2563EB',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>Donate Now</button>
            </div>
            <div style={{
              flex: '1 1 300px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '30px 20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center',
              minWidth: '250px'
            }}>
              <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '15px' }}>Sponsor</h3>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>Sponsor a student or a specific program to help sustain our educational initiatives.</p>
              <button style={{
                backgroundColor: '#2563EB',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>Sponsor</button>
            </div>
            <div style={{
              flex: '1 1 300px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '30px 20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center',
              minWidth: '250px'
            }}>
              <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '15px' }}>Volunteer</h3>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>Donate your time and skills to help our students learn and grow in a supportive environment.</p>
              <button style={{
                backgroundColor: '#2563EB',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>Join Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section style={{
        padding: '60px 20px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 30px)',
            color: '#1848A1',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: '600'
          }}>Our School Life</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center'
          }}>
            <div style={{ flex: '1 1 300px', minWidth: '250px', maxWidth: '400px' }}>
              <img 
                src="/slide 3.jpg" 
                alt="Students in classroom" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
            </div>
            <div style={{ flex: '1 1 300px', minWidth: '250px', maxWidth: '400px' }}>
              <img 
                src="/bead2.jpg" 
                alt="Arts and crafts activities" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
            </div>
            <div style={{ flex: '1 1 300px', minWidth: '250px', maxWidth: '400px' }}>
              <img 
                src="/gardening.jpg" 
                alt="Outdoor activities" 
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
     
export default EkukhanyeniProfessionalSchool