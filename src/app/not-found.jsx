import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div>
      <main className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl font-bold text-error">404</h1>
          <p className="mt-4 text-gray-600">Page not found</p>
          <Link href="/" className="btn btn-primary mt-6">
            Go Back Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
