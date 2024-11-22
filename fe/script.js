let appointments = [];

// Function to handle form submission and booking an appointment
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const mobile = document.getElementById('mobile').value;

    // Create an appointment object
    const appointment = {
        id: new Date().getTime(),  // Unique ID based on timestamp
        name,
        age,
        gender,
        mobile,
        status: 'Booked'
    };

    // Add the appointment to the list
    appointments.push(appointment);

    // Update the appointments list
    updateAppointmentsList();

    // Clear the form fields
    document.getElementById('appointmentForm').reset();

    // Show confirmation message
    showPopup('Your appointment has been successfully booked!');
});

// Function to update the list of appointments
function updateAppointmentsList() {
    const list = document.getElementById('appointmentsListContent');
    list.innerHTML = '';  // Clear the list before updating
    let totalAppointments = 0;

    appointments.forEach(appointment => {
        const listItem = document.createElement('li');
        listItem.classList.add('appointment-item');
        listItem.innerHTML = `
            <p>Name: ${appointment.name}</p>
            <p>Age: ${appointment.age}</p>
            <p>Gender: ${appointment.gender}</p>
            <p>Mobile: ${appointment.mobile}</p>
            <p>Status: ${appointment.status}</p>
            ${appointment.status !== 'Cancelled' ? `<button onclick="cancelAppointment(${appointment.id})">Cancel</button>
            <button onclick="openUpdateForm(${appointment.id})">Update</button>` : ''}
        `;
        list.appendChild(listItem);
        totalAppointments++;
    });

    // Update the total number of appointments
    document.getElementById('totalAppointments').textContent = `Total Appointments: ${totalAppointments}`;
}

// Function to cancel an appointment
function cancelAppointment(appointmentId) {
    // Find the index of the appointment by matching the ID
    const appointmentIndex = appointments.findIndex(app => app.id === appointmentId);

    if (appointmentIndex !== -1) {
        // Update the status of the appointment to 'Cancelled'
        appointments[appointmentIndex].status = 'Cancelled';

        // Re-render the appointments list to reflect the change
        updateAppointmentsList();

        // Show a confirmation message
        showPopup('Your appointment has been cancelled.');
    }
}

// Function to open the update form pre-filled with the appointment details
function openUpdateForm(appointmentId) {
    const appointment = appointments.find(app => app.id === appointmentId);

    if (appointment) {
        // Pre-fill the form fields with appointment details
        document.getElementById('updateName').value = appointment.name;
        document.getElementById('updateAge').value = appointment.age;
        document.getElementById('updateGender').value = appointment.gender;
        document.getElementById('updateMobile').value = appointment.mobile;

        // Show the update form
        document.getElementById('updateAppointmentForm').style.display = 'block';

        // Hide the appointment list section
        document.getElementById('appointmentsList').style.display = 'none';

        // Store the appointment ID to update later
        document.getElementById('updateForm').onsubmit = function(event) {
            event.preventDefault();

            // Get updated values
            appointment.name = document.getElementById('updateName').value;
            appointment.age = document.getElementById('updateAge').value;
            appointment.gender = document.getElementById('updateGender').value;
            appointment.mobile = document.getElementById('updateMobile').value;

            // Update the appointments list and close the form
            updateAppointmentsList();
            cancelUpdate();  // Close the form
        };
    }
}

// Function to cancel the update form
function cancelUpdate() {
    document.getElementById('updateAppointmentForm').style.display = 'none';
    document.getElementById('appointmentsList').style.display = 'block';
}

// Function to show the popup message
function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.innerText = message;
    popup.style.display = 'block';  // Show the popup
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';  // Hide the popup
}

// Theme switcher
document.getElementById('themeSwitcher').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    this.textContent = document.body.classList.contains('dark-theme') ? '🌞' : '🌙';
});

// Initialize the appointments list when the page loads
updateAppointmentsList();
