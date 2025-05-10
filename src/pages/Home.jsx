import React from "react";
import HeroSection from "../components/Home/HeroSection";
import { WhyChooseUs } from "../components/Home/WhyChooseUs";
import CoursesSection from "../components/Home/CoursesSection";
import { TeachersSection } from "../components/Home/TeacherSection";
import { StudentSuccess } from "../components/Home/StudentSuccessSection";
import { CallToActionSection } from "../components/Home/CallToActionSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <WhyChooseUs />
      <CoursesSection />
      <TeachersSection />
      <StudentSuccess />
      <CallToActionSection />
    </div>
  );
};

export default Home;
