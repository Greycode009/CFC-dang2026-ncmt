import Hero from "../components/Homepage/Hero";
import Testimonials from "../components/Homepage/Testimonials";
import FAQ from "../components/Homepage/FAQ";
import CTA from "../components/Homepage/CTA";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <>
      <div className="min-h-screen">
        <Hero />
        <Testimonials />
        <FAQ />
        <CTA />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
