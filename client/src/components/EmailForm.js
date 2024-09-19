import React, { useState } from 'react';
import axios from 'axios';
import './EmailForm.css';

axios.defaults.withCredentials = true;
function EmailForm() {
  
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/send-email', {
        email,
        subject,
        heading,
        content,
      });

      if (response.data.success) {
        alert('Email sent successfully!');
        setEmail('');
        setSubject('');
        setHeading('');
        setContent('');
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error("There was an error sending the email!", error);
      alert('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="emailform-container">
      <h1 className="emailform-title">Send an Email</h1>
      <form onSubmit={handleSubmit} className="emailform-form">
        <input
          type="email"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="emailform-input"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="emailform-input"
        />
        <input
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
          className="emailform-input"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="emailform-textarea"
        />
        <button type="submit" className="emailform-button">Send Email</button>
      </form>
    </div>
  );
}

export default EmailForm;
