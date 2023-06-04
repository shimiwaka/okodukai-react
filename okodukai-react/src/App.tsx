import React from 'react';
import './App.css';
import Top from './pages/Top'
import Board from './pages/Board'
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
    <header>
      <span className="Title">
        <Link to="/">
          <h3>おこづかい帳</h3>
        </Link>
      </span>
    </header>
      <div className="App">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/board/:token" element={<Board />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
