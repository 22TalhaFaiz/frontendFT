import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API_URL from "../config.js";

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // store JWT in localStorage
    if (!token) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/api/auth/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setAuthorized(true);
        setLoading(false);
      })
      .catch(() => {
        setAuthorized(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10 text-orange-500">Checking Session...</div>;

  return authorized ? children : <Navigate to="/l" />;
};

export default ProtectedRoute;
