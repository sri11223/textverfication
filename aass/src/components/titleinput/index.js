import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; // Optional: Add CSS for styling

function TitleReview() {
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const response = await axios.get('http://localhost:4000/api/titles', { // Fixed the URL
        params: { title },
      });

      if (response.data.feedback) {
        setFeedback(response.data.feedback);
      } else {
        setError('No feedback received. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('An error occurred while processing your title. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const cleanFeedback = (text) => {
    // Replace stars and reformat
    return text
      .replace(/\\\s?/g, '') // Remove stars (** and *)
      .replace(/\n\s*\*/g, '\n-') // Replace list indicators with dashes
      .replace(/^\s*-\s*/gm, '\n-') // Ensure all list items start with a dash
      .replace(/\s*\n\s*/g, ' ') // Flatten into a clean paragraph where needed
      .trim();
  };

  const renderFeedback = () => {
    if (!feedback) return null;

    const { queried_title, feedback: feedbackText, approval_probability } = feedback.output;

    return (
      <div className="feedback-result">
        <h2>Title Review Report</h2>
        <p>
          <strong>Queried Title:</strong> "{queried_title}"
        </p>
        <p>
          <strong>Feedback:</strong> {cleanFeedback(feedbackText)}
        </p>
        <p>
          <strong>Approval Probability:</strong> {approval_probability.toFixed(2)}%
        </p>
      </div>
    );
  };

  return (
    <div className="title-feedback">
      <h1>Title Feedback Analyzer</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title here"
          required
          className="title-input"
        />
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {renderFeedback()}
    </div>
  );
}

export default TitleReview;
