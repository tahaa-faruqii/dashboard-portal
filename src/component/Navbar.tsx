import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { RootState } from "../app/store";
import { toggleTheme } from "../feature/setting/SettingSlice";

const Navbar: React.FC = () => {
  const { theme, notifications } = useSelector(
    (state: RootState) => state.settings,
  );
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-gray-800 h-16 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-semibold">JD</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
