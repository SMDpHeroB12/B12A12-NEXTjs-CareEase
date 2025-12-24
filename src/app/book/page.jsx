"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const BookPage = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    service: "Baby Care",
    location: "",
    date: "",
    hours: 1,
  });

  const pricePerHour = 500;
  const totalCost = form.hours * pricePerHour;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...form,
      hours: Number(form.hours),
      totalCost,
      userEmail: user.email,
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Booking successful!");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Book Care Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            name="service"
            className="select select-bordered w-full"
            onChange={handleChange}
          >
            <option>Baby Care</option>
            <option>Elderly Care</option>
            <option>Sick Person Care</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="hours"
            min="1"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />

          <p className="text-center font-semibold">Total Cost: ৳{totalCost}</p>

          <button className="btn btn-neutral w-full">Confirm Booking</button>
        </form>
      </div>
    </main>
  );
};

export default BookPage;
