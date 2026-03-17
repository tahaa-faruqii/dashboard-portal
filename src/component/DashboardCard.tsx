import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, CheckCircle } from "lucide-react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  color,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group bg-gradient-to-br p-6 rounded-2xl shadow-xl border-0 hover:shadow-2xl transition-all duration-300 cursor-pointer ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        {icon}
      </div>

      <div className="flex items-center mt-4 pt-4 border-t border-white/20">
        <span
          className={`text-sm font-semibold flex items-center ${
            trend === "up" ? "text-green-400" : "text-red-400"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
          )}
          {change}%
        </span>
        <span className="text-xs text-gray-400 ml-2">since last month</span>
      </div>
    </motion.div>
  );
};

const DashboardCards: React.FC = () => {
  const dashboardData = useSelector(
    (state: RootState) => state.dashboard.metrics,
  );

  const cardsData = [
    {
      title: "Total Users",
      value: dashboardData.totalUsers.toLocaleString(),
      change: 12.5,
      trend: "up" as const,
      icon: <Users className="w-8 h-8 text-white/80" />,
      color: "from-indigo-500 to-blue-600",
    },
    {
      title: "Active Sessions",
      value: dashboardData.activeSessions,
      change: 8.2,
      trend: "up" as const,
      icon: <DollarSign className="w-8 h-8 text-white/80" />,
      color: "from-cyan-500 to-teal-600",
    },
    {
      title: "Revenue",
      value: `$${dashboardData.revenue.toLocaleString()}`,
      change: 15.3,
      trend: "up" as const,
      icon: <DollarSign className="w-8 h-8 text-white/80" />,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "Tasks",
      value: dashboardData.tasks,
      change: -2.1,
      trend: "down" as const,
      icon: <CheckCircle className="w-8 h-8 text-white/80" />,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cardsData.map((card, index) => (
        <DashboardCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default DashboardCards;
