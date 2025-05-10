import { motion } from "framer-motion";
import {
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Calendar,
  Award,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();

  const course = {
    id: courseId,
    title: "HSC Advanced Mathematics",
    description:
      "Master calculus, algebra, and geometry with our comprehensive HSC prep course.",
    longDescription: `
      This intensive course covers all aspects of the HSC Advanced Mathematics syllabus with a focus on 
      problem-solving techniques and exam strategies. Our program includes:
      
      • Weekly live classes with expert instructors
      • Comprehensive study materials
      • Practice exams with detailed feedback
      • One-on-one tutoring sessions
      • Access to our online learning platform
    `,
    imageUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "12 Weeks",
    students: "24 Students",
    level: "Advanced",
    category: "Academic",
    price: "$299",
    startDate: "January 15, 2024",
    schedule: "Mon & Wed, 6:00 PM - 8:00 PM",
    instructor: {
      name: "Dr. Sarah Johnson",
      bio: "PhD in Mathematics with 10+ years experience",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    syllabus: [
      "Week 1-3: Calculus Fundamentals",
      "Week 4-6: Advanced Algebra",
      "Week 7-9: Geometry and Trigonometry",
      "Week 10-12: Exam Preparation",
    ],
    requirements: [
      "Completion of Year 11 Mathematics",
      "Scientific calculator",
      "6-8 hours of study per week",
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-blue-950 to-blue-900 min-h-screen pt-20"
    >
      {/* Back Button */}

      {/* Course Hero Section */}
      <div className="relative pb-10 ">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/40 to-transparent z-10 " />
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
        />
        <div className="container  px-4 sm:px-6 relative z-20 -mt-16 sm:-mt-20 md:-mt-24 ">
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-4xl ">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="bg-yellow-400 p-3 sm:p-4 rounded-lg text-blue-900 shadow-md self-start flex-shrink-0">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-700 text-blue-100 text-xs px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="bg-blue-700/50 text-blue-100 text-xs px-2.5 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {course.title}
                </h1>
                <p className="text-blue-100 sm:text-lg">{course.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-blue-200 text-sm sm:text-base">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {course.students}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {course.level}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Course */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                <BookOpen className="mr-2 text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
                About This Course
              </h2>
              <div className="text-blue-100 whitespace-pre-line leading-relaxed">
                {course.longDescription}
              </div>
            </motion.div>

            {/* Syllabus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                <Calendar className="mr-2 text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
                Course Syllabus
              </h2>
              <ul className="space-y-3 text-blue-100">
                {course.syllabus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                <Award className="mr-2 text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
                Requirements
              </h2>
              <ul className="space-y-3 text-blue-100">
                {course.requirements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Course Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Course Details
              </h2>

              <div className="space-y-5 text-blue-100">
                <div>
                  <h3 className="font-semibold text-yellow-400 text-sm sm:text-base">
                    Start Date
                  </h3>
                  <p className="text-sm sm:text-base">{course.startDate}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-yellow-400 text-sm sm:text-base">
                    Schedule
                  </h3>
                  <p className="text-sm sm:text-base">{course.schedule}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-yellow-400 text-sm sm:text-base">
                    Price
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {course.price}
                  </p>
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-4 rounded-lg transition-colors mt-2 text-sm sm:text-base">
                  Enroll Now
                </button>
              </div>
            </motion.div>

            {/* Instructor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-xl p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Instructor
              </h2>
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-yellow-400"
                />
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    {course.instructor.name}
                  </h3>
                  <p className="text-blue-200 text-xs sm:text-sm">
                    {course.instructor.bio}
                  </p>
                </div>
              </div>
              <button className="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 font-medium py-2 px-4 rounded-lg transition-colors text-sm sm:text-base">
                View Profile
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl -z-10" />
      <div className="fixed -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10" />
    </motion.div>
  );
};

export default CourseDetails;
