import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaDumbbell, FaAppleAlt, FaCalculator, FaChartLine, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3008/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-white w-64 lg:w-72 min-h-screen px-6 py-8 shadow-2xl transform transition-all duration-300 ease-in-out z-50 border-r border-neutral-700 ${
          sidebarOpen ? "fixed top-0 left-0" : "fixed -translate-x-full top-0 left-0 lg:static lg:translate-x-0"
        }`}
      >
        {/* Logo/Title */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Fitness
            </span>{" "}
            Tracker
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 px-3">
              Main Menu
            </h2>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-700/50 hover:text-white transition-all duration-200 group text-neutral-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <FaHome className="text-lg group-hover:text-blue-400 transition-colors duration-200" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/workout"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-700/50 hover:text-white transition-all duration-200 group text-neutral-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <FaDumbbell className="text-lg group-hover:text-green-400 transition-colors duration-200" />
                  <span className="font-medium">Workout Tracking</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/nutrition"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-700/50 hover:text-white transition-all duration-200 group text-neutral-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <FaAppleAlt className="text-lg group-hover:text-red-400 transition-colors duration-200" />
                  <span className="font-medium">Nutrition Tracking</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/bmi"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-700/50 hover:text-white transition-all duration-200 group text-neutral-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <FaCalculator className="text-lg group-hover:text-yellow-400 transition-colors duration-200" />
                  <span className="font-medium">BMI Calculator</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/progress"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-neutral-700/50 hover:text-white transition-all duration-200 group text-neutral-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <FaChartLine className="text-lg group-hover:text-purple-400 transition-colors duration-200" />
                  <span className="font-medium">Progress Tracking</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="pt-6 border-t border-neutral-700">
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 px-3">
              Account
            </h2>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-neutral-700/50 hover:text-white transition-all duration-200 group text-neutral-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <FaUser className="text-lg group-hover:text-cyan-400 transition-colors duration-200" />
                  <span className="font-medium">Account</span>
                </div>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`mt-2 ml-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  dropdownOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-neutral-800/80 backdrop-blur-sm rounded-lg shadow-xl border border-neutral-600 overflow-hidden">
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-700/50 hover:text-white transition-all duration-200 text-neutral-300 border-b border-neutral-700 last:border-b-0"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUser className="text-sm text-cyan-400" />
                    Profile
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-700/50 hover:text-white transition-all duration-200 text-neutral-300 border-b border-neutral-700 last:border-b-0"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaCog className="text-sm text-gray-400" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 text-neutral-300"
                  >
                    <FaSignOutAlt className="text-sm text-red-400" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom decoration */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent"></div>
          <div className="text-center mt-4">
            <p className="text-xs text-neutral-500">Stay fit, stay healthy</p>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-6 left-6 z-50 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-3 rounded-xl shadow-2xl border border-neutral-700 hover:scale-110 transition-all duration-200 hover:shadow-xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {sidebarOpen ? (
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>
    </div>
  );
};

export default DashboardNavbar;