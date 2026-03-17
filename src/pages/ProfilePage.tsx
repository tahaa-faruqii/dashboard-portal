import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { updateProfile } from "../feature/setting/SettingSlice";
import { motion } from "framer-motion";
import { Camera, Edit3, Save, X } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { profile } = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: "",
    company: "",
    location: "Karachi, Pakistan",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfile({
        name: formData.name,
        email: formData.email,
      }),
    );
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and profile information
          </p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
              <button
                onClick={() => {
                  setFormData({
                    name: profile.name,
                    email: profile.email,
                    phone: "",
                    company: "",
                    location: "Karachi, Pakistan",
                  });
                  setIsEditing(false);
                }}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-700">
              <span className="text-4xl font-bold text-white">JD</span>
            </div>
            <button className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-4 border-white dark:border-gray-800">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 space-y-4">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 text-3xl font-bold bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                  placeholder="Your name"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 text-lg font-semibold bg-transparent border-none focus:outline-none text-indigo-600 dark:text-indigo-400"
                  placeholder="your@email.com"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {profile.name}
                </h2>
                <p className="text-xl text-indigo-600 dark:text-indigo-400">
                  {profile.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Account Information
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                <span className="text-2xl">📱</span>
                <span className="text-lg">
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                    />
                  ) : (
                    "+92 300 1234567"
                  )}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Company
              </label>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                <span className="text-2xl">🏢</span>
                <span className="text-lg">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                    />
                  ) : (
                    "Freelance Developer"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Location & Preferences
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/30 dark:to-cyan-900/30 rounded-2xl">
                <span className="text-2xl">📍</span>
                <span className="text-lg font-semibold">
                  {formData.location}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Notifications
                </span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
