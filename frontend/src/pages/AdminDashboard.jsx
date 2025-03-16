import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [jobForm, setJobForm] = useState({
    companyName: '',
    role: '',
    description: '',
    salary: '',
    location: '',
    experienceRequired: '',
  });
  const navigate = useNavigate();

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://jobdone.onrender.com/api/jobs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobForm),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      alert('Job added successfully!');
      console.log(data);
      setJobForm({
        companyName: '',
        role: '',
        description: '',
        salary: '',
        location: '',
        experienceRequired: '',
      }); // Clear the form
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add job. Please check the console for details.');
    }
  };

  // Inline styles
  const styles = {
    adminDashboard: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '32px',
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
    },
    section: {
      marginBottom: '30px',
    },
    sectionHeading: {
      fontSize: '24px',
      color: '#555',
      marginBottom: '15px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    textarea: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '15px 30px',
      fontSize: '18px',
      cursor: 'pointer',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
    applicationsButton: {
      padding: '15px 30px',
      fontSize: '18px',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      marginRight: '10px',
    },
    applicationsButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.adminDashboard}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Add Job</h2>
        <form onSubmit={handleAddJob} style={styles.form}>
          <input
            type="text"
            placeholder="Company Name"
            value={jobForm.companyName}
            onChange={(e) => setJobForm({ ...jobForm, companyName: e.target.value })}
            style={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={jobForm.role}
            onChange={(e) => setJobForm({ ...jobForm, role: e.target.value })}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Description"
            value={jobForm.description}
            onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
            style={styles.textarea}
            required
          />
          <input
            type="number"
            placeholder="Salary"
            value={jobForm.salary}
            onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Location"
            value={jobForm.location}
            onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
            style={styles.textarea}
            required
          />
          <input
            type="text"
            placeholder="Experience Required"
            value={jobForm.experienceRequired}
            onChange={(e) => setJobForm({ ...jobForm, experienceRequired: e.target.value })}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Add Job
          </button>
        </form>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>Applications</h2>
        <button
          onClick={() => navigate('/job-applications')}
          style={styles.applicationsButton}
        >
          Job Applications
        </button>
        <button
          onClick={() => navigate('/test-applications')}
          style={styles.applicationsButton}
        >
          Test Applications
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>View Active Jobs</h2>
        <button
          onClick={() => navigate('/view-jobs')}
          style={styles.applicationsButton}
        >
          View Jobs
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;