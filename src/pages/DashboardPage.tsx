import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

import { motion } from "framer-motion";
import { generateRandomData } from "../feature/dashboard/dashboardSlice";
import DashboardCards from "../component/DashboardCard";
import ChartCard from "../component/ChartCard";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const metrics = useSelector((state: RootState) => state.dashboard.metrics);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(generateRandomData());
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's what's happening with your data.
          </p>
        </div>
      </div>

      <DashboardCards />
      <ChartCard />
    </motion.div>
  );
};

export default DashboardPage;
