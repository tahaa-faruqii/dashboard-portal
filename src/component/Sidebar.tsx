import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RootState } from "../app/store";
import { toggleSidebar } from "../feature/setting/SettingSlice";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Reports", icon: FileText, path: "/reports" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar: React.FC = () => {
  const { isSidebarCollapsed } = useSelector(
    (state: RootState) => state.settings,
  );

  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div
      className={`bg-gradient-to-b from-indigo-600 to-purple-700 h-screen p-4 flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex items-center justify-between mb-12">
        {!isSidebarCollapsed && (
          <div className="text-white font-bold text-xl flex items-center">
            <LayoutDashboard className="w-6 h-6 mr-2" />
            Dashboard
          </div>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-3 rounded-xl mb-3 transition-all duration-200 hover:bg-white/20 group ${
                isActive ? "bg-white/30 backdrop-blur-sm shadow-lg" : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              {!isSidebarCollapsed && (
                <span className="font-medium text-white transition-all duration-200">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
