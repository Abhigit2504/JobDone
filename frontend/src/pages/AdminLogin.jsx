import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaSignInAlt } from 'react-icons/fa'; // Import icons

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') {
      navigate('/admin'); // Ensure this route is defined in App.js
    } else {
      alert('Incorrect Password');
    }
  };

  return (
    <div style={styles.adminLoginContainer}>
      <h2 style={styles.heading}>Admin Login</h2>
      <div style={styles.inputContainer}>
        <FaLock style={styles.icon} />
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleLogin} style={styles.button}>
        <FaSignInAlt style={styles.buttonIcon} /> Login
      </button>
    </div>
  );
};

// Inline CSS styles
const styles = {
  adminLoginContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 0.5s ease-in-out',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '20px',
    animation: 'slideIn 0.5s ease-in-out',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    background: 'white',
    borderRadius: '25px',
    padding: '10px 20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    fontSize: '1.2rem',
    color: '#1abc9c',
    marginRight: '10px',
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    background: 'transparent',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  buttonIcon: {
    fontSize: '1.2rem',
  },
};

export default AdminLogin;