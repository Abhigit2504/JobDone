import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestApplications = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('https://jobdone.onrender.com/api/admin/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    tableHeaderCell: {
      padding: '12px 15px',
      textAlign: 'left',
      fontWeight: '600',
    },
    tableRow: {
      borderBottom: '1px solid #ddd',
    },
    tableRowEven: {
      backgroundColor: '#f8f9fa',
    },
    tableRowHover: {
      backgroundColor: '#f1f1f1',
    },
    tableCell: {
      padding: '12px 15px',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Test Applications</h1>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableHeaderCell}>#</th>
            {/* <th style={styles.tableHeaderCell}>First Name</th> */}
            <th style={styles.tableHeaderCell}> Name</th>
            <th style={styles.tableHeaderCell}>Email</th>
            <th style={styles.tableHeaderCell}>Phone</th>
            <th style={styles.tableHeaderCell}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              style={{
                ...styles.tableRow,
                ...(index % 2 === 0 ? styles.tableRowEven : {}),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = styles.tableRowHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  index % 2 === 0 ? styles.tableRowEven.backgroundColor : '#fff';
              }}
            >
              <td style={styles.tableCell}>{index + 1}</td>
              {/* <td style={styles.tableCell}>{user.firstName}</td> */}
              <td style={styles.tableCell}>{user.name}</td>
              <td style={styles.tableCell}>{user.email}</td>
              <td style={styles.tableCell}>{user.phone}</td>
              <td style={styles.tableCell}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestApplications;