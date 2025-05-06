import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "+8801XXXXXXXXX";
  const whatsappNumber = "+8801XXXXXXXXX";
  const email = "info@toppersacademy.edu";

  return (
    <footer className="relative bg-gradient-to-b from-blue-900 to-blue-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-800/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-yellow-400">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mt-0.5 mr-3 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MessageCircle className="w-5 h-5 mt-0.5 mr-3 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Chat with us
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mt-0.5 mr-3 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-yellow-400">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com/toppersacademy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://youtube.com/toppersacademy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://instagram.com/toppersacademy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-yellow-400">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-3">
                <li>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    All Courses
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    About Us
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Teachers
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Results
                  </motion.a>
                </li>
              </ul>
              <ul className="space-y-3">
                <li>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Admissions
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    FAQs
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Privacy Policy
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    whileHover={{ x: 3 }}
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Terms
                  </motion.a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-blue-800 text-center text-blue-300"
        >
          <p className="mb-2">
            &copy; {currentYear} Toppers Academy. All rights reserved.
          </p>
          <motion.a
            href="https://trilance.tech"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center text-sm  transition-colors"
          >
            Made with ❤️ by{" "}
            <span className="underline ml-1 text-yellow-300 hover:text-yellow-400">
              Trilance
            </span>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};
