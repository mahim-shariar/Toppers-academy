import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Filter,
  X,
  BookOpen,
  Clipboard,
  Trophy,
  Monitor,
  School,
  Briefcase,
  GraduationCap,
  Code,
  Rocket,
  BarChart2,
  Target,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";

const CourseCard = ({
  title,
  description,
  icon,
  imageUrl,
  duration,
  students,
  level,
  category,
}) => {
  return (
    <motion.div
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-blue-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      }}
      layout
    >
      {/* Image Header */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/40 to-transparent" />

        {/* Course Badge */}
        <div className="absolute top-4 left-4 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
          <span className="mr-1">📚</span>
          {category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Course Title and Icon */}
        <div className="flex items-start mb-4">
          <div className="bg-yellow-400 p-3 rounded-lg text-blue-900 mr-4 shadow-md">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <div className="flex mt-1">
              <span className="bg-blue-700 text-blue-100 text-xs px-2 py-1 rounded mr-2">
                New
              </span>
              <span className="bg-blue-700/50 text-blue-100 text-xs px-2 py-1 rounded">
                Popular
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-blue-100 mb-6 line-clamp-2">{description}</p>

        {/* Details Button */}
        <motion.button
          whileHover={{
            x: 5,
            backgroundColor: "rgba(234, 179, 8, 1)",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-yellow-400/90 hover:bg-yellow-400 text-blue-900 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors mb-6"
        >
          View Course Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.button>

        {/* Course Metadata */}
        <div className="flex justify-between text-sm text-blue-200 border-t border-blue-700 pt-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {students}
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {level}
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10" />
    </motion.div>
  );
};

const CoursesPage = () => {
  const allCourses = [
    {
      id: 1,
      title: "HSC Advanced Mathematics",
      description:
        "Master calculus, algebra, and geometry with our comprehensive HSC prep course designed for top performers. Includes weekly problem solving sessions.",
      icon: <BookOpen size={20} />,
      imageUrl:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "12 Weeks",
      students: "24 Students",
      level: "Advanced",
      category: "Academic",
      programType: "HSC",
      deliveryMode: "Offline",
      price: 299,
    },
    {
      id: 2,
      title: "Medical Admission Test Prep",
      description:
        "Specialized training for MBBS admission tests with mock exams and personalized feedback sessions from medical professionals.",
      icon: <Clipboard size={20} />,
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "16 Weeks",
      students: "36 Students",
      level: "Intermediate",
      category: "Professional",
      programType: "Medical",
      deliveryMode: "Hybrid",
      price: 399,
    },
    {
      id: 3,
      title: "Physics Olympiad Training",
      description:
        "Advanced problem-solving techniques for national and international Physics Olympiads with former medalists as instructors.",
      icon: <Trophy size={20} />,
      imageUrl:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "24 Weeks",
      students: "18 Students",
      level: "Advanced",
      category: "Competitive",
      programType: "Olympiad",
      deliveryMode: "Online",
      price: 499,
    },
    {
      id: 4,
      title: "Computer Science Fundamentals",
      description:
        "Learn core CS concepts including algorithms, data structures, and computational thinking with hands-on projects.",
      icon: <Code size={20} />,
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "10 Weeks",
      students: "45 Students",
      level: "Beginner",
      category: "Academic",
      programType: "BSC",
      deliveryMode: "Online",
      price: 249,
    },
    {
      id: 5,
      title: "Engineering Entrance Crash Course",
      description:
        "Intensive preparation for IIT-JEE and other engineering entrance exams with expert faculty and test series.",
      icon: <Rocket size={20} />,
      imageUrl:
        "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "8 Weeks",
      students: "32 Students",
      level: "Advanced",
      category: "Competitive",
      programType: "Engineering",
      deliveryMode: "Offline",
      price: 349,
    },
    {
      id: 6,
      title: "Business Analytics Certification",
      description:
        "Master data analysis, visualization, and business intelligence tools for modern business decision making.",
      icon: <BarChart2 size={20} />,
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "14 Weeks",
      students: "28 Students",
      level: "Intermediate",
      category: "Professional",
      programType: "Job Preparation",
      deliveryMode: "Hybrid",
      price: 449,
    },
  ];

  const [courses, setCourses] = useState(allCourses);
  const [filters, setFilters] = useState({
    category: "",
    programType: "",
    deliveryMode: "",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter options
  const filterOptions = {
    category: ["Academic", "Professional", "Competitive"],
    programType: [
      "HSC",
      "SSC",
      "BSC",
      "Medical",
      "Engineering",
      "Job Preparation",
    ],
    deliveryMode: ["Online", "Offline", "Hybrid"],
  };

  useEffect(() => {
    let filtered = allCourses;

    // Apply all filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "price") {
          const [min, max] = value.split("-").map(Number);
          filtered = filtered.filter((course) => {
            if (max) return course.price >= min && course.price <= max;
            return course.price >= min;
          });
        } else {
          filtered = filtered.filter((course) => course[key] === value);
        }
      }
    });

    setCourses(filtered);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value === prev[filterType] ? "" : value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      level: "",
      category: "",
      programType: "",
      deliveryMode: "",
      price: "",
    });
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  // Filter select component
  const FilterSelect = ({ label, options, value, onChange, icon: Icon }) => (
    <div className="w-full sm:w-auto mb-3 sm:mb-0 sm:mr-3">
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-4 h-4 text-blue-300" />
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`bg-blue-800/50 border border-blue-700 text-blue-100 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full ${
            Icon ? "pl-10" : "pl-3"
          } appearance-none`}
        >
          <option value="">{label}</option>
          {options.map((option) =>
            typeof option === "object" ? (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ) : (
              <option key={option} value={option}>
                {option}
              </option>
            )
          )}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-950 to-blue-900">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-800 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-[length:100px_100px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Our Courses
          </motion.h1>
          <motion.p
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Find the perfect program to advance your academic and professional
            journey
          </motion.p>
          <motion.div
            className="max-w-2xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex justify-center gap-4">
              <div className="bg-blue-900/50 px-6 py-3 rounded-lg flex items-center">
                <Target className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white">100% Success Rate</span>
              </div>
              <div className="bg-blue-900/50 px-6 py-3 rounded-lg flex items-center">
                <Award className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-white">Expert Instructors</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="mb-8">
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Filter Courses</h3>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-800 rounded-lg text-white"
            >
              {mobileFiltersOpen ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </>
              )}
              {activeFilterCount > 0 && (
                <span className="bg-yellow-400 text-blue-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-blue-900/50 rounded-xl p-4 mb-6 overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-3">
                <FilterSelect
                  label="Category"
                  options={filterOptions.category}
                  value={filters.category}
                  onChange={(value) => handleFilterChange("category", value)}
                  icon={School}
                />
                <FilterSelect
                  label="Program"
                  options={filterOptions.programType}
                  value={filters.programType}
                  onChange={(value) => handleFilterChange("programType", value)}
                  icon={GraduationCap}
                />
                <FilterSelect
                  label="Delivery"
                  options={filterOptions.deliveryMode}
                  value={filters.deliveryMode}
                  onChange={(value) =>
                    handleFilterChange("deliveryMode", value)
                  }
                  icon={Monitor}
                />
              </div>
            </motion.div>
          )}

          {/* Desktop Filters - Horizontal */}
          <div className="hidden lg:flex flex-wrap items-center gap-3 bg-blue-900/50 rounded-xl p-4">
            <FilterSelect
              label="Category"
              options={filterOptions.category}
              value={filters.category}
              onChange={(value) => handleFilterChange("category", value)}
              icon={School}
            />
            <FilterSelect
              label="Program"
              options={filterOptions.programType}
              value={filters.programType}
              onChange={(value) => handleFilterChange("programType", value)}
              icon={GraduationCap}
            />
            <FilterSelect
              label="Delivery"
              options={filterOptions.deliveryMode}
              value={filters.deliveryMode}
              onChange={(value) => handleFilterChange("deliveryMode", value)}
              icon={Monitor}
            />

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center ml-2"
              >
                <X className="w-4 h-4 mr-1" />
                Clear all
              </button>
            )}
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mt-4"
            >
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;

                let displayValue = value;
                if (key === "price") {
                  const range = filterOptions.price.find(
                    (r) => r.value === value
                  );
                  displayValue = range ? range.label : value;
                }

                return (
                  <div
                    key={key}
                    className="bg-blue-800/50 text-blue-100 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {key}: {displayValue}
                    <button
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, [key]: "" }))
                      }
                      className="ml-2 text-blue-300 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-blue-200">
            Showing{" "}
            <span className="text-white font-medium">{courses.length}</span> of{" "}
            <span className="text-white font-medium">{allCourses.length}</span>{" "}
            courses
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="lg:hidden text-sm text-yellow-400 hover:text-yellow-300 flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            className="bg-blue-900/50 rounded-xl p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-blue-300 mb-4">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No courses found
            </h3>
            <p className="text-blue-200 mb-6">
              Try adjusting your filter criteria
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-yellow-400 text-blue-900 font-medium rounded-lg hover:bg-yellow-300"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
