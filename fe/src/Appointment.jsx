import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  
  
  const navigate =useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    appointmentDate: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend API
      const response = await fetch("http://localhost:8000/api/appointment/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to book the appointment");
      }

      const data = await response.json();

      // Add appointment locally and show success popup
      setAppointments([...appointments, formData]);
      setPopupMessage(data.message || "Appointment booked successfully!");
      setShowPopup(true);

      // Clear form fields
      setFormData({
        name: "",
        age: "",
        gender: "",
        mobile: "",
        appointmentDate: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setPopupMessage("Failed to book appointment. Please try again.");
      setShowPopup(true);
    }
  };

  const closePopup = () => setShowPopup(false);

  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="logo">
            <img src="logo.webp" alt="Doctor Logo" className="doctor-logo" />
            <h1>Dr. John Smith</h1>
          </div>
          <div className="navbar-links">
            <button onClick={()=>{navigate("/")}}>Home</button>
            <button onClick={()=>{navigate("/#about")}}>About</button>
            <button onClick={()=>{navigate("/#contact")}}>Contact Us</button>
          </div>
          <div className="theme-switcher" id="themeSwitcher">
            🌙
          </div>
        </nav>
      </header>

      {/* Appointment Form */}
      <section id="appointment" className="section">
        <h2>Book Your Appointment</h2>
        <form onSubmit={handleFormSubmit} className="appointment-form">
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            id="age"
            placeholder="Your Age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <select
            id="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="tel"
            id="mobile"
            placeholder="Your Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            id="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleInputChange}
            required
            style={{ fontSize: "18px", padding: "10px", width: "100%" }}
          />
          <button type="submit" className="btn primary-btn">
            Book Appointment
          </button>
        </form>
      </section>

      {/* Confirmation Popup */}
      {showPopup && (
        <div id="popup" className="popup">
          <div id="popupMessage">{popupMessage}</div>
          <button onClick={closePopup}>Close</button>
        </div>
      )}

      {/* Appointments List */}
      <section id="appointmentsList" className="section">
        <h2>Your Appointments</h2>
        <ul id="appointmentsListContent">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <li key={index}>
                {appointment.name} - {appointment.appointmentDate} -{" "}
                {appointment.gender}
              </li>
            ))
          ) : (
            <p>No appointments booked yet.</p>
          )}
        </ul>
        <p id="totalAppointments">
          Total Appointments: {appointments.length}
        </p>
      </section>

      <footer>
        <p>&copy; 2024 Doctor Appointment System</p>
      </footer>
    </div>
  );
};

export default Appointment;
