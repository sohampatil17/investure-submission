import React from 'react';
import './App.css';
import Charting from './charting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>S&P 500 Cumulative Return</h1>
        <Charting />
      </header>
    </div>
  );
}

export default App;
