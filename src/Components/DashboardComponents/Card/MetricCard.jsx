import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const MetricCard = () => {
  const [metrics, setMetrics] = useState({ week: 0, month: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3008/api/analytics/frequency", { withCredentials: true })
      .then(res => {
        // Assuming backend sends: { week: 12, month: 45, total: 178 }
        setMetrics(res.data);
      })
      .catch(err => console.error("Error fetching workout metrics:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mt-6 pt-6 border-t border-neutral-700/50">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{metrics.week}</div>
              <div className="text-xs text-neutral-400">This Week</div>
            </div>
            <div className="text-center border-x border-neutral-700/50">
              <div className="text-2xl font-bold text-green-400 mb-1">{metrics.month}</div>
              <div className="text-xs text-neutral-400">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">{metrics.total}</div>
              <div className="text-xs text-neutral-400">Total</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MetricCard;
