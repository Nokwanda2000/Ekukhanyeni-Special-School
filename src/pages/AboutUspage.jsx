import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#2d3748', overflowX: 'hidden', backgroundColor: '#F2F7FD' }}>
      {/* Header Section */}
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
        <h1 style={{ fontSize: '3rem', fontWeight: 'sans-serif', color: '#2d3748', marginBottom: '0.5rem' }}>About us </h1>
        <div style={{ fontSize: '0.875rem', color: '#718096' }}>
          <span style={{ cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#3182ce'} onMouseOut={(e) => e.target.style.color = '#718096'}>Home</span> | <span style={{ fontWeight: '500' }}>About Us</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 3rem' }}>
        {/* History and Principal section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* History section */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Our History</h2>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568' }}>
              <p style={{ marginBottom: '1rem' }}>
                Mr M.M. Mzimela was appointed as the Principal of Ekukhanyeni Special School and negotiated with the DOE for the establishment of this hostel to accommodate those learners who were far from home. The school has been a hub for a number of new developments all aimed at enhancing the overall life experience of learners with special Education needs.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                The enrolment was 360 at the time. After Mr M.M Mzimela's retirement, Mr B.B Mdlalose was appointed as the first post level 4 Principal in the Principal position on the 1st of January 2021. Now the school has more than 410 learners with different disabilities.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                At Ekukhanyeni we accommodate Phase 1 that is from Grade R (5-6 years) to Grade 3 (8-9 years) in line with C-CAPS that is differentiated and adapted to meet the Ekukhanyeni Special School's learners' needs with a strong emphasis on Self Discovery of learners with Special Needs.
              </p>
            </div>
          </div>
          
          {/* Principal image section */}
          <div>
            
            <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src="principal1.jpg" 
                alt="Principal and Staff" 
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#718096', marginTop: '0.75rem', textAlign: 'center' }}>
              Dr. Phoni Mr HB Maduna, the current principal of Ekukhanyeni Special School.
            </p>
          </div>
        </div>
        
        {/* Achievements section with image on left */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Achievements image */}
          <div>
            <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src="../../src/assets/slide2.jpg" 
                alt="School Achievements" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
          
          {/* Achievements text */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Achievements</h2>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568' }}>
              <p style={{ marginBottom: '1rem' }}>
                Ekukhanyeni Special School excel in extra-mural activities and in sports of many trophies and medals were to be found in the Trophy Cabinet. Some of these activities, such as choral music, cultural activities, soccer and netball, cricket, table tennis, athletics and so forth of regularly achieve excellent results. The first phase of the hostel facility started, that was a very big achievement. Phase one of the hostel was completed. Phase two of the hostel was completed.
              </p>
              <p>
                The school vegetable garden was established and thriving and such effort due to the hard/sufficient support staff and the lack of furniture and other items. The hostel is complete with 12 houses, each house accommodating 20 learners, completed in 2011. The two additional classrooms were completed by Operations Jumpstart in 2013. Three therapy rooms were completed in 2014. The administration block was completed in 2014 through the DOE funding. The fully equipped workshop was established in 2015. Recently, the school was nominated and selected by the KZN Department of Education as one of the Node Schools. Ekukhanyeni Special School is also proud to be participating in the Nelson Mandela University of Technology project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;