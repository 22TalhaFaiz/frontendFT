import { Link } from "react-router-dom";
import MetricCard from "../Components/DashboardComponents/Card/MetricCard";
import UserProfileCard from "../Components/DashboardComponents/Card/ProfileCard";
import RecentWorkouts from "../Components/DashboardComponents/Charts/RecentWorkouts";
import WorkoutChart from "../Components/DashboardComponents/Charts/WorkoutChart";
import SearchModel from "../Components/SearchModel";
import { FaChartLine, FaDumbbell, FaFire, FaAppleAlt, FaTrophy, FaPlus, FaBolt } from "react-icons/fa";
import NutritionCard from "../Components/DashboardComponents/Charts/NutritionChart";
import ProgressCharts from "../Components/DashboardComponents/Charts/ProgressChart";

const DashboardHome = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaFire className="text-white text-lg" />
              </div>
              <h1 className="text-4xl font-bold text-white">
                Welcome to your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
            </div>
            <p className="text-neutral-400 text-lg ml-13">Track your progress and stay motivated on your fitness journey</p>
            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 ml-13"></div>
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">127</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wide">Days Active</div>
            </div>
            <div className="w-px h-12 bg-neutral-700"></div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-400">85%</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wide">Goal Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Section - Main Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Search & Quick Actions */}
          <div className="bg-gradient-to-r from-neutral-800/60 to-neutral-700/40 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Quick Search</h3>
                  <p className="text-sm text-neutral-400">Find workouts, meals, or exercises</p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200 text-sm font-medium">
                  <Link to="/dashboard/workout" >Log Workout</Link>
                </button>
                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/30 transition-all duration-200 text-sm font-medium">
                  <Link to="/dashboard/nutrition"> Add Meal </Link>
                </button>
              </div>
            </div>
            <SearchModel />
          </div>

          {/* Metrics Overview */}
          <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/40 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <FaChartLine className="text-white text-sm" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Today's Overview</h2>
                <p className="text-sm text-neutral-400">Your daily fitness metrics at a glance</p>
              </div>
            </div>
            <MetricCard />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Workout Chart */}
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaDumbbell className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Workouts</h3>
                  <p className="text-sm text-neutral-400">Exercise performance</p>
                </div>
              </div>
              <div className="h-48 relative">
                <WorkoutChart />
                <div className="absolute top-2 right-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-full">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-orange-300 font-medium">Active</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-orange-500/20">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">This Week</span>
                  <span className="text-orange-400 font-semibold">12 Sessions</span>
                </div>
              </div>
            </div>

            {/* Nutrition Chart */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FaAppleAlt className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Nutrition</h3>
                  <p className="text-sm text-neutral-400">Calorie & macro tracking</p>
                </div>
              </div>
              <div className="h-48 relative">
                <NutritionCard />
                <div className="absolute top-2 right-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-300 font-medium">On Track</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-500/20">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Daily Goal</span>
                  <span className="text-green-400 font-semibold">1,847/2,200 cal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Chart in New Row */}
          <div className="mt-6 bg-gradient-to-br from-purple-500/10 to-blue-500/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaTrophy className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Progress</h3>
                <p className="text-sm text-neutral-400">Goals & achievements</p>
              </div>
            </div>
            <div className="mt-6 bg-gradient-to-br from-purple-500/10 to-blue-500/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <ProgressCharts />
              <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded-full">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-xs text-purple-300 font-medium">Improving</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-500/20">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Monthly Goal</span>
                <span className="text-purple-400 font-semibold">73% Complete</span>
              </div>
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/40 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <FaBolt className="text-white text-sm" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                  <p className="text-sm text-neutral-400">Your latest fitness activities</p>
                </div>
              </div>
              <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
               <Link to="/dashboard/wget"> View All </Link>
              </button>
            </div>

            <div className="bg-gradient-to-br from-neutral-700/30 to-neutral-800/20 rounded-xl p-4 border border-neutral-600/30">
              <RecentWorkouts />
            </div>
          </div>
        </div>

        {/* Right Section - Profile & Summary */}
        <div className="xl:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-gradient-to-b from-neutral-800/60 to-neutral-900/40 backdrop-blur-sm rounded-2xl p-1 border border-neutral-700/50 shadow-xl h-fit">
            <div className="bg-gradient-to-br from-neutral-800/40 to-neutral-900/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your Profile</h3>
                  <p className="text-sm text-neutral-400">Personal dashboard</p>
                </div>
              </div>
              <UserProfileCard />
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/40 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700/50 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Weekly Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaDumbbell className="text-orange-400" />
                  <span className="text-sm text-neutral-300">Workouts</span>
                </div>
                <span className="text-white font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaFire className="text-red-400" />
                  <span className="text-sm text-neutral-300">Calories Burned</span>
                </div>
                <span className="text-white font-semibold">3,240</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaTrophy className="text-yellow-400" />
                  <span className="text-sm text-neutral-300">Goals Met</span>
                </div>
                <span className="text-white font-semibold">5/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group">
          <FaPlus className="text-white text-xl group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-green-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </main>
  );
};

export default DashboardHome;