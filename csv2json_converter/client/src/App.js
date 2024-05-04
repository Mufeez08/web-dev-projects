import React, { useState } from 'react';
import './App.css';

function App() {
  const [csvText, setCsvText] = useState('');
  const [jsonResult, setJsonResult] = useState('');

  const handleCsvInput = (event) => {
    setCsvText(event.target.value);
  };

  const convertCsvToJson = () => {
    try {
      const rows = csvText.split('\n');
      const headers = rows[0].split(',');
      
      const result = rows.slice(1).map(row => {
        const values = row.split(',');
        const json = headers.reduce((acc, header, index) => {
          acc[header] = values[index];
          return acc;
        }, {});
        return json;
      });

      setJsonResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setJsonResult('Error in converting CSV to JSON');
    }
  };

  return (
    <div className="App">
      <h1>CSV to JSON Converter</h1>
      <textarea
        placeholder="Enter CSV data here..."
        value={csvText}
        onChange={handleCsvInput}
        rows="10"
        cols="50"
      />
      <br />
      <button onClick={convertCsvToJson}>Convert to JSON</button>
      <h2>JSON Output</h2>
      <textarea
        value={jsonResult}
        readOnly
        rows="10"
        cols="50"
      />
    </div>
  );
}

export default App;

