import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Appointment from './Appointment';
import DoctorLogin from './DoctorLogin';
import DoctorDashboard from './DoctorDashboard ';

const NotFound = () => <h2>404 - Page Not Found</h2>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/book-appointment" element={<Appointment />}/>
        <Route path="/doctor-login" element={<DoctorLogin />}/>
        <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
