import React, { useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const RecentWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/workouts`, {
          withCredentials: true,
        });
        setWorkouts(res.data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    className="bg-neutral-900 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Recent Workouts</h2>

      {workouts.length === 0 ? (
        <p className="text-gray-600">No workouts found.</p>
      ) : (
        <div className="space-y-4">
          {workouts.slice(0, 5).map((workout, index) => (
            <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden shadow transition-all">
              <button
                onClick={() => toggleExpand(index)}
                className="w-full text-left px-4 py-3 bg-neutral-800 hover:bg-neutral-500 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">{workout.title}</h3>
                  <p className="text-sm text-white">
                    {workout.type} | {workout.duration} min | {new Date(workout.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-black text-xl">
                  {expanded === index ? '−' : '+'}
                </span>
              </button>

              {expanded === index && (
                <div className="bg-neutral-700 px-4 py-3 animate-fade-in-down">
                  {workout.exercises.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {workout.exercises.map((ex, exIdx) => (
                        <li key={exIdx} className="text-white">
                          <span className="font-medium text-white">{ex.name}</span>: {ex.sets}x{ex.reps} @ {ex.weight || 0}kg
                          {ex.notes && (
                            <span className="italic text-sm text-white"> – {ex.notes}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No exercises listed.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentWorkouts;
