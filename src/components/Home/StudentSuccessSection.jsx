import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Award,
  BookOpen,
  GraduationCap,
  ChevronRight,
} from "lucide-react";

const SuccessStudentCard = ({ image, name, batch, achievement, quote }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col h-full group"
    >
      {/* Floating 3D badge */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="absolute -top-5 -right-5 bg-yellow-400 text-blue-900 p-3 rounded-xl shadow-lg z-20 group-hover:rotate-12 transition-transform duration-300"
      >
        <Award className="w-8 h-8" strokeWidth={1.5} />
      </motion.div>

      {/* Student image */}
      <motion.div
        className="relative h-64 overflow-hidden flex-shrink-0"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
      </motion.div>

      {/* Student info */}
      <div className="p-6 relative z-10 flex flex-col flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center mb-4"
        >
          <div className="bg-yellow-400 p-2 rounded-lg mr-4 text-blue-900">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900">{name}</h4>
            <p className="text-sm text-blue-600">{batch}</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-700 mb-4 italic relative pl-6 flex-grow"
        >
          <span className="absolute left-0 text-3xl text-blue-200 -top-2">
            "
          </span>
          {quote}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between pt-4 border-t border-blue-50"
        >
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium text-blue-900">
              {achievement}
            </span>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center text-sm font-medium text-blue-600"
          >
            Full story <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Hover effect - subtle yellow overlay */}
      <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10" />
    </motion.div>
  );
};

export function StudentSuccess() {
  const students = [
    {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60",
      name: "Rahim Ahmed",
      batch: "SSC Batch 2023",
      achievement: "GPA 5 Achiever",
      quote:
        "Toppers Academy's methods helped me understand concepts I struggled with for years!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=60",
      name: "Tasnim Khan",
      batch: "HSC Batch 2022",
      achievement: "Medical College Admission",
      quote:
        "The admission test preparation was exactly what I needed to succeed.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60",
      name: "Ayesha Siddiqua",
      batch: "University Admission 2023",
      achievement: "DU Engineering",
      quote:
        "I couldn't have cracked the admission test without their guidance.",
    },
  ];

  const stats = [
    { value: "98%", label: "SSC GPA 5 Achievers" },
    { value: "92%", label: "HSC GPA 5 Achievers" },
    { value: "85%", label: "University Admissions" },
    { value: "10K+", label: "Students Mentored" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-40 h-40 bg-blue-700/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Our Success Stories
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6" />
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Real students, exceptional results - see how Toppers Academy helped
            them achieve their dreams
          </p>
        </motion.div>

        {/* Student cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex"
            >
              <SuccessStudentCard {...student} />
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 bg-blue-700 rounded-2xl p-8 text-white relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-300/10 rounded-full blur-xl" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl" />

          <div className="grid md:grid-cols-4 gap-6 relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="text-4xl font-bold text-yellow-300 mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
