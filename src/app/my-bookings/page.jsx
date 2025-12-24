"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    fetch(`/api/my-bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  };

  const cancelBooking = (id) => {
    fetch("/api/bookings/cancel", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then(() => loadBookings());
  };

  useEffect(() => {
    if (user?.email) {
      loadBookings();
    }
  }, [user]);
  if (loading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center">
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
          <table className="table table-zebra max-w-6xl mx-auto">
            <thead>
              <tr>
                <th>Service</th>
                <th>Duration</th>
                <th>Location</th>
                <th>Date</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.service}</td>
                  <td>{b.hours} hrs</td>
                  <td>{b.location}</td>
                  <td>{b.date}</td>
                  <td>৳{b.totalCost}</td>
                  <td>
                    <span className="badge badge-info">
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </td>
                  <td className="flex gap-3 ">
                    <button
                      className="btn btn-sm btn-neutral "
                      onClick={() => alert(JSON.stringify(b, null, 2))}
                    >
                      View Details
                    </button>

                    {b.status === "pending" && (
                      <button
                        onClick={() => cancelBooking(b._id)}
                        className="btn btn-sm btn-error "
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <p className="text-center mt-10 text-gray-500">
              No bookings found.
            </p>
          )}
        </div>
      </main>
    </PrivateRoute>
  );
};

export default MyBookings;
