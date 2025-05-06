import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, TrendingUp } from "lucide-react";

const CourseCard = ({
  title,
  description,
  icon,
  imageUrl,
  duration,
  students,
  level,
}) => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-blue-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      }}
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
          Academic
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

const CoursesSection = () => {
  const courses = [
    {
      title: "HSC Advanced Mathematics",
      description:
        "Master calculus, algebra, and geometry with our comprehensive HSC prep course designed for top performers. Includes weekly problem solving sessions.",
      icon: <BookIcon />,
      imageUrl:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "12 Weeks",
      students: "24 Students",
      level: "Advanced",
    },
    {
      title: "Medical Admission Test Prep",
      description:
        "Specialized training for MBBS admission tests with mock exams and personalized feedback sessions from medical professionals.",
      icon: <ExamIcon />,
      imageUrl:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "16 Weeks",
      students: "36 Students",
      level: "Intermediate",
    },
    {
      title: "Physics Olympiad Training",
      description:
        "Advanced problem-solving techniques for national and international Physics Olympiads with former medalists as instructors.",
      icon: <TrophyIcon />,
      imageUrl:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      duration: "24 Weeks",
      students: "18 Students",
      level: "Advanced",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-blue-950 to-blue-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Comprehensive programs designed to help you excel in academic and
            professional pursuits
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CourseCard {...course} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button className="px-8 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 rounded-lg font-medium hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300">
            View All Courses
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Icon Components
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const ExamIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v4M7 7l-1.5 6M17 7l1.5 6" />
    <path d="M8.5 13L10 22l4-9 4 9 1.5-9" />
    <path d="M6 4h12" />
  </svg>
);

export default CoursesSection;
