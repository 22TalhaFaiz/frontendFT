import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { motion } from "framer-motion";
import { FaDumbbell, FaSpinner } from 'react-icons/fa';
import API_URL from  '../../../config.js'

const WorkoutChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${API_URL}/api/analytics/frequency`, { 
          withCredentials: true 
        });
        
        console.log("API Response:", response.data);
        
        const formatted = response.data.map((item, index) => {
          // Handle different possible date formats and invalid dates
          let formattedDate;
          
          if (item.date) {
            const dateObj = new Date(item.date);
            // Check if date is valid
            if (!isNaN(dateObj.getTime())) {
              formattedDate = dateObj.toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
              });
            } else {
              // Fallback for invalid dates
              formattedDate = `Day ${index + 1}`;
            }
          } else {
            // Fallback when date is null/undefined
            formattedDate = `Day ${index + 1}`;
          }
          
          return {
            ...item,
            date: formattedDate,
            // Ensure count is a number
            count: typeof item.count === 'number' ? item.count : parseInt(item.count) || 0
          };
        });
        
        setData(formatted);
      } catch (err) {
        console.error('Error fetching workout frequency:', err);
        setError('Failed to load workout data');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutData();
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900/95 border border-orange-500/50 rounded-md px-3 py-2 shadow-xl backdrop-blur-sm">
          <p className="text-orange-400 font-medium text-xs mb-1">{`${label}`}</p>
          <p className="text-white text-xs">
            <span className="text-neutral-300">Workouts: </span>
            <span className="font-semibold text-orange-300">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[120px]">
        <div className="text-center">
          <FaSpinner className="animate-spin text-orange-400 text-lg mx-auto mb-2" />
          <p className="text-neutral-500 text-xs">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center min-h-[120px]">
        <div className="text-center">
          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaDumbbell className="text-red-400 text-sm" />
          </div>
          <p className="text-red-400 text-xs font-medium">Error</p>
          <p className="text-neutral-500 text-xs mt-1">Failed to load</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center min-h-[120px]">
        <div className="text-center">
          <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaDumbbell className="text-orange-400 text-sm" />
          </div>
          <p className="text-neutral-400 text-xs font-medium">No workouts</p>
          <p className="text-neutral-500 text-xs mt-1">Start logging!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          barCategoryGap="25%"
        >
          <defs>
            <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#DC2626" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="2 2" 
            stroke="#404040" 
            opacity={0.2}
            horizontal={true}
            vertical={false}
          />
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 10, 
              fill: '#9CA3AF' 
            }}
            height={20}
            interval={0}
          />
          <YAxis 
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 10, 
              fill: '#9CA3AF' 
            }}
            width={20}
            domain={[0, 'dataMax + 1']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            fill="url(#workoutGradient)"
            radius={[2, 2, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutChart;