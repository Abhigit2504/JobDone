import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './JobSearch.css';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then(response => response.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <div className="job-search">
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <Link to={`/job/${job._id}`}>
              <h3>{job.title}</h3>
              <p>{job.company} - {job.location}</p>
              <p>Salary: {job.salary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSearch;
