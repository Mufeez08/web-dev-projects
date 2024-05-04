import './App.css';
import {useState,useEffect} from "react";

function App() {
  const [bin,setBin] = useState("");
  const [decimal, setDecimal] = useState("");

  const handleBinaryInputChange = (event) => {
    const value = event.target.value;
    if (/^[0-1]*$/.test(value) || value === "") {
      setBin(value);
      const decimal = binaryToDecimal(value);
      setDecimal(decimal);
    }
  };

  const binaryToDecimal = (binary) => {
    if (binary === "") {
      return ""; 
    }
    return parseInt(binary, 2).toString();
  };

  return (
    <div className="container">
      <div className="App">
      <form>
        <label>Bin2Dec Converter</label>
        <input value={bin} onChange={handleBinaryInputChange}/>
      </form>
      <p>{decimal}</p>
    </div>
    </div>
  );
}

export default App;
