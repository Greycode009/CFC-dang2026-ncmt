import Hero from "../../components/home/Hero";
import Testimonials from "../../components/home/Testimonials";
import FAQ from "../../components/home/FAQ";
import CTA from "../../components/home/CTA";
import Footer from "../../components/common/Footer";

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
