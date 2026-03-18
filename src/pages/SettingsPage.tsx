import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { toggleTheme, addNotification } from "../feature/setting/SettingSlice";
import { motion } from "framer-motion";
import {
  Settings,
  Sun,
  Bell,
  Shield,
  Database,
  Zap,
  Save,
  ChevronRight,
  ToggleRight,
} from "lucide-react";

const SettingsPage: React.FC = () => {
  const { theme, notifications } = useSelector(
    (state: RootState) => state.settings,
  );
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data & Storage", icon: Database },
    { id: "advanced", label: "Advanced", icon: Zap },
  ];

  const handleTestNotification = () => {
    dispatch(addNotification());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Customize your dashboard experience
          </p>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center">
          <Save className="w-5 h-5 mr-2" />
          Save All Changes
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === "general" && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Sun className="w-8 h-8 mr-3 text-amber-500" />
                  Appearance
                </h3>
                <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Theme Mode
                      </label>
                      <p className="text-gray-600 dark:text-gray-400">
                        Automatically switch between light and dark mode based
                        on your system preference.
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(toggleTheme())}
                      className={`relative w-14 h-7 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner ${theme === "dark" ? "bg-gray-700" : "bg-gray-200 dark:bg-gray-700"}`}
                    >
                      <motion.div
                        layout
                        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          theme === "dark" ? "translate-x-7" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Language
                  </h4>
                  <select className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>English</option>
                    <option>Urdu</option>
                  </select>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Time Zone
                  </h4>
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                    <span className="font-medium">PKT (UTC+5)</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Notifications ({notifications})
                </h3>
                <button
                  onClick={handleTestNotification}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center space-x-2"
                >
                  <Bell className="w-4 h-4" />
                  <span>Test Notification</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Email Notifications",
                    description: "Receive important updates via email",
                    icon: "📧",
                  },
                  {
                    title: "Push Notifications",
                    description: "Get real-time updates on your device",
                    icon: "🔔",
                  },
                  {
                    title: "SMS Alerts",
                    description: "Critical alerts sent to your phone",
                    icon: "📱",
                  },
                  {
                    title: "In-app Notifications",
                    description: "Stay updated within the dashboard",
                    icon: "💬",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="p-6 bg-white dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <ToggleRight className="w-8 h-8 text-indigo-500 cursor-pointer group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Security Settings
              </h3>
              <div className="p-8 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-3xl border-2 border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-2xl">
                    <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      2-Factor Authentication
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <button className="ml-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Data & Storage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                      Storage Used
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      2.4 MB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    of 10 MB used
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                  <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Data Export
                  </h4>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors">
                    Download All Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
