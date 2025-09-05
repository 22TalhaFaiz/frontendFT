import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp, Activity, Target, User } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProgressCharts = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/progress`, { withCredentials: true });
        setProgressData(res.data);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
        toast.error('❌ Failed to fetch progress data', { 
          theme: 'dark',
          style: {
            background: '#1e1b4b',
            border: '1px solid #7c3aed',
            color: '#e2e8f0'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin"/>
        <p className="text-purple-200 text-lg font-medium">Loading your progress...</p>
      </div>
    </div>
  );

  if (progressData.length === 0) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 lg:p-12 shadow-2xl max-w-md mx-auto">
        <Activity className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <p className="text-purple-200 text-xl font-medium">No progress data yet.</p>
        <p className="text-slate-400 mt-2">Start tracking to see your amazing journey!</p>
      </div>
    </div>
  );

  // Prepare data for charts
  const chartData = progressData.map(p => ({
    date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: p.weight,
    chest: p.bodyMeasurements?.chest || 0,
    waist: p.bodyMeasurements?.waist || 0,
    hips: p.bodyMeasurements?.hips || 0,
    arms: p.bodyMeasurements?.arms || 0,
    legs: p.bodyMeasurements?.legs || 0,
    runTime: p.performanceMetrics?.runTime || 0,
    liftingMax: p.performanceMetrics?.liftingMax || 0
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-purple-200 font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <ToastContainer />
      <div className="max-w-7xl mx-auto space-y-8 lg:space-y-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
            Progress Analytics
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Track your fitness journey with beautiful visualizations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {[
            { icon: User, label: "Weight", value: `${chartData[chartData.length - 1]?.weight || 0} kg`, color: "text-purple-400" },
            { icon: Target, label: "Latest Chest", value: `${chartData[chartData.length - 1]?.chest || 0}"`, color: "text-pink-400" },
            { icon: TrendingUp, label: "Max Lift", value: `${chartData[chartData.length - 1]?.liftingMax || 0} kg`, color: "text-blue-400" },
            { icon: Activity, label: "Best Run", value: `${Math.min(...chartData.map(d => d.runTime).filter(t => t > 0)) || 0} min`, color: "text-green-400" }
          ].map((stat, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-purple-400/40">
              <div className="flex items-center space-x-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-white text-xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Weight Chart */}
          <div className="xl:col-span-2 bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl lg:text-2xl font-bold text-white">Weight Progress</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tick={{ fill: '#9ca3af' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#a855f7" 
                  strokeWidth={3}
                  dot={{ fill: '#a855f7', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#a855f7', strokeWidth: 2, fill: '#1e1b4b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Body Measurements Chart */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-pink-400" />
              <h2 className="text-xl lg:text-2xl font-bold text-white">Body Measurements</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tick={{ fill: '#9ca3af' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                <Line type="monotone" dataKey="chest" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="waist" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="hips" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="arms" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="legs" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Metrics Chart */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <Activity className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl lg:text-2xl font-bold text-white">Performance Metrics</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={12}
                  tick={{ fill: '#9ca3af' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                <Line 
                  type="monotone" 
                  dataKey="runTime" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Run Time (min)"
                />
                <Line 
                  type="monotone" 
                  dataKey="liftingMax" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Max Lift (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;