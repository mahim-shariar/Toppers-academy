import { CallToActionSection } from "./components/CallToActionSection";
import CoursesSection from "./components/CoursesSection";
import { Footer } from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NextGenNavbar from "./components/NextGenNavbar";
import { StudentSuccess } from "./components/StudentSuccessSection";
import { TeachersSection } from "./components/TeacherSection";
import { WhyChooseUs } from "./components/WhyChooseUs";

function App() {
  return (
    <>
      <NextGenNavbar />
      <HeroSection />
      <WhyChooseUs />
      <CoursesSection />
      <TeachersSection />
      <StudentSuccess />
      <CallToActionSection />
      <Footer />
    </>
  );
}

export default App;
