import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

axios.defaults.withCredentials = true;

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5000/api/login', {
            email,
            password,
          });
    
          if (response.data.success) {
            navigate('/email-form');
          } else {
            console.log("hello")
            alert(response.data.message);
          }
        } catch (error) {
          console.error("There was an error logging in!", error);
          console.log("hello1")
          alert('Login failed. Please try again.');
        }
      };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button">Submit</button>
            </form>
        </div>
    );
}

export default LoginPage;
