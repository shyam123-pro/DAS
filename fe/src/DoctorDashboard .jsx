import React from "react";
import { Bell } from "lucide-react";

// Reusable UI Components
function Table({ children }) {
  return <table className="min-w-full divide-y divide-gray-200">{children}</table>;
}

function TableHeader({ children }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

function TableRow({ children }) {
  return <tr>{children}</tr>;
}

function TableHead({ children }) {
  return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
}

function TableBody({ children }) {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
}

function TableCell({ children }) {
  return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{children}</td>;
}

function Badge({ variant, children }) {
  const baseClasses = "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
  const variants = {
    success: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };
  return <span className={`${baseClasses} ${variants[variant]}`}>{children}</span>;
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
  const appointments = [
    { id: 1, patient: "John Smith", date: "2023-06-15", time: "09:00 AM", status: "Pending" },
    { id: 2, patient: "Emma Johnson", date: "2023-06-15", time: "10:30 AM", status: "Completed" },
    { id: 3, patient: "Michael Brown", date: "2023-06-15", time: "02:00 PM", status: "Cancelled" },
    { id: 4, patient: "Sophia Davis", date: "2023-06-16", time: "11:00 AM", status: "Pending" },
    { id: 5, patient: "Oliver Wilson", date: "2023-06-16", time: "03:30 PM", status: "Pending" },
  ];

  const todaySchedule = [
    { time: "09:00 AM", patient: "John Smith" },
    { time: "10:30 AM", patient: "Emma Johnson" },
    { time: "02:00 PM", patient: "Michael Brown" },
  ];

  const notifications = [
    { id: 1, message: "New patient file uploaded" },
    { id: 2, message: "Appointment rescheduled" },
    { id: 3, message: "Lab results available" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Status: <strong className="text-green-400">Online</strong></span>
            <img src="https://via.placeholder.com/40" alt="Doctor Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.patient}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
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

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            {/* Daily Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {todaySchedule.map((schedule, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-800">{schedule.time}</span>
                      <span className="text-sm text-gray-600">{schedule.patient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="text-sm text-gray-600">
                      {notification.message}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
