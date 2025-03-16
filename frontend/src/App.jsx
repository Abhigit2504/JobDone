import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import QuestionMaking from './pages/QuestionMaking';
import ViewJobs from './pages/ViewJobs';
// import JobDetails from './pages/JobDetails'; // 
import  JobDescription from './pages/JobDescription '
import './styles/styles.css';
import TestPage from './pages/TestPage'
import UserJobDetails from './pages/UserJobDetails'
import JobApplications from './pages/JobApplications ';
import TestApplications from './pages/TestApplications';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/question-making" element={<QuestionMaking />} />
        <Route path="/view-jobs" element={<ViewJobs />} />
        <Route path="/job/:id" element={<JobDescription/>} /> 
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/apply/:id" element={<UserJobDetails />} />
        <Route path="/job-applications" element={<JobApplications />} />
        <Route path="/test-applications" element={<TestApplications />} />
      </Routes>
    </Router>
  );
}

export default App;