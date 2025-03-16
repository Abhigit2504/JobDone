import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaBriefcase, FaBuilding, FaInfoCircle, FaRupeeSign } from 'react-icons/fa'; // Import icons
import '../styles/styles.css';

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://jobdone.onrender.com/api/jobs');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Failed to fetch jobs. Please check the console for details.');
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchJobs();
  }, []);

  // Delete a job
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://jobdone.onrender.com/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete job');
      }
      setJobs(jobs.filter((job) => job._id !== id)); // Remove the job from the list
      alert('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (jobs.length === 0) {
    return (
      <div className="view-jobs-page">
        <h1>Active Jobs</h1>
        <button onClick={() => navigate('/admin')} className="back-button">
          <FaArrowLeft /> Back to Dashboard
        </button>
        <p>No jobs found.</p>
      </div>
    );
  }

  return (
    <div className="view-jobs-page">
      <h1>Active Jobs</h1>
      <button onClick={() => navigate('/admin')} className="back-button">
        <FaArrowLeft /> Back to Dashboard
      </button>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <p>
              <FaBriefcase className="icon" />
              <b>Role:</b> {job.role}
            </p>
            <p>
              <FaBuilding className="icon" />
              <b>Company:</b> {job.companyName}
            </p>
            <p>
              <FaInfoCircle className="icon" />
              <b>About Job:</b> {job.description}
            </p>
            <p>
              <FaRupeeSign className="icon" />
              <b>Salary:</b> ₹{job.salary}
            </p>
            <button onClick={() => handleDelete(job._id)} className="delete-button">
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewJobs;