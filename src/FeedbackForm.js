import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hrManagerName, setHrManagerName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [performanceRating, setPerformanceRating] = useState(0);
  const [projectRating, setProjectRating] = useState(0);

  const handleStarClick = (rating, setRating) => {
    
    setRating((prevRating) => (prevRating === rating ? 0 : rating));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Feedback Submitted:', { name, email, hrManagerName, feedback, overallRating, performanceRating, projectRating });

    setName('');
    setEmail('');
    setHrManagerName('');
    setFeedback('');
    setOverallRating(0);
    setPerformanceRating(0);
    setProjectRating(0);
  };

  const renderStarRating = (label, rating, setRating) => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    return (
      <div>
        <label>{label}:</label>
        <div>
          {stars.map((star) => (
            <span
              key={star}
              role="button"
              tabIndex={0}
              onClick={() => handleStarClick(star, setRating)}
              onKeyPress={() => handleStarClick(star, setRating)}
              className={`star ${star <= rating ? 'selected' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="feedback-form-container">
      <h2>HR Feedback Form</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          Your Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Your Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          HR Manager's Name:
          <input
            type="text"
            value={hrManagerName}
            onChange={(e) => setHrManagerName(e.target.value)}
            required
          />
        </label>
        {renderStarRating('Overall Rating', overallRating, setOverallRating)}
        {renderStarRating('Performance Rating', performanceRating, setPerformanceRating)}
        {renderStarRating('Project Rating', projectRating, setProjectRating)}
        <label>
          Feedback:
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;