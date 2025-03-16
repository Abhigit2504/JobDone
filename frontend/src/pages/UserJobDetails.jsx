import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserJobDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '', // Add phone field
    yearsOfExperience: '',
    role: '',
    companyName: '',
    previousSalary: '',
    expectedSalary: '',
    skills: '',
    resume: null, // For file upload
  });
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const [loading, setLoading] = useState(false); // Track loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Create a FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('phone', formData.phone); // Add phone to FormData
      formDataToSend.append('yearsOfExperience', formData.yearsOfExperience);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('previousSalary', formData.previousSalary);
      formDataToSend.append('expectedSalary', formData.expectedSalary);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('resume', formData.resume);

      // Save user job details to MongoDB
      const response = await fetch(`https://jobdone.onrender.com/api/userjobdetails/${id}`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Set submitted state to true
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (submitted) {
    return (
      <div style={styles.successMessage}>
        <h2 style={styles.successHeading}>Thank you for applying!</h2>
        <p style={styles.successText}>We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Apply for the Job</h1>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        &larr; Back
      </button>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="firstName" style={styles.label}>
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="lastName" style={styles.label}>
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="yearsOfExperience" style={styles.label}>
            Years of Experience:
          </label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="role" style={styles.label}>
            Role:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="companyName" style={styles.label}>
            Company Name:
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="previousSalary" style={styles.label}>
            Previous Salary:
          </label>
          <input
            type="number"
            id="previousSalary"
            name="previousSalary"
            value={formData.previousSalary}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="expectedSalary" style={styles.label}>
            Expected Salary:
          </label>
          <input
            type="number"
            id="expectedSalary"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="skills" style={styles.label}>
            Skills:
          </label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="resume" style={styles.label}>
            Upload Resume:
          </label>
          <input
            type="file"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            required
            style={styles.fileInput}
          />
        </div>
        <button
          type="submit"
          style={{
            ...styles.submitButton,
            ...(loading ? styles.submitButtonDisabled : {}),
          }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '20px',
    textAlign: 'center',
    animation: 'slideIn 0.5s ease-in-out',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  backButtonHover: {
    backgroundColor: '#0056b3',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    fontWeight: '500',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'border-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#1abc9c',
    outline: 'none',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'border-color 0.3s ease',
    minHeight: '100px',
  },
  fileInput: {
    padding: '10px',
    fontSize: '1rem',
  },
  submitButton: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#218838',
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  },
  successMessage: {
    textAlign: 'center',
    marginTop: '40px',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  successHeading: {
    fontSize: '2rem',
    color: '#28a745',
    marginBottom: '10px',
  },
  successText: {
    fontSize: '1.2rem',
    color: '#555',
  },
};

export default UserJobDetails;