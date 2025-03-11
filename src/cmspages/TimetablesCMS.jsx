import React, { useState } from 'react';

const TimetableCMS = () => {
  const [grade, setGrade] = useState('Grade 1-4 LSPID');
  const [entries, setEntries] = useState([]);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const grades = ['Grade 1-4 LSPID', 'Grade 1-3 D-CAPS', 'Grade 4 Skills', 'Grade 5 Skills'];

  const addEntry = () => {
    setEntries([...entries, { time: '', activity: '' }]);
  };

  const updateEntry = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const removeEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Timetable CMS</h2>

      {/* Grade Selection */}
      <div className="mb-4 text-center">
        <label className="font-semibold mr-2">Select Grade:</label>
        <select 
          className="border p-2 rounded" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)}
        >
          {grades.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Timetable Entry Form */}
      <div className="mb-4">
        <button onClick={addEntry} className="bg-blue-500 text-white px-4 py-2 rounded">Add Activity</button>
      </div>

      {/* Timetable Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Time</th>
              <th className="border p-2">Activity</th>
              {days.map((day) => (
                <th key={day} className="border p-2">{day}</th>
              ))}
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className="border">
                <td className="border p-2">
                  <input
                    type="text"
                    value={entry.time}
                    onChange={(e) => updateEntry(index, 'time', e.target.value)}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={entry.activity}
                    onChange={(e) => updateEntry(index, 'activity', e.target.value)}
                    className="border p-1 w-full"
                  />
                </td>
                {days.map((day) => (
                  <td key={`${index}-${day}`} className="border p-2">✔</td>
                ))}
                <td className="border p-2">
                  <button onClick={() => removeEntry(index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimetableCMS;
