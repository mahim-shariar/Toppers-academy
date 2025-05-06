import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Mail,
  Facebook,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";

export const CallToActionSection = () => {
  const phoneNumber = "+8801XXXXXXXXX";
  const whatsappNumber = "+8801XXXXXXXXX";
  const email = "info@toppersacademy.edu";
  const address = "123 Academic Road, Dhaka 1207, Bangladesh";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61561199604139";
  const [showFullFacebook, setShowFullFacebook] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative py-16 bg-blue-50/50" id="contact">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-yellow-400 to-blue-900 opacity-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-yellow-400 to-blue-900 opacity-10" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            Get in Touch With Toppers Academy
          </h2>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto">
            We're here to help with any questions about admissions, programs, or
            your learning journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left column - Contact methods */}
          <div className="space-y-6">
            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100/50"
            >
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">
                  Contact Our Support Team
                </h3>

                {/* Call button */}
                <div className="mb-6">
                  <motion.a
                    href={`tel:${phoneNumber}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md text-base md:text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: {phoneNumber}
                  </motion.a>
                  <div className="flex items-center justify-center text-blue-800 mt-2 text-sm md:text-base">
                    <Clock className="w-4 h-4 mr-1.5 text-yellow-500" />
                    Available: 9AM – 9PM, 7 Days a Week
                  </div>
                </div>

                {/* WhatsApp option */}
                <div className="mb-6">
                  <p className="text-blue-700 mb-2 flex items-center text-sm md:text-base">
                    <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                    Prefer messaging? Chat on WhatsApp:
                  </p>
                  <motion.a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center w-full py-2.5 px-5 bg-green-500 text-white font-medium rounded-lg text-sm md:text-base"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start WhatsApp Chat
                  </motion.a>
                </div>

                {/* Email */}
                <div>
                  <p className="text-blue-700 mb-1 flex items-center text-sm md:text-base">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    Email us at:
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-900 font-medium hover:underline text-sm md:text-base"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Facebook card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100/50"
            >
              <div className="p-5 md:p-6">
                <div className="flex items-center mb-3">
                  <Facebook className="w-7 h-7 text-blue-600 mr-2" />
                  <h3 className="text-lg md:text-xl font-bold text-blue-900">
                    Our Facebook Page
                  </h3>
                </div>

                <div className="border rounded-lg overflow-hidden mb-4 bg-gray-50">
                  <AnimatePresence mode="wait">
                    {!showFullFacebook ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4"
                      >
                        <div className="flex items-center mb-3">
                          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
                            <Facebook className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-sm md:text-base">
                              Toppers Academy
                            </p>
                            <p className="text-xs text-gray-500">
                              Education Center
                            </p>
                          </div>
                        </div>
                        <div className="h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                          {isMobile
                            ? "Tap to view our Facebook"
                            : "Click to view our Facebook"}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="full-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-[400px] md:h-[500px]"
                      >
                        <iframe
                          src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                            facebookUrl
                          )}&tabs=timeline&width=${
                            isMobile ? 340 : 500
                          }&height=${
                            isMobile ? 400 : 500
                          }&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                          width="100%"
                          height="100%"
                          style={{ border: "none", overflow: "hidden" }}
                          scrolling="no"
                          frameBorder="0"
                          allowFullScreen={true}
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          loading="lazy"
                          className="w-full h-full"
                        ></iframe>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!showFullFacebook ? (
                  <motion.button
                    onClick={() => setShowFullFacebook(true)}
                    whileHover={{ backgroundColor: "#1E3A8A", color: "white" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-blue-100 text-blue-800 rounded-lg font-medium flex items-center justify-center text-sm md:text-base"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                    {isMobile
                      ? "Open Facebook Preview"
                      : "View Full Facebook Page"}
                  </motion.button>
                ) : (
                  <motion.a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ backgroundColor: "#4267B2", color: "white" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center text-sm md:text-base"
                  >
                    <Facebook className="w-3.5 h-3.5 mr-2" />
                    {isMobile ? "Open in Facebook App" : "Visit on Facebook"}
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right column - Address card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100/50"
          >
            <div className="h-full flex flex-col">
              <div className="p-6 md:p-8 flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-4">
                  Visit Our Campus
                </h3>

                <div className="flex items-start mb-4">
                  <MapPin className="w-5 h-5 mt-0.5 mr-2 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-blue-900 font-medium text-sm md:text-base mb-1">
                      Toppers Academy Main Campus
                    </p>
                    <p className="text-blue-800 text-sm md:text-base">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-100 mb-4">
                  <h4 className="font-bold text-blue-900 text-sm md:text-base mb-1.5 flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-yellow-500" />
                    Office Hours
                  </h4>
                  <ul className="text-blue-800 space-y-1 text-sm md:text-base">
                    <li>Monday-Friday: 8:00 AM - 8:00 PM</li>
                    <li>Saturday-Sunday: 9:00 AM - 6:00 PM</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-100">
                  <h4 className="font-bold text-blue-900 text-sm md:text-base mb-1.5">
                    Admission Hours
                  </h4>
                  <p className="text-blue-800 text-sm md:text-base">
                    For admission inquiries, please visit between 10:00 AM -
                    5:00 PM any weekday.
                  </p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="h-48 md:h-56 bg-gradient-to-r from-blue-900 to-blue-700 relative">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <MapPin className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=23.8103,90.4125&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C23.8103,90.4125&key=YOUR_API_KEY')] bg-cover bg-center opacity-30" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
