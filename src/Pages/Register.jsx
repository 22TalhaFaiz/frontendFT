import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import API_URL from  '../config.js'

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  passw: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must contain upper, lower, number & special char"
    ),
  age: z.coerce.number().min(1, "Age must be a positive number"),
  height: z.coerce.number().min(50, "Height must be realistic"),
  weight: z.coerce.number().min(20, "Weight must be realistic"),
  gender: z.enum(["Male", "Female", "Other"]),
  activityLevel: z.enum([
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active"
  ]),
 
});

const Register = () => {
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
      setUploading(true);
      let uploadedImageUrl = "";

      // Upload image first if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const res = await axios.post(
          "https://api.imgbb.com/1/upload?key=49425eb415cd63716f797f57d74c533a",
          formData,
          { 
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 30000 // 30 second timeout for image upload
          }
        );

        uploadedImageUrl = res.data.data.url;
      }

      // Submit to backend with uploaded image URL
      await axios.post(`${API_URL}/api/auth/r`, {
        ...data,
        profilePicture: uploadedImageUrl,
      });

      toast.success("User registered successfully");
      reset();
      navigate("/l");

      setSelectedFile(null); // Clear selected file
    } catch (err) {
      if (err?.response?.status === 409) {
        toast.error(err.response.data.msg);
      } else if (err.code === 'ECONNABORTED') {
        toast.error("Upload timeout. Please try again with a smaller image.");
      } else {
        toast.error("Something went wrong");
        console.error(err);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: Add file validation
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("Image size should be less than 5MB");
        e.target.value = ""; // Clear the input
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF)");
        e.target.value = ""; // Clear the input
        return;
      }
      
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 pt-20">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-[url('/assets/img/hero/hero-1.jpg')] bg-cover bg-center"></div>

      <ToastContainer />

      <div className="relative z-10 w-full max-w-md mx-auto p-6 rounded-xl shadow-lg backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1 text-orange-600">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 border text-white bg-gray-800/80 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1 text-orange-600">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border text-white bg-gray-800/80 border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1 text-orange-600">Password</label>
            <input
              type="password"
              {...register("passw")}
              className="w-full px-3 py-2 border text-white bg-gray-800/80 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter a strong password"
            />
            {errors.passw && <p className="text-sm text-red-500 mt-1">{errors.passw.message}</p>}
          </div>

          {/* Age and Height Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-orange-600">Age</label>
              <input
                type="number"
                {...register("age")}
                className="w-full px-3 py-2 border text-white bg-gray-800/80 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your age"
              />
              {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1 text-orange-600">Height (cm)</label>
              <input
                type="number"
                {...register("height")}
                className="w-full px-3 py-2 border text-white bg-gray-800/80 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Height in cm"
              />
              {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height.message}</p>}
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block font-medium mb-1 text-orange-600">Weight (kg)</label>
            <input
              type="number"
              {...register("weight")}
              className="w-full px-3 py-2 border text-white bg-gray-800/80 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your weight in kg"
            />
            {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight.message}</p>}
          </div>

          {/* Gender and Activity Level Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-orange-600">Gender</label>
              <select {...register("gender")} className="w-full px-3 py-2 border text-white bg-gray-800/80 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1 text-orange-600">Activity Level</label>
              <select {...register("activityLevel")} className="w-full px-3 py-2 border text-white bg-gray-800/80 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Select Activity Level</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Lightly Active">Lightly Active</option>
                <option value="Moderately Active">Moderately Active</option>
                <option value="Very Active">Very Active</option>
              </select>
              {errors.activityLevel && <p className="text-sm text-red-500 mt-1">{errors.activityLevel.message}</p>}
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block font-medium mb-1 text-orange-600">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border text-white border-gray-300 rounded bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700"
            />
            {selectedFile && (
              <p className="text-green-400 text-sm mt-1">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded transition duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={uploading}
          >
            {uploading ? "Uploading & Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;