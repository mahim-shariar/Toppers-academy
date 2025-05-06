import { motion } from "framer-motion";
import {
  BookText,
  GraduationCap,
  BrainCircuit,
  Video,
  MessageCircle,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: <BookText className="w-6 h-6" />,
    title: "100% NCTB-Aligned",
    description:
      "Precision-crafted curriculum matching Bangladesh's national education standards",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Elite Educators",
    description:
      "Faculty from DU, BUET, and top institutions with 10+ years experience",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: "Smart Learning",
    description:
      "AI-powered quizzes adapt to your progress with instant feedback",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Always Available",
    description: "Recorded lectures accessible 24/7 with playback controls",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Instant Support",
    description: "Live chat with teachers for real-time doubt resolution",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Proven Excellence",
    description: "15,000+ students achieving GPA 5 and university admissions",
    color: "bg-yellow-100 text-yellow-600",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Updated header with brand colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            The Toppers Academy Difference
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6" />
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            Why thousands of Bangladeshi students trust us for academic success
          </p>
        </motion.div>

        {/* Feature cards with brand colors */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 h-full transition-all duration-300 group-hover:shadow-xl">
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${
                    feature.color.split(" ")[0]
                  }`}
                />

                <div className="p-8">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">{feature.description}</p>

                  <div
                    className={`mt-6 h-0.5 w-0 ${
                      feature.color.split(" ")[0]
                    } transition-all duration-500 group-hover:w-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats ribbon with brand colors */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-blue-700 rounded-2xl p-8 text-white shadow-lg"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { value: "98%", label: "SSC GPA 5" },
              { value: "15K+", label: "Successful Students" },
              { value: "500+", label: "Hours of Content" },
              { value: "24/7", label: "Doubt Support" },
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-4xl font-bold text-yellow-300 mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
