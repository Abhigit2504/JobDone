import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const QuestionMaking = () => {
  const [questionForm, setQuestionForm] = useState({ jobId: '', question: '', options: ['', '', ''], correctAnswer: '' });
  const navigate = useNavigate();

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tests/add-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionForm),
      });
      const data = await response.json();
      alert('Question added successfully!');
      console.log(data);
      navigate('/admin'); // Redirect back to Admin Dashboard
    } catch (error) {
      console.error('Error adding question:', error);
      alert('Failed to add question. Please try again.');
    }
  };

  return (
    <div className="question-making-page">
      <h1>Add Test Questions</h1>
      <form onSubmit={handleAddQuestion}>
        <input
          type="text"
          placeholder="Job ID"
          value={questionForm.jobId}
          onChange={(e) => setQuestionForm({ ...questionForm, jobId: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Question"
          value={questionForm.question}
          onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
          required
        />
        {questionForm.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...questionForm.options];
              newOptions[index] = e.target.value;
              setQuestionForm({ ...questionForm, options: newOptions });
            }}
            required
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={questionForm.correctAnswer}
          onChange={(e) => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })}
          required
        />
        <button type="submit">Add Question</button>
      </form>
    </div>
  );
};

export default QuestionMaking;