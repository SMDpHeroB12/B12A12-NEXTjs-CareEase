"use client";

import { Suspense } from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-center mt-10">Loading...</p>;
          <span className="loading loading-spinner text-accent"></span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
