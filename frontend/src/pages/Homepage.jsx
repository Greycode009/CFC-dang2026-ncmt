import Hero from "../components/Homepage/Hero";
import EverythingYouNeed from "../components/Homepage/EverythingYouNeed";
import HowItWorks from "../components/Homepage/HowItWorks";
import Testimonials from "../components/Homepage/Testimonials";
import FAQ from "../components/Homepage/FAQ";
import CTA from "../components/Homepage/CTA";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <>
      <div className="min-h-screen">
        <Hero />
        <EverythingYouNeed />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
