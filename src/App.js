import React, {useState} from 'react';
import logo from './assets/linkedin.png';
import './App.css';
import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <NavBar/>
        </div>
      </header>
    </div>
  );
}

export default App;
