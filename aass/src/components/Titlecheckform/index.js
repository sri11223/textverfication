import React, { useState } from 'react';
import axios from 'axios';
import './TitleReview.css'

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
      const response = await axios.get('http://localhost:4000/api/titles', {
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
    return text
      .replace(/\\/g, '') // Remove unnecessary escape characters
      .replace(/\*/g, '') // Remove single stars (e.g., for markdown)
      .replace(/\n\s*\*/g, '\n-') // Replace list indicators with dashes
      .replace(/^\s*-\s*/gm, '\n-') // Ensure list items start with a dash
      .trim(); // Trim extra spaces
  };

  const renderFeedback = () => {
    if (!feedback) return null;

    const { queried_title, feedback: feedbackText, approval_probability } = feedback.output;

    return (
      <div style={styles.feedbackResult}>
        <h2>Title Review Report</h2>
        <div style={styles.feedbackContent}>
          <p>
            <strong>Queried Title:</strong> <span style={styles.highlightText}>{queried_title}</span>
          </p>
          <p>
            <strong>Feedback:</strong>
            <pre style={styles.feedbackText}>{cleanFeedback(feedbackText)}</pre>
          </p>
          <p style={styles.approvalProbability}>
            <strong>Approval Probability:</strong> {approval_probability.toFixed(2)}%
          </p>
        </div>
      </div>
    );
  };

  const styles = {
    titleFeedback: {
      fontFamily: 'Arial, sans-serif',
      margin: '20px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: 'auto',
    },
    mainHeading: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
    },
    feedbackForm: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    titleInput: {
      width: '75%',
      padding: '10px',
      border: '2px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      marginRight: '10px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    titleInputFocus: {
      borderColor: '#4CAF50', // Focus state
    },
    submitBtn: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s',
      width: '100px', // Fixed width for the button
    },
    submitBtnDisabled: {
      backgroundColor: '#9e9e9e',
      cursor: 'not-allowed',
    },
    submitBtnLoading: {
      backgroundColor: '#ff9800',
    },
    errorMessage: {
      color: '#f44336',
      fontSize: '1rem',
      marginTop: '20px',
    },
    feedbackResult: {
      marginTop: '20px',
      backgroundColor: '#fff',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
    },
    feedbackContent: {
      fontSize: '1rem',
      color: '#333',
    },
    highlightText: {
      fontWeight: 'bold',
      color: '#4CAF50',
    },
    feedbackText: {
      backgroundColor: '#f4f4f4',
      padding: '10px',
      borderRadius: '4px',
      fontFamily: 'monospace',
      whiteSpace: 'pre-wrap',
    },
    approvalProbability: {
      fontWeight: 'bold',
      color: '#2196F3',
    },
  };

  return (
    <div style={styles.titleFeedback}>
      <h1 style={styles.mainHeading}>Title Feedback Analyzer</h1>
      <form onSubmit={handleSubmit} style={styles.feedbackForm}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title here"
          required
          style={{
            ...styles.titleInput,
            ...(title ? styles.titleInputFocus : {}),
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.submitBtn,
            ...(loading ? styles.submitBtnLoading : {}),
            ...(loading === false && !error ? {} : styles.submitBtnDisabled),
          }}
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </form>

      {error && <div style={styles.errorMessage}>{error}</div>}

      {renderFeedback()}
    </div>
  );
}

export default TitleReview;
