// src/pages/Dashboard/DashboardHome.jsx
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  Trophy,
} from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      title: "Total Courses",
      value: "24",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Students",
      value: "156",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Teachers",
      value: "12",
      icon: GraduationCap,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Success Stories",
      value: "48",
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          <div className="flex items-start pb-4 border-b border-gray-100">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">New course added</p>
              <p className="text-gray-500 text-sm">
                "Advanced Mathematics" was added to courses
              </p>
              <p className="text-gray-400 text-xs mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start pb-4 border-b border-gray-100">
            <div className="bg-green-100 text-green-600 p-2 rounded-full mr-4">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">New student registered</p>
              <p className="text-gray-500 text-sm">
                Rahim Khan joined Physics course
              </p>
              <p className="text-gray-400 text-xs mt-1">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full mr-4">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">New success story</p>
              <p className="text-gray-500 text-sm">
                Fatima got admitted to DU Medical College
              </p>
              <p className="text-gray-400 text-xs mt-1">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
