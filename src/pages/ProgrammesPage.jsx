import React from 'react';
import { useInView } from 'react-intersection-observer';

const OurProgrammes = () => {
  // Animation hook for left-side images
  const useAnimatedImageLeft = () => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return {
      ref,
      style: {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-50px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }
    };
  };

  // Animation hook for right-side images
  const useAnimatedImageRight = () => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return {
      ref,
      style: {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(50px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }
    };
  };

  // Animation for program cards (from bottom)
  const useAnimatedCard = (delay = 0) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return {
      ref,
      style: {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }
    };
  };

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
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'sans-serif', 
          color: '#1E3A8A', 
          marginBottom: '0.5rem',
          opacity: 0,
          animation: 'fadeInUp 1s ease-out forwards'
        }}>Our Programmes</h1>
        <div style={{ fontSize: '0.875rem', color: '#718096' }}>
          <span style={{ cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#3182ce'} onMouseOut={(e) => e.target.style.color = '#718096'}>Home</span> | <span style={{ fontWeight: '500' }}>Programmes</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 3rem' }}>
        {/* Our Curriculum Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Image section with left animation */}
          <div {...useAnimatedImageLeft()}>
            <div style={{ 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              position: 'relative',
              ':hover': {
                transform: 'translateY(-5px)'
              },
              transition: 'transform 0.3s ease'
            }}>
              <img 
                src="/IMG-20240319-WA0001.jpg" 
                alt="Ekukhanyeni Centre Children" 
                style={{ 
                  width: '100%', 
                  display: 'block',
                  transition: 'transform 0.5s ease',
                  ':hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </div>
          </div>
          
          {/* Our Curriculum text */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Our Curriculum</h2>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568' }}>
              <p style={{ marginBottom: '1rem' }}>
                Our curriculum has three parts to it. These are:
              </p>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>DCAPS, which focuses mainly on Grade 1 to Grade 3 students.</li>
                <li>LSPID, which focuses on students from Grade 1 to Grade 4.</li>
                <li>And Skills Development, which focuses on Grade 4 to Grade 5.</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* What is DCAPS section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* DCAPS text */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>What is DCAPS?</h2>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568' }}>
              <p style={{ marginBottom: '1rem' }}>
                DCAPS is an abbreviation for Differentiated Curriculum And Assessment Policy Statement. At its core, it is the CAPS system used across South Africa that has been suitably adjusted for our students with disabilities.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                This programme is structured in such a way that it meets responsive to a wide range of learners with moderate to severe intellectual disability and learning difficulties across Grade 1 to 3. The other goal is to help develop their personality, talents and creativity, as well as their mental and physical abilities.
              </p>
            </div>
          </div>
          
          {/* DCAPS image with right animation */}
          <div {...useAnimatedImageRight()}>
            <div style={{ 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover img': {
                transform: 'scale(1.05)'
              }
            }}>
              <img 
                src="/IMG-20240221-WA0019.jpg" 
                alt="Teacher explaining to students" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
              />
            </div>
          </div>
        </div>

        {/* What is LSPID section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* LSPID image with left animation */}
          <div {...useAnimatedImageLeft()}>
            <div style={{ 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover img': {
                transform: 'scale(1.05)'
              }
            }}>
              <img 
                src="/IMG-20240221-WA0009.jpg"
                alt="Teacher explaining to students" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
              />
            </div>
          </div>
          
          {/* LSPID text */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>What is LSPID?</h2>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568' }}>
              <p style={{ marginBottom: '1rem' }}>
              LSPID is the Learning Programme (LP) for children with Severe to Profound Intellectual Disability (SPID).
              </p>
              <p style={{ marginBottom: '1rem' }}>
              The goal of this programme is to asses the learning needs (strengths and weeknesses) of children with SPID, plan intergrated programmes and activities to ensure maximum development and community intergration and intergrate the Learning Programme into the Daily Programme by means of illustrative examples.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Development section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Skills Development text */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Skills Development</h2>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568' }}>
              <p style={{ marginBottom: '1rem' }}>
              From Grade 4 to Grade 5 our students mostly focus on improving skills and developing new ones.
              </p>
              <p style={{ marginBottom: '1rem' }}>
              These include the likes of leatherwork, woodwork and printing. The students also take part in the agricultrural side of skills including gardening, sewing and garmet making. This is done in the hopes that they can be prepared for life outside of the classroom.
              </p>
            </div>
          </div>
          
          {/* Skills image with right animation */}
          <div {...useAnimatedImageRight()}>
            <div style={{ 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover img': {
                transform: 'scale(1.05)'
              }
            }}>
              <img 
                src="/IMG-20240221-WA0016.jpg" 
                alt="Teacher explaining to students" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  display: 'block',
                  transition: 'transform 0.5s ease'
                }}
              />
            </div>
          </div>
        </div>

        {/* Programs Grid */}
        <div style={{ marginTop: '2rem', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem', 
            textAlign: 'center',
            opacity: 0,
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '0.2s'
          }}>
            Our Skills Development Programs
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* Woodwork */}
            <div {...useAnimatedCard(0.1)} style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-5px)'
              },
              transition: 'all 0.3s ease'
            }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="/IMG-20240221-WA0007.jpg" 
                  alt="Woodwork class" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    ':hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </div>
              <div style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                borderTop: '1px solid #e2e8f0',
                fontWeight: '500'
              }}>
                Woodwork
              </div>
            </div>

            {/* Leather Work */}
            <div {...useAnimatedCard(0.2)} style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-5px)'
              },
              transition: 'all 0.3s ease'
            }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="/IMG-20240221-WA0002.jpg" 
                  alt="Leather work class" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    ':hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </div>
              <div style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                borderTop: '1px solid #e2e8f0',
                fontWeight: '500'
              }}>
                Leather Work
              </div>
            </div>

            {/* Gardening */}
            <div {...useAnimatedCard(0.3)} style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-5px)'
              },
              transition: 'all 0.3s ease'
            }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="/gardening.jpg" 
                  alt="Students gardening" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    ':hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </div>
              <div style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                borderTop: '1px solid #e2e8f0',
                fontWeight: '500'
              }}>
                Gardening
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem'
          }}>
            {/* Sewing */}
            <div {...useAnimatedCard(0.4)} style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-5px)'
              },
              transition: 'all 0.3s ease'
            }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="/IMG-20240221-WA0024.jpg" 
                  alt="Sewing class" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    ':hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </div>
              <div style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                borderTop: '1px solid #e2e8f0',
                fontWeight: '500'
              }}>
                Sewing
              </div>
            </div>

            {/* Bead work */}
            <div {...useAnimatedCard(0.5)} style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-5px)'
              },
              transition: 'all 0.3s ease'
            }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="/bead2.jpg" 
                  alt="Bead work class" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    ':hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </div>
              <div style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                borderTop: '1px solid #e2e8f0',
                fontWeight: '500'
              }}>
                Bead work
              </div>
            </div>

            {/* Sports */}
            <div {...useAnimatedCard(0.6)} style={{ 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              overflow: 'hidden',
              ':hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-5px)'
              },
              transition: 'all 0.3s ease'
            }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="/sport1.jpg" 
                  alt="Students playing sports" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    ':hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </div>
              <div style={{ 
                padding: '0.75rem', 
                textAlign: 'center', 
                borderTop: '1px solid #e2e8f0',
                fontWeight: '500'
              }}>
                Sports
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OurProgrammes;