import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Calendar, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content scale and fade animation
      gsap.fromTo(
        contentRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{ backgroundAttachment: 'fixed' }}
      >
        <img
          src="/images/cta-background.jpg"
          alt="Clinic Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002d6d]/90 to-[#0063dd]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-5 h-5" />
            First NABH Accredited Clinic in Nandyal
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            We Care For Every Patient
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Ready to transform your smile? Book your appointment today and experience 
            the best dental care.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919550022877"
              className="group flex items-center gap-3 bg-white text-[var(--dental-blue)] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[var(--dental-sky)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-normal text-gray-500">Call Today</div>
                <div>95500 22877</div>
              </div>
            </a>
            <a
              href="https://wa.me/919550022877"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[var(--dental-blue)] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[var(--dental-dark)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-white/30"
            >
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-normal text-white/70">Make An</div>
                <div>Book Appointment</div>
              </div>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">27.9K+</div>
              <div className="text-sm text-white/70">Insta Followers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Since 2010</div>
              <div className="text-sm text-white/70">Established</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">NABH</div>
              <div className="text-sm text-white/70">Accredited</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
