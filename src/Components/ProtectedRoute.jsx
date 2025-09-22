import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// const API_URL = process.env.NODE_ENV === 'production'
//   ? 'https://backendft-production-9ad8.up.railway.app'
//   : 'http://localhost:3000'; // matches your index.js PORT & HOST

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://backendft-production-9ad8.up.railway.app/api/auth/dashboard`, {
      withCredentials: true, // ✅ important to send session cookie
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
