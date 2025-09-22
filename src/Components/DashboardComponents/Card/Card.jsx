/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const WelcomeCard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}api/auth/me`, { withCredentials: true })
      .then((res) => {
        setUserName(res.data?.user?.name || "");
      })
      .catch((err) => {
        console.error("User fetch failed:", err);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-orange-500 text-white rounded-2xl shadow-xl p-6 mb-6 border border-orange-700 relative"
    >
      <h2 className="text-2xl font-extrabold">
        {userName ? `Welcome Back, ${userName}!` : "Welcome Back!"}
      </h2>
      <p className="text-sm mt-1 text-orange-100">
        Glad to see you again. Let's crush your fitness goals today!
      </p>
    </motion.div>
  );
};

export default WelcomeCard;
