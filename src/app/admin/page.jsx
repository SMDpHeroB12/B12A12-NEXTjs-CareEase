"use client";

import { useEffect, useState } from "react";
import AdminRoute from "@/components/AdminRoute";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <AdminRoute>
      <main className="min-h-screen px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra max-w-6xl mx-auto">
            <thead>
              <tr>
                <th>User</th>
                <th>Service</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.userEmail}</td>
                  <td>{b.service}</td>
                  <td>{b.hours} hrs</td>
                  <td>{b.location}</td>
                  <td>৳{b.totalCost}</td>
                  <td>
                    <span className="badge badge-info">{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </AdminRoute>
  );
};

export default AdminDashboard;
