import React, { useState, useEffect } from 'react';
import { db } from '../utills/FirebaseConfig';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  deleteDoc, 
  getDocs,
  query,
  where 
} from 'firebase/firestore';

const TimetableCMS = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    timeBlock: '',
    weekday: '',
    grade: '',
    startTime: '',
    endTime: '',
    activity: '',
  });
  const [selectedGrade, setSelectedGrade] = useState('Grade 1-4 LSPID');
  const [showListView, setShowListView] = useState(false);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const grades = ['Grade 1-4 LSPID', 'Grade 1-3 D-CAPS', 'Grade 4 Skills', 'Grade 5 Skills'];
  const timeBlocks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

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

  const handleCellClick = (block, day) => {
    // Find existing entry for this cell
    const entry = timetableData.find(
      e => e.timeBlock === block && e.weekday === day && e.grade === selectedGrade
    );
    
    if (entry) {
      // Edit existing entry
      setSelectedEntry(entry);
      setFormData({
        timeBlock: entry.timeBlock,
        weekday: entry.weekday,
        grade: entry.grade,
        startTime: entry.startTime,
        endTime: entry.endTime,
        activity: entry.activity,
      });
    } else {
      // Create new entry
      setSelectedEntry(null);
      setFormData({
        timeBlock: block,
        weekday: day,
        grade: selectedGrade,
        startTime: '',
        endTime: '',
        activity: '',
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      if (selectedEntry) {
        // Update existing entry in Firestore
        const entryRef = doc(db, 'timetables', selectedEntry.id);
        await updateDoc(entryRef, formData);
        
        // Update state
        setTimetableData(timetableData.map(entry => 
          entry.id === selectedEntry.id ? { ...entry, ...formData } : entry
        ));
      } else {
        // Create new entry in Firestore
        const docRef = await addDoc(collection(db, 'timetables'), formData);
        
        // Update state with new entry including the Firestore document ID
        const newEntry = {
          id: docRef.id,
          ...formData
        };
        setTimetableData([...timetableData, newEntry]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving timetable entry: ", error);
      alert("Error saving timetable entry. Please try again.");
    }
  };

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
  };

  const handleAddNew = () => {
    setSelectedEntry(null);
    setFormData({
      timeBlock: '',
      weekday: '',
      grade: selectedGrade,
      startTime: '',
      endTime: '',
      activity: '',
    });
    setShowModal(true);
  };

  const handleDeleteEntry = async (id) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'timetables', id));
      
      // Update state
      setTimetableData(timetableData.filter(entry => entry.id !== id));
    } catch (error) {
      console.error("Error deleting timetable entry: ", error);
      alert("Error deleting timetable entry. Please try again.");
    }
  };

  // Get data for the selected grade
  const filteredData = timetableData.filter(entry => entry.grade === selectedGrade);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading timetable data...</div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3b82f6',
        marginBottom: '24px'
      }}>Timetables</h1>
      
      {/* View toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <button 
          onClick={handleAddNew}
          style={{
            backgroundColor: '#0095ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 15px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          + Add timetable
        </button>
        
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <button 
            onClick={() => setShowListView(false)}
            style={{
              backgroundColor: !showListView ? '#0095ff' : '#e5e5e5',
              color: !showListView ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: 'pointer'
            }}
          >
            Grid View
          </button>
          <button 
            onClick={() => setShowListView(true)}
            style={{
              backgroundColor: showListView ? '#0095ff' : '#e5e5e5',
              color: showListView ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: 'pointer'
            }}
          >
            List View
          </button>
        </div>
      </div>
      
      {/* Grade filter buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '24px'
      }}>
        {grades.map(grade => (
          <button 
            key={grade} 
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              backgroundColor: selectedGrade === grade ? '#3b82f6' : '#dbeafe',
              color: selectedGrade === grade ? 'white' : '#3b82f6',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onClick={() => handleGradeChange(grade)}
          >
            {grade}
          </button>
        ))}
      </div>
      
      {/* List View */}
      {showListView && (
        <div style={{
          overflowX: 'auto',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Block</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Weekday</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Grade</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Time</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Activity</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timetableData.filter(entry => entry.grade === selectedGrade).map(entry => (
                <tr key={entry.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>{entry.timeBlock}</td>
                  <td style={{ padding: '12px' }}>{entry.weekday}</td>
                  <td style={{ padding: '12px' }}>{entry.grade}</td>
                  <td style={{ padding: '12px' }}>{entry.startTime} - {entry.endTime}</td>
                  <td style={{ padding: '12px' }}>{entry.activity}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      <button
                        onClick={() => {
                          setSelectedEntry(entry);
                          setFormData({
                            timeBlock: entry.timeBlock,
                            weekday: entry.weekday,
                            grade: entry.grade,
                            startTime: entry.startTime,
                            endTime: entry.endTime,
                            activity: entry.activity,
                          });
                          setShowModal(true);
                        }}
                        style={{
                          backgroundColor: '#ffdd00',
                          color: 'black',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        style={{
                          backgroundColor: '#ff3b5c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          fontWeight: 'bold'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Grid View */}
      {!showListView && (
        <div style={{
          overflowX: 'auto',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr>
                <th style={{
                  border: '1px solid #e5e7eb',
                  padding: '8px',
                  backgroundColor: '#f3f4f6'
                }}>Time Block</th>
                {weekdays.map(day => (
                  <th key={day} style={{
                    border: '1px solid #e5e7eb',
                    padding: '8px',
                    backgroundColor: '#f3f4f6'
                  }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeBlocks.map(block => (
                <tr key={block}>
                  <td style={{
                    border: '1px solid #e5e7eb',
                    padding: '8px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    backgroundColor: '#f9fafb'
                  }}>{block}</td>
                  {weekdays.map(day => {
                    const entry = filteredData.find(
                      e => e.timeBlock === block && e.weekday === day
                    );
                    
                    return (
                      <td 
                        key={day} 
                        style={{
                          border: '1px solid #e5e7eb',
                          padding: '8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          height: '80px',
                          verticalAlign: 'top',
                          backgroundColor: entry ? '#f0f9ff' : 'white'
                        }}
                        onClick={() => handleCellClick(block, day)}
                      >
                        {entry ? (
                          <div>
                            <div style={{
                              fontWeight: '500',
                              marginBottom: '4px'
                            }}>{entry.activity}</div>
                            <div style={{
                              fontSize: '0.875rem',
                              color: '#4b5563'
                            }}>
                              {entry.startTime} - {entry.endTime}
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            color: '#9ca3af',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>Empty</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Edit/Create Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '500px'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>
              {selectedEntry ? 'Edit Timetable Entry' : 'Create New Entry'}
            </h2>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#4b5563',
                  marginBottom: '4px'
                }}>Time Block</label>
                <select 
                  name="timeBlock"
                  value={formData.timeBlock}
                  onChange={handleInputChange}
                  style={{
                    marginTop: '4px',
                    display: 'block',
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '8px',
                    backgroundColor: selectedEntry ? '#f3f4f6' : 'white'
                  }}
                  disabled={selectedEntry !== null}
                >
                  <option value="">Select Time Block</option>
                  {timeBlocks.map(block => (
                    <option key={block} value={block}>Block {block}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#4b5563',
                  marginBottom: '4px'
                }}>Weekday</label>
                <select 
                  name="weekday"
                  value={formData.weekday}
                  onChange={handleInputChange}
                  style={{
                    marginTop: '4px',
                    display: 'block',
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '8px',
                    backgroundColor: selectedEntry ? '#f3f4f6' : 'white'
                  }}
                  disabled={selectedEntry !== null}
                >
                  <option value="">Select Weekday</option>
                  {weekdays.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#4b5563',
                  marginBottom: '4px'
                }}>Grade</label>
                <input 
                  type="text"
                  name="grade"
                  value={formData.grade}
                  style={{
                    marginTop: '4px',
                    display: 'block',
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '8px',
                    backgroundColor: '#f3f4f6'
                  }}
                  readOnly
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#4b5563',
                  marginBottom: '4px'
                }}>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  style={{
                    marginTop: '4px',
                    display: 'block',
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#4b5563',
                  marginBottom: '4px'
                }}>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  style={{
                    marginTop: '4px',
                    display: 'block',
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#4b5563',
                  marginBottom: '4px'
                }}>Activity</label>
                <input
                  type="text"
                  name="activity"
                  value={formData.activity}
                  onChange={handleInputChange}
                  style={{
                    marginTop: '4px',
                    display: 'block',
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                  placeholder="Enter activity name"
                />
              </div>
            </div>
            
            <div style={{
              marginTop: '24px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: '#d1d5db',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveChanges}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {selectedEntry ? 'Save Changes' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableCMS;