import TopBar from "./components/TopBar";
import HeroBackground from "./components/HeroBackground";
import QuizFlow from "./components/QuizFlow";
import ThreeStep from "./components/ThreeStep";
import LenderStrip from "./components/LenderStrip";
import CaseStudies from "./components/CaseStudies";
import Mechanism from "./components/Mechanism";
import FAQ from "./components/FAQ";
import StickyCTA from "./components/StickyCTA";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="flex-1">
      <TopBar />

      {/* Hero — full-width navy with centred quiz card */}
      <section id="quiz" className="relative">
        <HeroBackground />
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-16 md:pb-24">
          <QuizFlow />
        </div>
      </section>

      <LenderStrip />
      <ThreeStep />
      <Mechanism />
      <CaseStudies />
      <FAQ />
      <Footer />
      <StickyCTA />
    </main>
  );
}
