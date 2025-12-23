"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await loginUser(email, password);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="card w-96 bg-base-100 shadow p-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered mt-4"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered mt-3"
          required
        />

        <button className="btn btn-primary mt-4">Login</button>
        <button
          type="button"
          onClick={googleLogin}
          className="btn btn-secondary mt-2"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
