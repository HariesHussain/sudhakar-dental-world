import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, DollarSign, HeartPulse, ShieldCheck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Award, label: 'Top-Notch Expertise' },
  { icon: DollarSign, label: 'Affordable' },
  { icon: HeartPulse, label: 'Painless' },
  { icon: ShieldCheck, label: '100% Safe' },
];

const AboutClinic = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image diagonal wipe reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content slide in
      const contentItems = contentRef.current?.querySelectorAll('.content-item');
      if (contentItems && contentItems.length > 0) {
        gsap.fromTo(
          contentItems,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div 
            ref={imageRef}
            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
            style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
          >
            <img 
              src="/images/about-clinic.png" 
              alt="Dr. Sudhakar's Dental World Clinic Building" 
              className="w-full h-full object-cover"
            />
            
            {/* Experience Badge */}
            <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg z-10">
              <div className="text-3xl font-bold text-[var(--dental-blue)]">Since 2010</div>
              <div className="text-sm text-gray-600">Established</div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="content-item inline-block text-[var(--dental-blue)] font-medium text-sm uppercase tracking-wider mb-3">
              About Clinic
            </span>
            <h2 className="content-item text-3xl lg:text-4xl font-bold text-[var(--dental-dark)] mb-6">
              Dr. Sudhakar's Dental World
            </h2>
            <p className="content-item text-gray-600 leading-relaxed mb-6">
              Dr. Sudhakar's Dental World has been a trusted leader in oral healthcare in Nandyal since 2010. 
              As the first NABH accredited dental clinic in Nandyal, we are recognized for our high ethical standards, 
              rigorous clinical safety protocols, and dedication to delivering painless, premium dental treatments.
            </p>
            <p className="content-item text-gray-600 leading-relaxed mb-8">
              Under the expert guidance of Dr. Sudhakar, our state-of-the-art clinic uses advanced technology and 
              world-class sterilisation procedures to ensure your treatment is safe, precise, and extremely comfortable.
            </p>

            {/* Highlights */}
            <div className="content-item grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl hover:bg-[#c9d9ff]/20 transition-colors duration-300"
                >
                  <item.icon className="w-8 h-8 text-[var(--dental-blue)] mb-2" />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="content-item inline-flex items-center gap-2 text-[var(--dental-blue)] font-medium hover:gap-4 transition-all duration-300"
            >
              Learn More About Us
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClinic;
