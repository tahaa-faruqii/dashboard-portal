import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const sampleData = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 300, revenue: 1398 },
  { name: "Mar", users: 500, revenue: 2210 },
  { name: "Apr", users: 278, revenue: 2800 },
  { name: "May", users: 589, revenue: 3890 },
  { name: "Jun", users: 450, revenue: 2900 },
];

const COLORS = [
  "#4F46E5",
  "#06B6D4",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
];

const ChartCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Analytics Overview
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-900/50 p-6 rounded-xl">
          <h4 className="font-medium mb-4 text-gray-900 dark:text-white">
            User Growth
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={{ fill: "#4F46E5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800/50 dark:to-gray-900/50 p-6 rounded-xl">
          <h4 className="font-medium mb-4 text-gray-900 dark:text-white">
            Revenue
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-gray-900/50 p-6 rounded-xl">
        <h4 className="font-medium mb-4 text-gray-900 dark:text-white">
          Device Distribution
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: "Desktop", value: 45 },
                { name: "Mobile", value: 35 },
                { name: "Tablet", value: 20 },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => {
                return `${name} ${((percent ?? 0) * 100).toFixed(0)}%`;
              }}
            >
              {COLORS.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry}
                  strokeWidth={2}
                  stroke="white"
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ChartCard;
