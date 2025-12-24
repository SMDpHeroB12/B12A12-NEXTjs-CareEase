"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      fetch(`/api/admin/check?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.isAdmin) {
            router.push("/");
          } else {
            setIsAdmin(true);
          }
          setChecking(false);
        });
    }
  }, [user, loading, router]);

  if (loading || checking) {
    return <p className="text-center mt-10">Checking admin access...</p>;
  }

  if (!isAdmin) return null;

  return children;
};

export default AdminRoute;
