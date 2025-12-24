"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import PrivateRoute from "@/components/PrivateRoute";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    fetch(`/api/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) loadBookings();
  }, [user]);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Cancel this booking?");
    if (!confirm) return;

    await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadBookings();
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <p className="text-center mt-10">Loading...</p>;
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  if (bookings.length === 0) {
    return <p className="text-center mt-10">No bookings found.</p>;
  }

  return (
    <PrivateRoute>
      <main className="min-h-screen px-4 py-10">
        <h2 className="text-2xl font-bold text-center mb-6">My Bookings</h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra max-w-5xl mx-auto">
            <thead>
              <tr>
                <th>Service</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.service}</td>
                  <td>{b.hours} hrs</td>
                  <td>{b.location}</td>
                  <td>৳{b.totalCost}</td>
                  <td>
                    <span className="badge badge-warning">{b.status}</span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-neutral"
                      onClick={() => alert(JSON.stringify(b, null, 2))}
                    >
                      View Details
                    </button>

                    {b.status === "pending" && (
                      <button
                        className="btn btn-sm text-white btn-error"
                        onClick={() => handleCancel(b._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </PrivateRoute>
  );
};

export default MyBookings;
