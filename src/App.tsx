import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TopBar from './components/layout/TopBar';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import VisionMission from './components/sections/VisionMission';
import AboutClinic from './components/sections/AboutClinic';
import Services from './components/sections/Services';
import WhyChooseUs from './components/sections/WhyChooseUs';
import CTA from './components/sections/CTA';
import MeetDoctor from './components/sections/MeetDoctor';
import FAQ from './components/sections/FAQ';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize scroll animations
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after all content loads
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <VisionMission />
        <AboutClinic />
        <Services />
        <WhyChooseUs />
        <CTA />
        <MeetDoctor />
        <Testimonials />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
