"use client";

import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useState } from "react";

const Profile = () => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      alert("Profile updated successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow p-6">
        <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
        )}

        <p className="text-center text-sm text-gray-600 mb-4">{user?.email}</p>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Display Name"
            className="input input-bordered w-full mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full mb-4"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Profile;
