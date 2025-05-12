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
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // or next/router if using Next.js

const LoginForm = () => {
  const navigate = useNavigate();
  const animationRef = useRef(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("login"); // 'login' or 'register'

  // Abstract animated shapes (same as hero section)
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

      const duration = Math.random() * 20 + 20;
      const delay = Math.random() * 5;

      shape.style.transition = `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s infinite`;
      shape.style.willChange = "transform, opacity";
      container.appendChild(shape);

      const animateShape = () => {
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 40;
        const rotate = (Math.random() - 0.5) * 20;

        shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;

        setTimeout(() => {
          shape.style.transform = `translate(${-x}px, ${-y}px) rotate(${-rotate}deg)`;
          setTimeout(animateShape, duration * 1000);
        }, (duration * 1000) / 2);
      };

      animateShape();
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate after successful login
      // navigate('/dashboard');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-950 to-blue-900 flex items-center justify-center">
      {/* Animated Background Elements */}
      <div
        ref={animationRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMCAzMEg2ME0zMCAwVjYwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"
        animate={{
          x: [0, -15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Back Button */}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </motion.button>

      {/* Login Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: view === "login" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: view === "login" ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Form Header */}
            <div className="p-8 pb-0">
              <motion.div
                className="w-16 h-16 rounded-xl bg-yellow-400 flex items-center justify-center text-blue-900 mb-6 shadow-lg mx-auto"
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Award className="w-8 h-8" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-blue-200 text-center mb-6">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-8 pt-4">
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-100 mb-2"
                >
                  Email Address
                </label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.01 }}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-blue-100 mb-2"
                >
                  Password
                </label>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileFocus={{ scale: 1.01 }}
                >
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={view === "register" ? 8 : 6}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                    placeholder={
                      view === "register" ? "At least 8 characters" : "••••••••"
                    }
                  />
                </motion.div>
              </div>

              {/* Remember Me & Forgot Password (Login only) */}
              {view === "login" && (
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className="h-4 w-4 rounded bg-white/10 border-white/20 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-blue-900"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-blue-200"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-yellow-300 hover:text-yellow-200 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.03 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className={`w-full py-3 rounded-lg font-bold shadow-md flex items-center justify-center gap-2 transition-colors ${
                  isLoading
                    ? "bg-yellow-400/80 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-300"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </AnimatePresence>

        {/* Glow effect */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-xl -z-10"
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
};

export default LoginForm;
