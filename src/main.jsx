import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // User-facing app  // Admin-facing app
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Components/Admin';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      {/* Add conditional logic to determine if the user is admin */}
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/*" element={<App />} /> {/* Default to user side */}
    </Routes>
  </Router>
);
