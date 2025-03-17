import React, { useState } from 'react';

// AddUserModal component
const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Email validation function
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: ''
    };
    
    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    // If no errors, register user
    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
      console.log('Registering user with Firebase:', { email, password });
      // Here you would add the Firebase authentication code
      // For example:
      // createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     // User registered successfully
      //     onAddUser(userCredential.user);
      //     onClose();
      //   })
      //   .catch((error) => {
      //     console.error('Error registering user:', error);
      //   });
      
      // For now, just simulate a successful registration
      onAddUser({
        id: '#' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        name: email.split('@')[0],
        email: email,
        color: '#' + Math.floor(Math.random()*16777215).toString(16)
      });
      onClose();
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}
            />
            {errors.email && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.email}</p>
            )}
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}
            />
            {errors.password && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.password}</p>
            )}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}
            />
            {errors.confirmPassword && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.confirmPassword}</p>
            )}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: '#f5f5f5',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                marginRight: '10px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: '#0088ff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main UsersCMS component
const UsersCMS = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: '#KP267400', name: 'Cherry Delight', email: 'cherry@gmail.com', color: '#FFD700' },
    { id: '#TL861535', name: 'Kiwi', email: 'kiwi@gmail.com', color: '#FFD700' },
    // Add more users as needed
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usersPerPage = 5;
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  // Handle user actions
  const handleEdit = (userId) => {
    console.log(`Editing user with ID: ${userId}`);
    // Add edit functionality here
  };
  
  const handleDelete = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    console.log(`Deleted user with ID: ${userId}`);
  };
  
  const handleAddUser = () => {
    console.log('Add user clicked - opening modal');
    setIsModalOpen(true);
  };
  
  const handleAddNewUser = (newUser) => {
    setUsers([...users, newUser]);
    console.log('New user added:', newUser);
  };
  
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontSize: '20px',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>Users</h1>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: '#eee',
            marginRight: '10px'
          }}></div>
          <span style={{ fontWeight: 'normal' }}>Jane Cooper</span>
        </div>
      </div>
      
      <button
        onClick={handleAddUser}
        style={{
          backgroundColor: '#0088ff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '20px'
        }}
      >
        + Add user
      </button>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '10px'
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>User Name</th>
              <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>User ID</th>
              <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '50%', 
                    backgroundColor: user.color,
                    marginRight: '10px'
                  }}></div>
                  {user.name}
                </td>
                <td style={{ padding: '15px' }}>{user.id}</td>
                <td style={{ padding: '15px' }}>{user.email}</td>
                <td style={{ padding: '15px' }}>
                  <button
                    onClick={() => handleEdit(user.id)}
                    style={{
                      backgroundColor: '#FFD700',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '8px 20px',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      backgroundColor: '#FF4E64',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '8px 20px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        marginTop: '20px',
        gap: '10px'
      }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: '8px 15px',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '5px',
            cursor: currentPage === 1 ? 'default' : 'pointer',
            opacity: currentPage === 1 ? 0.6 : 1
          }}
        >
          Previous
        </button>
        
        <button
          style={{
            padding: '8px 15px',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          {String(currentPage).padStart(2, '0')}
        </button>
        
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={indexOfLastUser >= filteredUsers.length}
          style={{
            padding: '8px 15px',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '5px',
            cursor: indexOfLastUser >= filteredUsers.length ? 'default' : 'pointer',
            opacity: indexOfLastUser >= filteredUsers.length ? 0.6 : 1
          }}
        >
          Next
        </button>
      </div>
      
      {/* Add User Modal */}
      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddUser={handleAddNewUser}
      />
    </div>
  );
};

export default UsersCMS;