import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations for contact cards & map
      const animateLeft = sectionRef.current?.querySelector('.contact-animate-left');
      const animateRight = sectionRef.current?.querySelector('.contact-animate-right');
      
      if (animateLeft) {
        gsap.fromTo(
          animateLeft,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (animateRight) {
        gsap.fromTo(
          animateRight,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="py-20 lg:py-28 bg-gray-50 overflow-hidden relative"
    >
      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#c9d9ff]/50 text-[var(--dental-blue)] px-4 py-2 rounded-full text-sm font-semibold mb-3">
            <span className="w-2 h-2 bg-[var(--dental-blue)] rounded-full animate-pulse" />
            Get In Touch
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--dental-dark)]">
            Our Location & Contact Details
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Visit Dr. Sudhakar's Dental World or connect with us directly. We are open all 7 days of the week to serve you.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Contact Cards */}
          <div className="contact-animate-left lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: Address */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#0063dd]/10 text-[var(--dental-blue)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--dental-blue)] group-hover:text-white transition-colors duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[var(--dental-dark)] text-base mb-1">Our Address</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  Dr. Sudhakar's Dental World, Nandyal, Andhra Pradesh, India.
                </p>
                <a 
                  href="https://maps.app.goo.gl/1gtzy13NEG8YMbUt7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[var(--dental-blue)] font-bold hover:underline"
                >
                  Get Directions on Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Card 2: Phone */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#0063dd]/10 text-[var(--dental-blue)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--dental-blue)] group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--dental-dark)] text-base mb-1">Helpline Phone</h4>
                <div className="flex flex-col gap-1.5 mt-1">
                  <a 
                    href="tel:+919550022877"
                    className="text-gray-700 text-sm hover:text-[var(--dental-blue)] font-medium transition-colors"
                  >
                    +91 95500 22877
                  </a>
                  <a 
                    href="tel:+919603714415"
                    className="text-gray-700 text-sm hover:text-[var(--dental-blue)] font-medium transition-colors"
                  >
                    +91 96037 14415
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Hours */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#0063dd]/10 text-[var(--dental-blue)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--dental-blue)] group-hover:text-white transition-colors duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[var(--dental-dark)] text-base mb-1">Clinic Timings</h4>
                <p className="text-gray-700 text-sm font-medium mt-1">
                  Monday to Sunday: 10:00 AM - 8:00 PM
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Open all days of the week</p>
              </div>
            </div>
          </div>

          {/* Right Column: Larger Map Embed */}
          <div className="contact-animate-right lg:col-span-7 flex">
            <div className="w-full bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-md p-4 flex flex-col justify-between">
              <div className="w-full h-[300px] sm:h-[400px] lg:h-full rounded-2xl overflow-hidden relative border border-gray-100">
                <iframe
                  title="Dr. Sudhakar's Dental World Google Maps Location"
                  src="https://maps.google.com/maps?q=Dr.%20Sudhakar's%20Dental%20World,%20Nandyal,%20Andhra%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                
                {/* Visual Directions CTA button */}
                <a
                  href="https://maps.app.goo.gl/1gtzy13NEG8YMbUt7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-[var(--dental-blue)] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl hover:bg-[var(--dental-dark)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
                >
                  View Large Map / Get Directions
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
