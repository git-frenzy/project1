// src/components/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx'; // Import the AuthProvider
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Bot from './Bot'; // Assuming you have a Bot component
import ProtectedRoute from './ProtectedRoute'; // Create a ProtectedRoute component
import Chat from './Chat'; // Assuming the component is in the same folder

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/bot" element={<ProtectedRoute><Bot /></ProtectedRoute>} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
