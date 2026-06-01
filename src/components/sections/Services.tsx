import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Dental Fillings',
    description: 'Restore damaged teeth with high-quality, tooth-colored fillings that look natural and last long.',
    image: '/images/service-fillings.jpg',
  },
  {
    title: 'Root Canal Treatment',
    description: 'Pain-free root canal therapy using advanced techniques to save your natural teeth.',
    image: '/images/service-rootcanal.jpg',
  },
  {
    title: 'Teeth Extraction',
    description: 'Safe and comfortable tooth extraction procedures with minimal discomfort.',
    image: '/images/service-extraction.jpg',
  },
  {
    title: 'Braces & Aligners',
    description: 'Straighten your smile with modern orthodontic solutions including invisible aligners.',
    image: '/images/service-braces.jpg',
  },
  {
    title: 'Dental Implants',
    description: 'Permanent tooth replacement solutions that look, feel, and function like natural teeth.',
    image: '/images/service-implants.jpg',
  },
  {
    title: 'Dentures',
    description: 'Custom-fitted complete and partial dentures for a confident smile.',
    image: '/images/service-dentures.jpg',
  },
  {
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments for a brighter, more radiant smile.',
    image: '/images/service-whitening.jpg',
  },
  {
    title: 'Bridges & Crown',
    description: 'Restore damaged teeth and fill gaps with custom crowns and bridges.',
    image: '/images/service-bridges.jpg',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerItems = headerRef.current?.querySelectorAll('.header-item');
      if (headerItems && headerItems.length > 0) {
        gsap.fromTo(
          headerItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Service cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="section-padding">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="header-item inline-block text-[var(--dental-blue)] font-medium text-sm uppercase tracking-wider mb-3">
              Our Best Dental Services
            </span>
            <h2 className="header-item text-3xl lg:text-4xl font-bold text-[var(--dental-dark)]">
              What We Offer for You
            </h2>
          </div>
          <a
            href="https://wa.me/919550022877"
            target="_blank"
            rel="noopener noreferrer"
            className="header-item mt-4 md:mt-0 inline-flex items-center gap-2 text-[var(--dental-blue)] font-medium hover:gap-4 transition-all duration-300"
          >
            View All Services
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-[var(--dental-dark)] mb-2 group-hover:text-[var(--dental-blue)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <a
                  href="https://wa.me/919550022877"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--dental-blue)] hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-[var(--dental-blue)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
