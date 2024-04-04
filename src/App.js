import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AIChatbox from './pages/chat/AIChatbox';
import './Header.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 style={{ textAlign: 'center' }}>LeafyLux</h1>
          <nav className="taskbar">
            <Link to="/chatbox">AI Helper</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/chatbox" element={<AIChatbox />} />
          <Route path="/" element={<AIChatbox />} /> {/* Redirect root to AIChatbox */}
        </Routes>
        <footer className="footer">
          <p>© {new Date().getFullYear()} LeafyLux - All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
