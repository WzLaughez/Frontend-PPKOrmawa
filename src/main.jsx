import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // User-facing app  // Admin-facing app
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Components/Admin';
import User from './Components/User';
import { AuthProvider } from './AuthContext';
import RequireAuth from './RequireAuth';
import Login from './Login';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <RequireAuth allowedRoles={['admin']}>
              <Admin />
            </RequireAuth>
          }
        />
        <Route
          path="/user/*"
          element={
            <RequireAuth allowedRoles={['user']}>
              <User />
            </RequireAuth>
          }
        />
        <Route path="/*" element={<App />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
      </Routes>
    </Router>
  </AuthProvider>
);
