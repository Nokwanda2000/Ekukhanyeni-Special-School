import React, { useState } from 'react';

const TimetablesPage = () => {
  const [activeGrade, setActiveGrade] = useState('Grade 1-4 LSPID');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timeSlots = [
    { time: '7:50 AM - 8 AM', activity: 'Devotion' },
    { time: '8 AM - 9 AM', activity: 'Life Skills Self Help' },
    { time: '9 AM - 10 AM', activity: 'Spatial & Conceptual Skills' },
    { time: '10 AM - 10:30 AM', activity: 'Feeding Time' },
    { time: '10:30 AM - 11 AM', activity: 'Break Time' }
  ];

  const grades = ['Grade 1-4 LSPID', 'Grade 1-3 D-CAPS', 'Grade 4 Skills', 'Grade 5 Skills'];

  // Styles
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f8f9fa'
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
    subTitle: {
      display: 'block',
      color: '#b0b0b0'
    },
    mainTitle: {
      color: '#333'
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
      ...(isActive ? {} : { ':hover': { backgroundColor: '#0056b3' } }) // Hover effect
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
        {/* Title */}
        <h1 style={styles.title}>
          <span style={styles.subTitle}>Ekukhanyeni</span>
          <span style={styles.mainTitle}>Timetables</span>
        </h1>

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

        {/* Timetable */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                {days.map((day) => (
                  <th key={day} style={{ ...styles.thTd, ...styles.th }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, index) => (
                <tr key={index} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  {days.map((day, dayIndex) => (
                    <td key={`${index}-${dayIndex}`} style={styles.thTd}>
                      <div style={styles.activity}>{slot.activity}</div>
                      <div style={styles.time}>{slot.time}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetablesPage;



