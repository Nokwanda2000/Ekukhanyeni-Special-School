import React, { useState, useEffect } from "react";
import { db } from '../utills/FirebaseConfig'; // Assuming your firebase.js file is in the same directory
import { collection, getDocs } from 'firebase/firestore'

const Timetablespage = () => {
  const [selectedGrade, setSelectedGrade] = useState("Grade 4 Skills");
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const grades = ["Grade 1-4 LSPID", "Grade 1-3 D-CAPS", "Grade 4 Skills", "Grade 5 Skills"];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Fetch timetable data from Firestore
  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        setLoading(true);
        const timetableCollection = collection(db, 'timetables');
        const timetableSnapshot = await getDocs(timetableCollection);
        const timetableList = timetableSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTimetableData(timetableList);
      } catch (error) {
        console.error("Error fetching timetable data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetableData();
  }, []);

  // Filter data for the selected grade
  const filteredData = timetableData.filter(entry => entry.grade === selectedGrade);
  
  // Get unique time slots for the filtered data
  const getUniqueTimeSlots = () => {
    const slots = filteredData
      .map(entry => ({
        startTime: entry.startTime,
        endTime: entry.endTime
      }))
      .filter((value, index, self) => 
        index === self.findIndex(t => 
          t.startTime === value.startTime && t.endTime === value.endTime
        )
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    return slots;
  };
  
  const timeSlots = getUniqueTimeSlots();
  
  // Get data for a specific time slot and day
  const getCellData = (timeSlot, day) => {
    return filteredData.find(entry => 
      entry.startTime === timeSlot.startTime && 
      entry.endTime === timeSlot.endTime && 
      entry.weekday === day
    );
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div style={{ fontSize: "18px", fontWeight: "500", color: "#4B5563" }}>
          Loading timetable data...
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px" }}>

       {/* Header Section */}
       <div style={{
        position: 'relative',
        padding: '4rem 0',
        textAlign: 'center',
        background: '#F2F7FD',
        marginBottom: '2rem',
        width: '100%'
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
     
    
        <h1 style={{ fontSize: '3rem', fontWeight: 'sans-serif', color: '#1E3A8A', marginBottom: '0.5rem' }}>School Timetables</h1>
        <div style={{ fontSize: '0.875rem', color: '#718096' }}>
          <span style={{ cursor: 'pointer'}} onMouseOver={(e) => e.target.style.color = '#3182ce'} onMouseOut={(e) => e.target.style.color = '#718096'}>Home</span> | <span style={{ fontWeight: '500',  }}>School Timetables</span>
        </div>
      </div>
      
     
      
      {/* Grade Selection Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
        {grades.map((grade) => (
          <button
            key={grade}
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "1px solid",
              fontSize: "18px",
              fontWeight: "500",
              transition: "all 0.3s",
              backgroundColor: selectedGrade === grade ? "#3B82F6" : "white",
              color: selectedGrade === grade ? "white" : "#4B5563",
              borderColor: selectedGrade === grade ? "#3B82F6" : "#D1D5DB",
              cursor: "pointer"
            }}
            onClick={() => setSelectedGrade(grade)}
          >
            {grade}
          </button>
        ))}
      </div>
      
      {/* Schedule Table */}
      <div style={{ width: "100%", maxWidth: "1200px", border: "1px solid #D1D5DB", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#F3F4F6", borderBottom: "1px solid #D1D5DB" }}>
              <th style={{ padding: "16px", fontSize: "18px", fontWeight: "600", color: "#374151", borderRight: "1px solid #D1D5DB" }}>
                Time
              </th>
              {weekdays.map((day) => (
                <th key={day} style={{ padding: "16px", fontSize: "18px", fontWeight: "600", color: "#374151", borderRight: "1px solid #D1D5DB" }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, index) => (
              <tr key={`${timeSlot.startTime}-${timeSlot.endTime}`} style={{ borderTop: "1px solid #D1D5DB" }}>
                <td style={{ padding: "16px", fontSize: "16px", fontWeight: "600", color: "#374151", backgroundColor: "#F9FAFB", borderRight: "1px solid #D1D5DB", textAlign: "center" }}>
                  {timeSlot.startTime} - {timeSlot.endTime}
                </td>
                {weekdays.map((day) => {
                  const cellData = getCellData(timeSlot, day);
                  return (
                    <td 
                      key={day} 
                      style={{ 
                        padding: "16px", 
                        borderRight: "1px solid #D1D5DB",
                        backgroundColor: cellData ? "#F0F9FF" : "white",
                        verticalAlign: "top",
                        minHeight: "80px"
                      }}
                    >
                      {cellData ? (
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "16px", fontWeight: "500", color: "#111827", marginBottom: "4px" }}>
                            {cellData.activity}
                          </div>
                        </div>
                      ) : (
                        <div style={{ 
                          color: "#9CA3AF", 
                          textAlign: "center", 
                          fontSize: "14px",
                          fontStyle: "italic"
                        }}>
                          No activity scheduled
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetablespage;