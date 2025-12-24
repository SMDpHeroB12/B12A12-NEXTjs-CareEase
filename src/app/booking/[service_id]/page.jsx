"use client";

import PrivateRoute from "@/components/PrivateRoute";

const BookingPage = ({ params }) => {
  const { service_id } = params;

  return (
    <PrivateRoute>
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-bold">Booking Page</h1>

          <p className="mt-4 text-gray-600">
            Booking for service ID:{" "}
            <span className="font-semibold">{service_id}</span>
          </p>
        </div>
      </main>
    </PrivateRoute>
  );
};

export default BookingPage;
