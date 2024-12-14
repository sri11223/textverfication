import React, { useState } from 'react';

function GrammarChecker() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCheckGrammar = async () => {
    if (!text) {
      alert('Please enter some text.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/check-grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data); // Assuming data contains grammar check results

    } catch (error) {
      console.error('Error:', error);
      setResult({ message: 'Error checking grammar.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Enter Text for Grammar Check</h2>
      <textarea
        value={text}
        onChange={handleTextChange}
        rows="10"
        cols="50"
        placeholder="Enter your text here"
      ></textarea>
      <br />
      <button onClick={handleCheckGrammar} disabled={loading}>
        {loading ? 'Checking...' : 'Check Grammar'}
      </button>

      {result && (
        <div>
          <h3>Grammar Check Results</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GrammarChecker;
