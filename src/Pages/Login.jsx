import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import API_URL from  '../config.js'

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(`${API_URL}}/api/auth/l`, data , {
        withCredentials: true,
      });
      toast.success( res.data.message || "Login successful!");
      reset();
      navigate("/dashboard");
    
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[url('/assets/img/hero/hero-1.jpg')] bg-cover bg-center" />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 rounded-xl shadow-lg border-orange-500"
      >
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-600 mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border text-white border-gray-300 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-orange-600 mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border text-white border-gray-300 rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-orange-600 mt-4">
          Don't have an account?{" "}
          <Link to="/r" className="underline text-orange-500">
            Register
          </Link>
        </p>
        <p className="text-sm text-center text-orange-600 mt-4">
          Forgot Your Password? Click Here{" "}
          <Link to="/fp" className="underline text-orange-500">
            Forgot Password
          </Link>
        </p>

        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
