import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">
          <span className="text-accent">Care</span>Ease
        </h1>

        <p className="mt-4 text-gray-600 max-w-md mx-auto">
          A trusted platform to book baby sitting, elderly care and sick person
          care services easily and securely.
        </p>

        <button className="btn btn-secondary mt-6 text-white">
          Get Started
        </button>
      </div>
    </main>
  );
}
