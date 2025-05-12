// src/components/Dashboard/DashboardLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
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
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-gradient-to-b from-blue-800 to-blue-900 text-white transition-all duration-300 ease-in-out 
        ${sidebarOpen ? "w-64" : "w-20"} 
        ${isMobile ? "fixed inset-y-0 left-0 z-30 transform" : "relative"} 
        ${isMobile && !sidebarOpen ? "-translate-x-full" : ""}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-blue-700">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold text-white">Toppers Academy</h1>
          ) : (
            <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
          )}
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-blue-700 p-1 rounded-md transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <nav className="mt-6 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="px-4">
            <p
              className={`text-xs uppercase text-blue-300 mb-4 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Main
            </p>
            <Link
              to="/dashboard"
              className={`flex items-center p-3 rounded-lg transition-all mb-2 ${
                location.pathname === "/dashboard"
                  ? "bg-blue-700 shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </Link>
          </div>

          <div className="px-4 mt-6">
            <p
              className={`text-xs uppercase text-blue-300 mb-4 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Management
            </p>
            <Link
              to="/dashboard/courses"
              className={`flex items-center p-3 rounded-lg transition-all mb-2 ${
                location.pathname === "/dashboard/courses"
                  ? "bg-blue-700 shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Courses</span>}
            </Link>
            <Link
              to="/dashboard/teachers"
              className={`flex items-center p-3 rounded-lg transition-all mb-2 ${
                location.pathname === "/dashboard/teachers"
                  ? "bg-blue-700 shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              <UserCog className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Teachers</span>}
            </Link>
            <Link
              to="/dashboard/students"
              className={`flex items-center p-3 rounded-lg transition-all mb-2 ${
                location.pathname === "/dashboard/students"
                  ? "bg-blue-700 shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              <Users className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Students</span>}
            </Link>
            <Link
              to="/dashboard/success-stories"
              className={`flex items-center p-3 rounded-lg transition-all mb-2 ${
                location.pathname === "/dashboard/success-stories"
                  ? "bg-blue-700 shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              <Trophy className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Success Stories</span>}
            </Link>
          </div>

          <div className="px-4 mt-6">
            <p
              className={`text-xs uppercase text-blue-300 mb-4 ${
                !sidebarOpen && "hidden"
              }`}
            >
              Settings
            </p>
            <Link
              to="/dashboard/settings"
              className={`flex items-center p-3 rounded-lg transition-all mb-2 ${
                location.pathname === "/dashboard/settings"
                  ? "bg-blue-700 shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Settings</span>}
            </Link>
            <Link
              to="/dashboard/change-password"
              className={`flex items-center p-3 rounded-lg transition-all mb-2 ${
                location.pathname === "/dashboard/change-password"
                  ? "bg-blue-700 shadow-md"
                  : "hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              <Lock className="w-5 h-5" />
              {sidebarOpen && <span className="ml-3">Change Password</span>}
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative">
        {/* Mobile Header */}
        {isMobile && (
          <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-700 hover:text-blue-600 p-1 rounded-md transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              Toppers Academy
            </h1>
            <div className="w-6"></div> {/* For balance */}
          </div>
        )}

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
