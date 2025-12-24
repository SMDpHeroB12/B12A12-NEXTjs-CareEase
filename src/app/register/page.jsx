"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, googleLogin, user } = useAuth();
  const router = useRouter();

  // ⚠️ Logged-in user should not see register page
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const nid = e.target.nid.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const contact = e.target.contact.value;
    const password = e.target.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters with 1 uppercase and 1 lowercase letter.",
      });
      return;
    }

    try {
      await createUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to CareEase!",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/my-bookings");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await googleLogin();
      Swal.fire({
        icon: "success",
        title: "Registration and Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/my-bookings");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="card w-96 bg-base-100 shadow p-6"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          name="nid"
          type="text"
          placeholder="NID No"
          className="input input-bordered mt-3 w-full"
          required
        />

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="input input-bordered mt-3 w-full"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered mt-3 w-full"
          required
        />

        <input
          name="contact"
          type="text"
          placeholder="Contact"
          className="input input-bordered mt-3 w-full"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered mt-3 w-full"
          required
        />

        <button className="btn btn-primary mt-4 w-full">Register</button>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="btn mt-2 w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
