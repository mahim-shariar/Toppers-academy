import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Book,
  Users,
  Award,
  ClipboardCheck,
  Star,
} from "lucide-react";

const HeroSection = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const animationRef = useRef(null);

  const courses = [
    {
      title: "HSC Intensive Program",
      description:
        "Comprehensive preparation with our expert faculty and proven teaching methodology",
      icon: <Book className="w-8 h-8" />,
      stats: "98% Success Rate | 15+ Years Experience",
      batch: "New Batch Starting June 2024",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Medical Admission Coaching",
      description:
        "Specialized training with past examiners and customized study plans",
      icon: <ClipboardCheck className="w-8 h-8" />,
      stats: "87% First Attempt Success | 500+ Selections",
      batch: "Limited Seats Available",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % courses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [courses.length]);

  // Create abstract animated shapes
  useEffect(() => {
    const container = animationRef.current;
    if (!container) return;

    const shapes = ["circle", "square", "triangle"];
    const colors = [
      "rgba(234, 179, 8, 0.1)",
      "rgba(58, 155, 148, 0.1)",
      "rgba(122, 86, 40, 0.1)",
    ];

    for (let i = 0; i < 15; i++) {
      const shape = document.createElement("div");
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 30 + 20;

      shape.style.position = "absolute";
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.opacity = "0.15";
      shape.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      if (shapeType === "circle") {
        shape.style.borderRadius = "50%";
      } else if (shapeType === "triangle") {
        shape.style.width = "0";
        shape.style.height = "0";
        shape.style.background = "transparent";
        shape.style.borderLeft = `${size / 2}px solid transparent`;
        shape.style.borderRight = `${size / 2}px solid transparent`;
        shape.style.borderBottom = `${size}px solid ${
          colors[Math.floor(Math.random() * colors.length)]
        }`;
      }

      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;

      shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      container.appendChild(shape);
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900 flex items-center justify-center">
      {/* Animated Background Elements */}
      <div
        ref={animationRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Subtle grid pattern */}
      <motion.div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMCAzMEg2ME0zMCAwVjYwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"
        animate={{
          x: [0, -30, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Main Content Container - Centered */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center relative z-10">
        {/* Left Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 text-center lg:text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2 text-sm font-bold text-white shadow-lg items-center mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mr-2"
            >
              🎓
            </motion.span>
            Trusted Since 2005
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            <span className="block">Proven Coaching</span>
            <motion.span
              className="text-yellow-300"
              animate={{
                textShadow: [
                  "0 0 0px rgba(234, 179, 8, 0)",
                  "0 0 10px rgba(234, 179, 8, 0.5)",
                  "0 0 0px rgba(234, 179, 8, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              For Academic Success
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-blue-100 mb-8 max-w-lg mx-auto lg:mx-0"
          >
            Face-to-face instruction from Bangladesh's most experienced
            educators in our modern classroom facilities.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(234, 179, 8, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 md:px-8 md:py-4 font-bold text-blue-900 shadow-lg flex items-center gap-2"
            >
              Visit Our Center
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-white/10 backdrop-blur-md px-6 py-3 md:px-8 md:py-4 font-bold text-white shadow-lg border border-white/20"
            >
              Meet Our Teachers
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Card Carousel - Centered */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative h-[500px] w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeInOut" },
                }}
                exit={{ opacity: 0, x: -100 }}
                className="absolute inset-0 px-4"
              >
                <CourseCard
                  course={courses[currentCardIndex]}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentCardIndex((prev) =>
                  prev === 0 ? courses.length - 1 : prev - 1
                )
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-blue-700/90 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg"
            >
              <ChevronLeft className="text-white w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setCurrentCardIndex((prev) =>
                  prev === courses.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-blue-700/90 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg"
            >
              <ChevronRight className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  );
};

const CourseCard = ({ course, isActive }) => {
  return (
    <motion.div
      className={`relative h-full rounded-2xl overflow-hidden ${
        isActive
          ? "shadow-xl border-2 border-yellow-400/50"
          : "shadow-md border border-white/20"
      }`}
      animate={{
        scale: isActive ? 1 : 0.95,
        transition: { duration: 0.5 },
      }}
    >
      {/* Image Background with Overlay */}
      <div className="absolute inset-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/80 to-blue-900/90" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col p-6">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 mb-4 shadow-lg mx-auto lg:mx-0"
          animate={{
            rotate: isActive ? [0, 5, -5, 0] : 0,
            y: isActive ? [0, -5, 0] : 0,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {course.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2 text-center lg:text-left">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-blue-100 mb-4 text-center lg:text-left">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center text-yellow-300 text-sm font-medium mb-4 justify-center lg:justify-start">
          <Users className="w-4 h-4 mr-2" />
          {course.stats}
        </div>

        {/* Batch Info */}
        <div className="mt-auto bg-blue-700/50 rounded-lg p-3 mb-4 backdrop-blur-sm text-center lg:text-left">
          <p className="text-yellow-300 text-sm font-medium">{course.batch}</p>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-lg bg-yellow-400 text-blue-900 font-bold shadow-md flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors"
        >
          Enquire Now
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Active State Glow */}
      {isActive && (
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1 }}
        />
      )}
    </motion.div>
  );
};

export default HeroSection;
