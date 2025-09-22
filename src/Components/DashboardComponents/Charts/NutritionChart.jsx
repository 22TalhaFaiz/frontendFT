import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { FaAppleAlt, FaSpinner } from 'react-icons/fa';
import API_URL from  '../config.js'

const NutritionChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/api/analytics/frequency`, {
          withCredentials: true
        });

        const formatted = response.data.map((item, index) => {
          let formattedDate;
          if (item.date) {
            const dateObj = new Date(item.date);
            formattedDate = !isNaN(dateObj.getTime())
              ? dateObj.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short'
                })
              : `Day ${index + 1}`;
          } else {
            formattedDate = `Day ${index + 1}`;
          }

          return {
            ...item,
            date: formattedDate,
            count: typeof item.count === 'number' ? item.count : parseInt(item.count) || 0
          };
        });

        setData(formatted);
      } catch (err) {
        console.error('Error fetching nutrition frequency:', err);
        setError('Failed to load nutrition data');
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900/95 border border-green-500/50 rounded-md px-3 py-2 shadow-xl backdrop-blur-sm">
          <p className="text-green-400 font-medium text-xs mb-1">{`${label}`}</p>
          <p className="text-white text-xs">
            <span className="text-neutral-300">Meals: </span>
            <span className="font-semibold text-green-300">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[120px]">
        <FaSpinner className="animate-spin text-green-400 text-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center min-h-[120px]">
        <FaAppleAlt className="text-red-400 text-xl" />
        <p className="text-red-400 text-xs ml-2">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center min-h-[120px]">
        <FaAppleAlt className="text-green-400 text-xl" />
        <p className="text-neutral-400 text-xs ml-2">No meals logged</p>
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
            <linearGradient id="nutritionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 2" stroke="#404040" opacity={0.2} horizontal={true} vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} height={20} interval={0} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} width={20} domain={[0, 'dataMax + 1']} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="url(#nutritionGradient)" radius={[2, 2, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionChart;
