"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";

const Login = () => {
  const { loginUser, googleLogin, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      toast.success("Login successful");
      router.push(redirect);
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Login successful");
      router.push(redirect);
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="card w-96 bg-base-100 shadow p-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input mt-4 w-full"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input mt-3 w-full"
          required
        />

        <div className="text-right mt-2">
          <Link href="/forgot-password" className="text-sm link link-hover">
            Forgot Password?
          </Link>
        </div>

        <button className="btn btn-primary mt-4 w-full">Login</button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn mt-2 w-full"
        >
          <FcGoogle size={25} /> Login with Google
        </button>

        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <Link href="/register" className="link link-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
