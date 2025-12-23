export default function ServiceDetails({ params }) {
  const { service_id } = params;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold">Service Details</h1>
        <p className="mt-4 text-gray-600">
          Service ID: <span className="font-semibold">{service_id}</span>
        </p>

        <button className="btn btn-primary mt-6">Book This Service</button>
      </div>
    </main>
  );
}
