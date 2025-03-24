import React, { useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  updateDoc 
} from 'firebase/firestore';
import { db } from '/utills/FirebaseConfig';

// AddUserModal component
const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    firebase: ''
  });

  // Email validation function
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      firebase: ''
    };
    
    // Validate name
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
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
    if (!newErrors.email && !newErrors.password && !newErrors.confirmPassword && !newErrors.name) {
      try {
        const auth = getAuth();
        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Generate random color for user avatar
        const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        
        // Store additional user data in Firestore
        const userDocRef = await addDoc(collection(db, "users"), {
          uid: userCredential.user.uid,
          name: name,
          email: email,
          color: color,
          createdAt: new Date()
        });
        
        // Add user to the state
        onAddUser({
          id: userCredential.user.uid,
          docId: userDocRef.id, // Store Firestore doc ID for later use
          name: name,
          email: email,
          color: color
        });
        
        // Close modal
        onClose();
      } catch (error) {
        console.error('Error registering user:', error);
        newErrors.firebase = `Registration failed: ${error.message}`;
        setErrors(newErrors);
      }
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
        width: '90%',
        maxWidth: '400px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Add New User</h2>
        <form onSubmit={handleSubmit}>
          {errors.firebase && (
            <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>{errors.firebase}</p>
          )}
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.name}</p>
            )}
          </div>
          
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
                border: '1px solid #ddd',
                boxSizing: 'border-box'
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
                border: '1px solid #ddd',
                boxSizing: 'border-box'
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
                border: '1px solid #ddd',
                boxSizing: 'border-box'
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

// Edit User Modal component
const EditUserModal = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    firebase: ''
  });

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {
      name: '',
      email: '',
      firebase: ''
    };
    
    // Validate name
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    
    // If no errors, update user
    if (!newErrors.name && !newErrors.email) {
      try {
        // Update user in Firestore
        const userDocRef = doc(db, "users", user.docId);
        await updateDoc(userDocRef, {
          name: name,
          email: email,
          updatedAt: new Date()
        });
        
        // Update user in the state
        onUpdateUser({
          ...user,
          name: name,
          email: email
        });
        
        // Close modal
        onClose();
      } catch (error) {
        console.error('Error updating user:', error);
        newErrors.firebase = `Update failed: ${error.message}`;
        setErrors(newErrors);
      }
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen || !user) return null;

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
        width: '90%',
        maxWidth: '400px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Edit User</h2>
        <form onSubmit={handleSubmit}>
          {errors.firebase && (
            <p style={{ color: 'red', fontSize: '14px', marginBottom: '15px' }}>{errors.firebase}</p>
          )}
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.name}</p>
            )}
          </div>
          
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
                border: '1px solid #ddd',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && (
              <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.email}</p>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main UsersCMS component
const UsersCMS = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const usersPerPage = 5;
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Fetch users from Firestore on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
        
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          fetchedUsers.push({
            id: userData.uid,
            docId: doc.id, // Store Firestore doc ID for later use
            name: userData.name,
            email: userData.email,
            color: userData.color || '#FFD700'
          });
        });
        
        setUsers(fetchedUsers);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  // Handle user actions
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };
  
  const handleDelete = async (userId, docId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Delete user document from Firestore
        await deleteDoc(doc(db, "users", docId));
        
        // Update state to remove the user
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
        console.log(`Deleted user with ID: ${userId}`);
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user. Please try again.');
      }
    }
  };
  
  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };
  
  const handleAddNewUser = (newUser) => {
    setUsers([...users, newUser]);
    console.log('New user added:', newUser);
  };
  
  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    console.log('User updated:', updatedUser);
  };

  // Check if mobile view
  const isMobile = windowWidth < 768;
  
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '100%',
      margin: '0 auto',
      padding: isMobile ? '10px' : '20px'
    }}>
      <h1 style={{ 
        fontSize: '20px',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>Users</h1>
      
      {error && (
        <div style={{
          padding: '10px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: '20px',
        gap: isMobile ? '15px' : '0'
      }}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: isMobile ? '100%' : '300px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            fontSize: '14px',
            boxSizing: 'border-box'
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
          <span style={{ fontWeight: 'normal' }}>Admin</span>
        </div>
      </div>
      
      <button
        onClick={handleAddUser}
        style={{
          backgroundColor: '#2563EB',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '20px',
          width: isMobile ? '100%' : 'auto'
        }}
      >
        + Add user
      </button>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          {searchTerm ? 'No users match your search.' : 'No users found. Add your first user!'}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          {isMobile ? (
            // Mobile card view
            <div style={{ width: '100%' }}>
              {currentUsers.map((user) => (
                <div 
                  key={user.id} 
                  style={{ 
                    border: '1px solid #eee', 
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '15px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      borderRadius: '50%', 
                      backgroundColor: user.color,
                      marginRight: '10px'
                    }}></div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>{user.email}</div>
                    </div>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginTop: '10px'
                  }}>
                    <button
                      onClick={() => handleEdit(user)}
                      style={{
                        backgroundColor: '#FFD700',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '8px 0',
                        cursor: 'pointer',
                        width: '48%'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.docId)}
                      style={{
                        backgroundColor: '#FF4E64',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '8px 0',
                        cursor: 'pointer',
                        width: '48%'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop table view
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              marginTop: '10px'
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <th style={{ textAlign: 'left', padding: '10px 15px', fontWeight: 'normal', color: '#666' }}>User Name</th>
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
                    <td style={{ padding: '15px' }}>{user.email}</td>
                    <td style={{ padding: '15px' }}>
                      <button
                        onClick={() => handleEdit(user)}
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
                        onClick={() => handleDelete(user.id, user.docId)}
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
          )}
        </div>
      )}
      
      {filteredUsers.length > 0 && (
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
      )}
      
      {/* Add User Modal */}
      <AddUserModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddUser={handleAddNewUser}
      />
      
      {/* Edit User Modal */}
      <EditUserModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={currentUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default UsersCMS;