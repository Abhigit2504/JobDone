import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserTie, FaMoneyBillAlt, FaInfoCircle } from 'react-icons/fa'; // Import icons

const JobDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  // Fetch job details based on the job ID
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://jobdone.onrender.com/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <button
        onClick={() => navigate(-1)}
        style={styles.backButton}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        &larr; Back
      </button>
      <h1 style={styles.jobTitle}>{job.role}</h1>
      <h2 style={styles.companyName}>{job.companyName}</h2>
      <div style={styles.jobDetails}>
        <p style={styles.detailItem}>
          <FaInfoCircle style={styles.icon} />
          <strong>Description:</strong> {job.description}
        </p>
        <p style={styles.detailItem}>
          <FaMapMarkerAlt style={styles.icon} />
          <strong>Location:</strong> {job.location}
        </p>
        <p style={styles.detailItem}>
          <FaUserTie style={styles.icon} />
          <strong>Experience Required:</strong> {job.experienceRequired}
        </p>
        <p style={styles.detailItem}>
          <FaMoneyBillAlt style={styles.icon} />
          <strong>Salary:</strong> ₹{job.salary}
        </p>
      </div>
      <button
        onClick={() => navigate(`/apply/${id}`)}
        style={styles.applyButton}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
      >
        Apply for the Job
      </button>
      <button
        onClick={() => navigate(`/test/${id}`)}
        style={styles.testButton}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#138496')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#17a2b8')}
      >
        Increase Your Chances by Taking the Test
      </button>
    </div>
  );
};

// Inline CSS styles with improvements
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 0.5s ease-in-out',
    fontFamily: 'Arial, sans-serif',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginTop: '40px',
    animation: 'pulse 1.5s infinite',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  jobTitle: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '10px',
    textAlign: 'center',
    animation: 'slideIn 0.5s ease-in-out',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  companyName: {
    fontSize: '1.8rem',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'center',
    animation: 'slideIn 0.6s ease-in-out',
    fontWeight: '600',
  },
  jobDetails: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '30px',
    animation: 'fadeIn 0.7s ease-in-out',
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  detailItem: {
    margin: '15px 0',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: '1.2rem',
    color: '#1abc9c',
    marginRight: '10px',
    transition: 'transform 0.3s ease',
  },
  applyButton: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    width: '100%',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.8s ease-in-out',
  },
  testButton: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    backgroundColor: '#17a2b8',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    width: '100%',
    marginTop: '10px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.9s ease-in-out',
  },
};

export default JobDescription;