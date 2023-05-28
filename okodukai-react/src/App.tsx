import React from 'react';
import logo from './logo.svg';
import './App.css';
import Top from './pages/Top'
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
    <header>
      <span className="Title">
        <Link to="/">
          <h3>おこづかいシート</h3>
        </Link>
      </span>
    </header>
      <div className="App">
        <Routes>
          <Route path="/" element={<Top />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
