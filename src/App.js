import React, { useState } from 'react';
import './App.css';
import logo from './accenture-logo.png'; // Update path if needed
 
function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async () => {
    if (!prompt.trim()) return;
 
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
 
      const data = await res.json();
      setResponse(data.response || data.error || 'No response received.');
    } catch (error) {
      setResponse('Error: Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="App">
      <h2 className="slide-in-left" style={{display:'flex', justifyContent:'center'}}>
        <img src={logo} alt="Accenture Logo" style={{ height: '32px' }} />
      Accenture Document Reader
      </h2>
      <br />
     
 
      <textarea
        rows='6'
   
        style={{borderLeft : '5px solid #bb29bb',
          padding: '18px'}}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your question here..."
          />
         
      <br />
 
      <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
 
        <button
          className={`cta-button ${!loading ? 'pulse' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
         
        >
          {loading ? (
            <>
              <span className="spinner"></span> Processing...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
      <br/>
      <h3 className="slide-in-left response-heading" style={{display:'flex', justifyContent:'center'}}>
        <img
          src={logo}
          alt="Accenture Logo"
          style={{ textAlign:'center',display:'flex', justifyContent:'center',height: '20px', width: '17px', paddingRight: '5px' }}
        />
        Response :
      </h3>
 
      <div className="response-box">
        {response || 'Response will appear here.'}
      </div>
    </div>
  );
}
 
export default App;