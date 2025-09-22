import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
const [authorized , setAuthorized] = useState(null);
const [loading , setLoading] = useState(true);

useEffect(() => {
    axios.get(`${API_URL}/api/auth/dashboard`,{
        withCredentials: true,
    }).then (() => {
        setAuthorized(true);
        setLoading(false);

    })
    .catch(() => {
        setAuthorized(false);
        setLoading(false);
    })
},[])

    if(loading) return <div className="text-center mt-10 text-orange-500"> Checking Session...</div>

  return authorized ? children : <Navigate to="/l" />
}

export default ProtectedRoute