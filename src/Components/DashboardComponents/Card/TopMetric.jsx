import React, { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import axios from "axios";

const TopMetrics = () => {
  const [metrics, setMetrics] = useState({
    calories: 0,
    steps: 0,
    distance: 0,
    sleep: "0h0m",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3008/api/metrics", { withCredentials: true })
      .then((res) => {
        setMetrics(res.data);
      })
      .catch((err) => {
        console.error("Metrics fetch failed:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard title="Calories Burned" value={metrics.calories} unit="kcal" />
      <MetricCard title="Steps" value={metrics.steps.toLocaleString()} />
      <MetricCard title="Distance" value={metrics.distance} unit="km" />
      <MetricCard title="Sleep" value={metrics.sleep} />
    </div>
  );
};

export default TopMetrics;
