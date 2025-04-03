// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import TranscriptPage from './pages/TranscriptPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/transcript" element={<TranscriptPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;