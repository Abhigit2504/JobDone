import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Remove useParams
import Lottie from 'lottie-react'; // For animations
import successAnimation from '../assets/success-animation.json'; // Import your success animation

const TestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    skills: '',
  });
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const [loading, setLoading] = useState(false); // Track loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Save user details to MongoDB
      const response = await fetch('https://jobdone.onrender.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

  return (
    <div style={styles.testPage}>
      <h1 style={styles.heading}>Job Application Form</h1>
      <button
        onClick={() => navigate(-1)}
        style={styles.backButton}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
      >
        &larr; Back to Job Description
      </button>

      {submitted ? (
        <div style={styles.successMessage}>
          <Lottie animationData={successAnimation} loop={false} style={{ height: 200 }} />
          <h2 style={styles.successHeading}>Thank you for submitting your details!</h2>
          <p style={styles.successText}>We will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.applicationForm}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="role" style={styles.label}>
              Role you are looking for:
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
            <label htmlFor="skills" style={styles.label}>
              Skills you have:
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
          <button
            type="submit"
            style={styles.submitButton}
            disabled={loading}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  testPage: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 0.5s ease-in-out',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px',
    animation: 'slideIn 0.5s ease-in-out',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
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
  successMessage: {
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  successHeading: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginTop: '20px',
  },
  successText: {
    fontSize: '1.2rem',
    color: '#555',
  },
  applicationForm: {
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
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'border-color 0.3s ease',
    resize: 'vertical',
    minHeight: '100px',
  },
  submitButton: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default TestPage;