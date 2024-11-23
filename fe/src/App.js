import React from "react";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate =useNavigate();
  return (
    <div className="container">
      {/* Navbar */}
      <div className="navbar">
        <button onClick={() => document.getElementById("home-details").scrollIntoView({ behavior: "smooth" })}>
          Home
        </button>
        <button onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>
          About
        </button>
        <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
          Contact Us
        </button>
      </div>

      {/* Header */}
      <header>
        <h1>Welcome to the Doctor Appointment System</h1>
      </header>

      {/* Options Section */}
      <main>
        <div className="options">
          <div className="option" onClick={() => navigate("/book-appointment")}>
            <h2>Book an Appointment</h2>
            <p>Patients can easily book an appointment with a doctor.</p>
          </div>
          <div className="option" onClick={() => navigate("/doctor-login")}>
            <h2>Doctor's Database/Login</h2>
            <p>Doctors can view appointments and manage their schedule.</p>
          </div>
        </div>

        {/* Home Details Section */}
        <section id="home-details">
          <h2>Home Details</h2>
          <p>
            The Doctor Appointment System is designed to streamline the process of booking appointments with healthcare providers.
            Patients can easily navigate the platform to find available doctors, view their schedules, and book appointments at their convenience.
          </p>
          <p>
            To use the system, simply click on the "Book an Appointment" option to start the process. You will be guided through selecting
            a doctor, choosing a date and time, and confirming your appointment. For doctors, the "Doctor's Database/Login" option allows
            you to manage your appointments and view patient information.
          </p>
          <p>
            We aim to provide a user-friendly experience that enhances the interaction between patients and healthcare providers,
            making healthcare more accessible and efficient.
          </p>
        </section>

        {/* About Section */}
        <section id="about">
          <h2>About the Doctor Appointment System</h2>
          <p>
            The Doctor Appointment System is an innovative web-based platform designed to simplify and optimize the appointment
            scheduling process between healthcare providers and patients. In an era where efficiency and accessibility are paramount,
            this system addresses the common challenges faced in traditional appointment management, offering a seamless experience for both parties.
          </p>
          <h3>Vision</h3>
          <p>
            Our vision is to bridge the gap between healthcare providers and patients through technology, making medical appointments
            more manageable and less stressful. We aim to enhance the patient experience while providing doctors with robust tools to
            manage their practices effectively.
          </p>
          <h3>Mission</h3>
          <p>
            The mission of the Doctor Appointment System is to empower patients to take charge of their healthcare by providing a
            user-friendly platform for booking appointments. Simultaneously, we support doctors by streamlining their administrative
            tasks, allowing them to focus more on patient care and less on scheduling logistics.
          </p>
          <h3>Purpose</h3>
          <p>
            The primary purpose of the Doctor Appointment System is to facilitate a smooth appointment process that benefits both
            patients and healthcare professionals. By leveraging technology, we aspire to enhance health service accessibility, improve
            the organization of medical practices, and ultimately contribute to better healthcare outcomes.
          </p>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <h2>Contact Us</h2>
          <h4 style={{ textAlign: "center" }}>
            <b>
              Phone: <a href="tel:+917599406897">+91-7599406897</a>
              <br />
              Email: <a href="mailto:docappointmentsys@gmail.com">docappointmentsys@gmail.com</a>
              <br />
              Instagram: <a href="https://instagram.com/docappointmentsys" target="_blank" rel="noopener noreferrer">Instagram</a>
            </b>
          </h4>
        </section>
      </main>
    </div>
  );
}

export default App;
