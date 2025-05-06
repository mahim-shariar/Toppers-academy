import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronDown } from "lucide-react";

const teachers = [
  {
    id: 1,
    name: "Dr. Ayesha Rahman",
    subject: "Physics",
    qualification: "PhD in Physics, BUET",
    experience: "12 years teaching experience",
    bio: "Specialized in modern physics and quantum mechanics. Has trained 5 national Olympiad winners.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Md. Farhan Hossain",
    subject: "Mathematics",
    qualification: "MSc in Applied Mathematics, DU",
    experience: "8 years teaching experience",
    bio: "Expert in calculus and algebra. Developed unique problem-solving techniques for competitive exams.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    subject: "Chemistry",
    qualification: "MSc in Chemistry, RU",
    experience: "10 years teaching experience",
    bio: "Specializes in organic chemistry and chemical bonding. Makes complex concepts easy to understand.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Rahim Ahmed",
    subject: "Biology",
    qualification: "MBBS, Dhaka Medical College",
    experience: "7 years teaching experience",
    bio: "Medical doctor who teaches biology with clinical correlations. Focuses on conceptual understanding.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    name: "Tasnim Khan",
    subject: "English",
    qualification: "MA in English Literature, DU",
    experience: "9 years teaching experience",
    bio: "Expert in English language and literature. Helps students develop critical thinking and writing skills.",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    id: 6,
    name: "Imran Mahmud",
    subject: "ICT",
    qualification: "BSc in CSE, BUET",
    experience: "6 years teaching experience",
    bio: "Software engineer who teaches programming fundamentals and problem-solving techniques.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 7,
    name: "Sabrina Akter",
    subject: "Higher Mathematics",
    qualification: "MSc in Mathematics, CU",
    experience: "11 years teaching experience",
    bio: "Specializes in advanced mathematics for university entrance exams. Known for her engaging teaching style.",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    id: 8,
    name: "Kamal Uddin",
    subject: "Accounting",
    qualification: "CMA, FCA",
    experience: "15 years teaching experience",
    bio: "Chartered accountant with extensive experience teaching accounting principles and practical applications.",
    image: "https://randomuser.me/api/portraits/men/80.jpg",
  },
];

const TeacherCard = ({ teacher, onClick }) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg flex flex-col h-full border border-white/20"
    >
      <div className="relative h-48 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
        <motion.img
          src={teacher.image}
          alt={teacher.name}
          className="w-24 h-24 rounded-full border-4 border-yellow-300 object-cover"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-300" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-blue-900">{teacher.name}</h3>
          <p className="text-blue-700 font-medium">{teacher.subject}</p>
        </div>

        <div className="mb-4 space-y-2">
          <p className="text-sm text-blue-800 flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            {teacher.qualification}
          </p>
          <p className="text-sm text-blue-800 flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            {teacher.experience}
          </p>
        </div>

        <motion.button
          onClick={onClick}
          whileHover={{ backgroundColor: "#1E3A8A", color: "#FEF3C7" }}
          whileTap={{ scale: 0.95 }}
          className="mt-auto w-full py-2 px-4 bg-yellow-300 text-blue-900 font-medium rounded-lg flex items-center justify-center"
        >
          Meet the Teacher
          <ArrowRight className="w-4 h-4 ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const TeacherModal = ({ teacher, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-blue-900 text-yellow-300 hover:bg-blue-800 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gradient-to-b from-blue-900 to-blue-700 p-8 flex flex-col items-center justify-center">
            <motion.img
              src={teacher.image}
              alt={teacher.name}
              className="w-40 h-40 rounded-full border-4 border-yellow-300 object-cover mb-6 shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            />

            <motion.h2
              className="text-2xl font-bold text-white mb-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {teacher.name}
            </motion.h2>

            <motion.p
              className="text-xl text-yellow-300 font-medium mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {teacher.subject}
            </motion.p>

            <motion.div
              className="w-full bg-white/10 rounded-lg p-4 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mt-0.5 mr-2 text-yellow-300 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <p className="text-white">{teacher.qualification}</p>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mt-0.5 mr-2 text-yellow-300 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                <p className="text-white">{teacher.experience}</p>
              </div>
            </motion.div>
          </div>

          <div className="p-8">
            <motion.h3
              className="text-2xl font-bold text-blue-900 mb-6"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              About {teacher.name.split(" ")[0]}
            </motion.h3>

            <motion.p
              className="text-blue-800 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              {teacher.bio}
            </motion.p>

            <motion.div
              className="bg-blue-50 rounded-lg p-6 border border-blue-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Teaching Philosophy
              </h4>
              <p className="text-blue-800">
                "I believe in making complex concepts accessible through
                real-world examples and interactive learning. My goal is not
                just to teach the curriculum but to inspire a lifelong love for{" "}
                {teacher.subject}."
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const TeachersSection = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleTeachers = showAll ? teachers : teachers.slice(0, 6);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Unique Background with Diagonal Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 z-0">
        {/* Subtle diagonal stripes */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #1e3a8a 0, #1e3a8a 1px, transparent 1px, transparent 50px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-yellow-400 to-blue-900 opacity-20"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Meet Our <span className="text-yellow-500">Expert Teachers</span>
          </h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Learn from the best educators with proven track records of student
            success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence>
            {visibleTeachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <TeacherCard
                  teacher={teacher}
                  onClick={() => setSelectedTeacher(teacher)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && teachers.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{
                backgroundColor: "#1E3A8A",
                color: "#FEF3C7",
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-blue-900 font-medium rounded-lg shadow-md"
            >
              View All Teachers
              <ChevronDown className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedTeacher && (
          <TeacherModal
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
