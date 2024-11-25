import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

// Reusable UI Components
function Table({ children }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
}

function TableHeader({ children }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

function TableRow({ children }) {
  return <tr>{children}</tr>;
}

function TableHead({ children }) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
}

function TableBody({ children }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  );
}

function TableCell({ children }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {children}
    </td>
  );
}

function Badge({ variant, children }) {
  const baseClasses =
    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
  const variants = {
    success: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`${baseClasses} ${variants[variant]}`}>{children}</span>
  );
}

function Card({ children }) {
  return <div className="bg-white p-6 rounded-lg shadow-lg">{children}</div>;
}

function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

function CardTitle({ children }) {
  return <h3 className="text-xl font-semibold text-gray-800">{children}</h3>;
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

// Main DoctorDashboard Component
export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState({});

  // Fetch Appointments
  async function fetchAppointments() {
    try {
      const res = await fetch("http://localhost:8000/api/appointments");
      const data = await res.json();
      if (res.ok) {
        setAppointments(data.success);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }

  async function fetchDoctor() {
    try {
      const res = await fetch(
        `http://localhost:8000/api/doctor/${localStorage.getItem("doctor_id")}`
      );
      const data = await res.json();
      if (res.ok) {
        setDoctor(data);
      } else {
        console.error("Failed to fetch doctor details");
      }
    } catch (err) {
      console.error("Error fetching doctor details:", err);
    }
  }

  useEffect(() => {
    fetchDoctor();
    fetchAppointments();
  }, []); // Dependency array to prevent infinite calls

  const todaySchedule = [];

  const notifications = [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Doctor Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span>{doctor.name}</span>

            <span>
              Status: <strong className="text-green-400">Online</strong>
            </span>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="bg-red-400 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Doctor Info */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <strong>Name:</strong> {doctor.name}
                  </div>
                  <div>
                    <strong>Speciality:</strong> {doctor.speciality}
                  </div>
                  <div>
                    <strong>Email:</strong> {doctor.email}
                  </div>
                  <div>
                    <strong>Mobile:</strong> {doctor.mobile}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments Table */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.name}</TableCell>
                        <TableCell>{appointment.age}</TableCell>
                        <TableCell>{appointment.gender}</TableCell>
                        <TableCell>{appointment.mobile}</TableCell>
                        <TableCell>
                          {new Date(appointment.date).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              appointment.status === "Completed"
                                ? "success"
                                : appointment.status === "Cancelled"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
