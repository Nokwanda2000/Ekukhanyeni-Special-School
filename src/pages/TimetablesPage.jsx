import React, { useState, useEffect } from 'react';
import { db } from '../utills/FirebaseConfig'; // Import Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';

const TimetablesPage = () => {






  
  const [activeGrade, setActiveGrade] = useState('Grade 1-4 LSPID');
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Fetch timetable from Firebase based on selected grade
  const fetchTimetable = async (grade) => {
    try {
      setLoading(true);
      const timetableRef = collection(db, 'timetables');
      const q = query(timetableRef, where('grade', '==', grade));
      const querySnapshot = await getDocs(q);
      
      const entries = [];
      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() });
      });
      
      setTimetableEntries(entries);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount or when grade changes
  useEffect(() => {
    fetchTimetable(activeGrade);
  }, [activeGrade]);

  // Group entries by time for display in timetable format
  const groupedByTime = () => {
    const timeGroups = {};
    
    timetableEntries.forEach(entry => {
      if (!timeGroups[entry.time]) {
        timeGroups[entry.time] = {
          time: entry.time,
          Monday: null,
          Tuesday: null,
          Wednesday: null,
          Thursday: null,
          Friday: null
        };
      }
      
      timeGroups[entry.time][entry.day] = {
        activity: entry.activity
      };
    });
    
    // Convert to array and sort by time
    return Object.values(timeGroups).sort((a, b) => {
      // Extract start time for sorting
      const getStartTime = (timeRange) => {
        const match = timeRange?.match(/(\d+):(\d+)/);
        if (match) {
          return parseInt(match[1]) * 60 + parseInt(match[2]);
        }
        return 0;
      };
      
      return getStartTime(a.time) - getStartTime(b.time);
    });
  };

  const timetableRows = groupedByTime();


  

  // Styles for the timetable
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
     
      padding: '20px',
      backgroundColor: '#f8f9fa',
  
    },
    content: {
      width: '100%',
      maxWidth: '1200px',
      textAlign: 'center'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    gradeButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '20px'
    },
    gradeBtn: (isActive) => ({
      padding: '10px 20px',
      fontSize: '1rem',
      borderRadius: '6px',
      backgroundColor: isActive ? '#004080' : '#007bff',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.3s',
    }),
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '1rem'
    },
    thTd: {
      padding: '15px',
      textAlign: 'center',
      border: '1px solid #ccc',
      minWidth: '180px'
    },
    th: {
      backgroundColor: '#e0e0e0',
      fontWeight: 'bold'
    },
    rowEven: {
      backgroundColor: '#f9f9f9'
    },
    rowOdd: {
      backgroundColor: '#ffffff'
    },
    activity: {
      fontWeight: 'bold'
    },
    time: {
      fontSize: '0.9rem',
      color: '#666'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
      <div style={{ 
        position: 'relative', 
        padding: '4rem 0', 
        textAlign: 'center', 
        background: '#F2F7FD', 
        // marginBottom: '15rem' 
      
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
        <h1 style={{ fontSize: '3rem', fontWeight: 'sans-serif', color: '#2d3748', marginBottom: '0.5rem' }}>Timetables</h1>
        <div style={{ fontSize: '0.875rem', color: '#718096' }}>
          <span style={{ cursor: 'pointer' }} onMouseOver={(e) => e.target.style.color = '#3182ce'} onMouseOut={(e) => e.target.style.color = '#718096'}>Home</span> | <span style={{ fontWeight: '500' }}>Timetables</span>
        </div>
</div>
        {/* Grade Selection Buttons */}
        <div style={styles.gradeButtons}>
          {grades.map((grade) => (
            <button
              key={grade}
              style={styles.gradeBtn(activeGrade === grade)}
              onClick={() => setActiveGrade(grade)}
            >
              {grade}
            </button>
          ))}
        </div>

        {/* Timetable Table */}
        <div style={styles.tableContainer}>
          {loading ? (
            <p>Loading timetable...</p>
          ) : timetableEntries.length === 0 ? (
            <p>No timetable entries found for {activeGrade}.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={{ ...styles.thTd, ...styles.th }}>Time</th>
                  {days.map((day) => (
                    <th key={day} style={{ ...styles.thTd, ...styles.th }}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetableRows.map((row, rowIndex) => (
                  <tr key={rowIndex} style={rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td style={styles.thTd}>
                      <div style={styles.time}>{row.time}</div>
                    </td>
                    {days.map((day) => (
                      <td key={day} style={styles.thTd}>
                        {row[day] && (
                          <div style={styles.activity}>{row[day].activity}</div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimetablesPage;