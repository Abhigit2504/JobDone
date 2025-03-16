import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaRupeeSign, FaInfoCircle } from 'react-icons/fa'; // Import icons

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data); // Update the jobs state with the fetched data
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div style={styles.home}>
      <h1 style={styles.heading}>Available Jobs</h1>
      <div style={styles.jobList}>
        {jobs.map((job) => (
          <div
            key={job._id}
            style={styles.jobCard}
            onClick={() => navigate(`/job/${job._id}`)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <h3 style={styles.jobRole}>{job.role}</h3>
            <p style={styles.jobDetail}>
              <FaBuilding style={styles.icon} /> {job.companyName}
            </p>
            <p style={styles.jobDetail}>
              <FaInfoCircle style={styles.icon} /> {job.description}
            </p>
            <p style={styles.salary}>
              <FaRupeeSign style={styles.icon} /> Salary: ₹{job.salary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  home: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '15px',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '40px',
    animation: 'slideIn 0.5s ease-in-out',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  jobList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  jobCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  jobRole: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '10px',
  },
  jobDetail: {
    fontSize: '1rem',
    color: '#555',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
  },
  salary: {
    fontSize: '1.1rem',
    color: '#28a745',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: '1.2rem',
    color: '#1abc9c',
    marginRight: '10px',
    transition: 'transform 0.3s ease',
  },
};

export default Home;