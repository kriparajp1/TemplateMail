import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EmailForm from './components/EmailForm';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/email-form" element={<EmailForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
