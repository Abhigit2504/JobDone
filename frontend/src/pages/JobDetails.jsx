import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        &larr; Back
      </button>
      <h1 style={styles.title}>{job.role}</h1>
      <h2 style={styles.subtitle}>{job.companyName}</h2>
      <div style={styles.details}>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Experience:</strong> {job.location}</p>
        <p><strong>Salary:</strong> ₹{job.experienceRequired}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '24px',
    color: '#555',
    marginBottom: '20px',
  },
  details: {
    fontSize: '18px',
    lineHeight: '1.6',
  },
};

export default JobDescription;