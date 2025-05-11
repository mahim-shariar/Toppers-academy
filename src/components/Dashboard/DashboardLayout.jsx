// src/components/Dashboard/DashboardLayout.jsx
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Trophy,
  Settings,
  Bookmark,
  UserCog,
  Lock,
  Menu,
  X,
} from "lucide-react";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-blue-800 text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-blue-700">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Toppers Academy</h1>
          ) : (
            <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
          )}
          <button onClick={toggleSidebar} className="text-white">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-6">
          <div className="px-4">
            <p
              className={`text-xs uppercase text-blue-400 mb-4 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Main
            </p>
            <Link
              to="/dashboard"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              <LayoutDashboard className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </Link>
          </div>

          <div className="px-4 mt-6">
            <p
              className={`text-xs uppercase text-blue-400 mb-4 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Management
            </p>
            <Link
              to="/dashboard/courses"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              <BookOpen className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Courses</span>}
            </Link>
            <Link
              to="/dashboard/teachers"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              <UserCog className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Teachers</span>}
            </Link>
            <Link
              to="/dashboard/students"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              <Users className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Students</span>}
            </Link>
            <Link
              to="/dashboard/success-stories"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              <Trophy className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Success Stories</span>}
            </Link>
            <Link
              to="/dashboard/categories"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              <Bookmark className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Categories</span>}
            </Link>
          </div>

          <div className="px-4 mt-6">
            <p
              className={`text-xs uppercase text-blue-400 mb-4 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Settings
            </p>
            <Link
              to="/dashboard/settings"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Settings</span>}
            </Link>
            <Link
              to="/dashboard/change-password"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors mb-2"
            >
              <Lock className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Change Password</span>}
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
