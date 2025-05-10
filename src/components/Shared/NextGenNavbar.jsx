import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Book,
  Home,
  User,
  Phone,
  LogIn,
  ChevronDown,
} from "lucide-react";

const NextGenNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Courses submenu items
  const coursesItems = [
    { name: "HSC Program", icon: <Book size={16} /> },
    { name: "Medical Admission", icon: <Book size={16} /> },
    { name: "University Prep", icon: <Book size={16} /> },
    { name: "Skill Development", icon: <Book size={16} /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navRef]);

  // Animation variants
  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const submenuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.4,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.2,
      },
    },
  };

  return (
    <motion.nav
      ref={navRef}
      className={`fixed w-full z-50 ${
        scrolled
          ? "bg-blue-900/95 backdrop-blur-md"
          : "bg-blue-900/80 backdrop-blur-sm"
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-blue-900 font-bold">
                E
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                EduMaster
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItem href="/" icon={<Home size={18} />} text="Home" />

            <div
              className="relative"
              onMouseEnter={() => setActiveSubmenu("courses")}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <button className="flex items-center px-4 py-2 text-white hover:text-yellow-300 transition-colors">
                <span>Courses</span>
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${
                    activeSubmenu === "courses" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeSubmenu === "courses" && (
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={submenuVariants}
                    className="absolute left-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="py-1">
                      {coursesItems.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <span className="mr-2 text-blue-500">
                            {item.icon}
                          </span>
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavItem href="/about" icon={<User size={18} />} text="About" />
            <NavItem
              href="/contact"
              icon={<Phone size={18} />}
              text="Contact"
            />

            <div className="ml-4">
              <motion.a
                href="/login"
                className="flex items-center px-4 py-2 bg-yellow-400 text-blue-900 rounded-full font-medium hover:bg-yellow-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn size={16} className="mr-2" />
                Login
              </motion.a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed inset-0 top-16 bg-blue-900/95 backdrop-blur-lg overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-4">
              <MobileNavItem
                href="/"
                icon={<Home size={18} />}
                text="Home"
                onClick={() => setIsOpen(false)}
              />

              <div className="border-t border-blue-800 my-2"></div>

              <div>
                <button
                  className="flex items-center w-full px-4 py-3 text-white hover:text-yellow-300 transition-colors"
                  onClick={() =>
                    setActiveSubmenu(
                      activeSubmenu === "courses" ? null : "courses"
                    )
                  }
                >
                  <span>Courses</span>
                  <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform ${
                      activeSubmenu === "courses" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeSubmenu === "courses" && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={submenuVariants}
                      className="pl-6 overflow-hidden"
                    >
                      {coursesItems.map((item, index) => (
                        <MobileNavItem
                          key={index}
                          href="#"
                          icon={item.icon}
                          text={item.name}
                          onClick={() => setIsOpen(false)}
                          className="pl-4"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-blue-800 my-2"></div>

              <MobileNavItem
                href="/about"
                icon={<User size={18} />}
                text="About"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavItem
                href="/contact"
                icon={<Phone size={18} />}
                text="Contact"
                onClick={() => setIsOpen(false)}
              />

              <div className="mt-6">
                <motion.a
                  href="/login"
                  className="flex items-center justify-center px-6 py-3 bg-yellow-400 text-blue-900 rounded-full font-medium hover:bg-yellow-300 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Reusable NavItem component for desktop
const NavItem = ({ href, icon, text }) => {
  return (
    <motion.a
      href={href}
      className="flex items-center px-4 py-2 text-white hover:text-yellow-300 transition-colors"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </motion.a>
  );
};

// Reusable MobileNavItem component
const MobileNavItem = ({ href, icon, text, onClick, className = "" }) => {
  return (
    <motion.a
      href={href}
      className={`flex items-center px-4 py-3 text-white hover:text-yellow-300 transition-colors ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <span className="mr-3">{icon}</span>
      {text}
    </motion.a>
  );
};

export default NextGenNavbar;
