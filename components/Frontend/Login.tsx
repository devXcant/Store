"use client";
import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const payload = {
      email,
    };

    try {
      const response = await axios.post("http://localhost:3001/api/login_user", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Login successful");
        console.log("Login successful", response.data);
      } else {
        setError("Login failed. Please try again.");
        console.log("Login failed", response.data);
      }
    } catch (err: any) {
      setError("An error occurred. Please try again later.");
      console.error("Error logging in:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-16 px-4 md:px-8">
      <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}

        <button
          type="submit"
          className={`w-full py-2 bg-blue-500 text-white rounded-md mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
