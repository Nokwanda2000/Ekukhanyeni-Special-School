import React, { useState, useEffect } from 'react';
import { db } from '../utills/FirebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const TimetableCMS = () => {
  const [grade, setGrade] = useState('');
  const [day, setDay] = useState('');
  const [activity, setActivity] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [timetableEntries, setTimetableEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('Grade 1');
  const [loading, setLoading] = useState(true);

  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Fetch timetable data from Firestore
  useEffect(() => {
    const fetchTimetableEntries = async () => {
      try {
        setLoading(true);
        const timetableRef = collection(db, 'timetables');
        const snapshot = await getDocs(timetableRef);
        const entries = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTimetableEntries(entries);
      } catch (error) {
        console.error("Error fetching timetable entries:", error);
        setMessage('Error loading timetable data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTimetableEntries();
  }, []);

  // Add new timetable entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      const timetableRef = collection(db, 'timetables');
      const newEntry = {
        grade,
        day,
        activity,
        time,
        createdAt: new Date()
      };
      
      const docRef = await addDoc(timetableRef, newEntry);
      
      // Add the new entry to state with its ID
      setTimetableEntries([...timetableEntries, { id: docRef.id, ...newEntry }]);
      
      setMessage('Timetable successfully added!');
      setGrade('');
      setDay('');
      setActivity('');
      setTime('');
    } catch (error) {
      console.error("Error adding timetable:", error);
      setMessage('Error adding timetable.');
    }
  };

  // Remove timetable entry
  const handleRemoveEntry = async (id) => {
    try {
      await deleteDoc(doc(db, 'timetables', id));
      setTimetableEntries(timetableEntries.filter(entry => entry.id !== id));
      setMessage('Entry removed successfully.');
    } catch (error) {
      console.error("Error removing entry:", error);
      setMessage('Error removing entry.');
    }
  };

  // Filter entries based on active tab/grade
  const filteredEntries = timetableEntries.filter(entry => 
    entry.grade === activeTab || entry.grade.includes(activeTab)
  );

  // Function to determine cell background color based on subject
  const getCellColor = (subject) => {
    if (!subject) return 'white';
    
    const colors = {
      'Reading': '#d4e6f1',
      'Math': '#f5cba7',
      'Science': '#d5f5e3',
      'Art': '#f5e7f1',
      'Music': '#e8daef',
      'Social Studies': '#fdebd0',
      'P.E.': '#fcf3cf',
      'Recess': '#fcf8e3',
      'Snack Time': '#fcf8e3',
      'Break': '#fcf8e3',
      'Lunch': '#fcf8e3'
    };
    
    // Check if any key is a substring of the subject
    for (const [key, value] of Object.entries(colors)) {
      if (subject.includes(key)) {
        return value;
      }
    }
    
    return 'white';
  };

  // Group entries by time for display in timetable format
  const groupedByTime = () => {
    const timeGroups = {};
    
    filteredEntries.forEach(entry => {
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
        activity: entry.activity,
        id: entry.id
      };
    });
    
    // Convert to array and sort by time
    return Object.values(timeGroups).sort((a, b) => {
      // Extract start time for sorting
      const getStartTime = (timeRange) => {
        const match = timeRange.match(/(\d+):(\d+)/);
        if (match) {
          return parseInt(match[1]) * 60 + parseInt(match[2]);
        }
        return 0;
      };
      
      return getStartTime(a.time) - getStartTime(b.time);
    });
  };

  const timetableRows = groupedByTime();

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-gray-50 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Timetable</h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-80 px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <br></br>
      <br></br>

      <button className="mb-10 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 flex items-center gap-2 transition-colors">
        <span className="font-bold">+</span> Add new Timetable
      </button>
      <br></br>
      <br></br>
      {/* Tabs */}
      <div className="flex mb-8 overflow-x-auto space-x-4">
        {grades.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-10 py-10 mr-10 font-medium transition-colors ${
              activeTab === tab 
                ? index === 0 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : index === grades.length - 1 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-gray-800 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
        {/* <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white ml-auto shadow-md transition-colors">
          Save changes
        </button> */}
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="text-gray-500">Loading timetable data...</p>
        </div>
      ) : timetableRows.length === 0 ? (
        <div className="text-center py-16 border bg-white">
          <p className="text-gray-500">No timetable entries for {activeTab}.</p>
          <p className="text-gray-400 text-sm mt-2">Add entries using the form below.</p>
          <br></br>
      <br></br>
        </div>
        
      ) : (
        
        <div className="overflow-x-auto mb-10">
          <table className="w-full border-collapse bg-white overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-6 py-4 text-left font-semibold text-gray-700">Time</th>
                {days.map(day => (
                  <th key={day} className="border border-gray-200 px-6 py-4 text-center font-semibold text-gray-700">{day}</th>
                ))}
                <th className="border border-gray-200 px-6 py-4 text-center font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {timetableRows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-200 px-6 py-4 font-medium">{row.time}</td>
                  {days.map(day => {
                    const cellData = row[day];
                    return (
                      <td 
                        key={day} 
                        className="border border-gray-200 px-6 py-4 text-center relative group"
                        style={{ backgroundColor: cellData ? getCellColor(cellData.activity) : 'white' }}
                      >
                        {cellData ? (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="flex-grow">{cellData.activity}</span>
                              <button 
                                onClick={() => handleRemoveEntry(cellData.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 ml-2 p-1 hover:bg-red-100 transition-opacity"
                                title="Remove entry"
                              >
                                ×
                              </button>
                            </div>
                          </>
                        ) : null}
                      </td>
                    );
                  })}
                  <td className="border border-gray-200 px-6 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

<br></br>
<br></br>

      {/* Subject Legend */}
      <div className="my-8 p-6 bg-white shadow-sm">
        <h3 className="text-sm font-semibold mb-4 text-gray-700">Subject Legend:</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center">
            <span className="inline-block w-5 h-5 mr-2" style={{ backgroundColor: getCellColor('Reading') }}></span>
            <span className="text-sm">Reading</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-5 h-5 mr-2" style={{ backgroundColor: getCellColor('Math') }}></span>
            <span className="text-sm">Math</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-5 h-5 mr-2" style={{ backgroundColor: getCellColor('Science') }}></span>
            <span className="text-sm">Science</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-5 h-5 mr-2" style={{ backgroundColor: getCellColor('Social Studies') }}></span>
            <span className="text-sm">Social Studies</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-5 h-5 mr-2" style={{ backgroundColor: getCellColor('Art') }}></span>
            <span className="text-sm">Art/Music</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-5 h-5 mr-2" style={{ backgroundColor: getCellColor('P.E.') }}></span>
            <span className="text-sm">P.E.</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-5 h-5 mr-2" style={{ backgroundColor: getCellColor('Break') }}></span>
            <span className="text-sm">Break</span>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>

      {/* Admin Form */}
      <div className="mt-10 p-8 border bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Add Timetable Entry</h2>
        {message && (
          <div className={`p-4 mb-6 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Grade</label>
              <select 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)} 
                required
                className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Grade</option>
                {grades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Day</label>
              <select 
                value={day} 
                onChange={(e) => setDay(e.target.value)} 
                required
                className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Activity/Subject</label>
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                required
                placeholder="e.g. Math, Reading, Science"
                className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Time Slot</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                placeholder="e.g. 8:00 - 9:00"
                className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button 
              type="submit" 
              className="px-8 py-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
            >
              Add Timetable Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimetableCMS;