import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Both fields are required!');
      setSuccessMessage('');
      return;
    }

    setError('');
    try {
      // API call to login endpoint
      const response = await fetch('http://localhost:8000/api/doctor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        // Store doctor details in localStorage
        localStorage.setItem('doctor_id', data.doctor.id);
        setSuccessMessage('Login successful!');
        setError('');
        navigate('/doctor-dashboard');

        // Optional: redirect to another page
        // window.location.href = '/dashboard'; 
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
        setSuccessMessage('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="doctor-login-container">
      <section className="section">
        <h2 className="title">Doctor Login</h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            id="username"
            placeholder="Enter Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn primary-btn">
            Login
          </button>
        </form>
      </section>
    </div>
  );
};

export default DoctorLogin;
