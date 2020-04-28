import React from 'react';
import './App.css';
import './components/Board'
import Board from './components/Board';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        Let's play the puzzle
      </header>
      <div>
        <Board />
      </div>
    </div>
  );
}

export default App;
