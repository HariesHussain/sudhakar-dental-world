import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Wrench, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Sparkles,
    title: 'Advanced Dentistry',
    description: 'We perform advanced smile makeovers, whole mouth implants, dental crowns, laser dentistry, and more with the necessary knowledge and equipment. Our own equipment guarantees perfect accuracy in both diagnosis and treatment.',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAHEFLWYJYs65CAZ7ckOILbzPZxTd1yCKYzSNg3V_GSLbbv5sJT_SxtBoySNVHx0XdfDSEv5skhDGX3uZW5G2iJCgkZIc7ZBlzX5PDszq4tLNsMSiMEwPypuU0UpZmsIVPEF03Y=s680-w680-h510-rw',
  },
  {
    icon: Wrench,
    title: 'Superior Equipment',
    description: 'To stay up with international advancements in dental technology, we use the highest quality supplies and machinery imported from leading manufacturers worldwide.',
    image: '/images/why-equipment.jpg',
  },
  {
    icon: Shield,
    title: 'Sterilisation & Protection',
    description: 'For your safety, we uphold the highest standards of cleanliness and follow strict sterilisation procedures. As the first NABH accredited clinic in Nandyal, all of our protocols are checked and verified.',
    image: '/images/why-sterilization.jpg',
  },
];

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      const animateItems = sectionRef.current?.querySelectorAll('.animate-item');
      if (animateItems && animateItems.length > 0) {
        gsap.fromTo(
          animateItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
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

  // Image transition animation
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  return (
    <section id="why-us" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="animate-item inline-block text-[var(--dental-blue)] font-medium text-sm uppercase tracking-wider mb-3">
            Why Choose Us
          </span>
          <h2 className="animate-item text-3xl lg:text-4xl font-bold text-[var(--dental-dark)]">
            Why Dr. Sudhakar's Dental World?
          </h2>
          <p className="animate-item text-gray-600 mt-4 max-w-2xl mx-auto">
            Dr. Sudhakar, who is one of the best dentists with years of experience in several areas of dentistry, 
            has been leading the clinic's quality care since 2010.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Display - Hidden on Mobile */}
          <div className="hidden lg:block animate-item relative h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <div ref={imageRef} className="absolute inset-0">
              <img
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            {/* Image Caption */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 text-white">
                {(() => {
                  const IconComponent = features[activeIndex].icon;
                  return <IconComponent className="w-8 h-8" />;
                })()}
                <span className="text-xl font-bold">{features[activeIndex].title}</span>
              </div>
            </div>
          </div>

          {/* Feature List */}
          <div className="order-1 lg:order-2 space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-500 ${
                  activeIndex === index
                    ? 'bg-[var(--dental-blue)] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-[#c9d9ff]/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    activeIndex === index ? 'bg-white/20' : 'bg-[#0063dd]/10'
                  }`}>
                    <feature.icon className={`w-6 h-6 ${activeIndex === index ? 'text-white' : 'text-[var(--dental-blue)]'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className={`text-sm leading-relaxed ${activeIndex === index ? 'text-white/90' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
                {/* Mobile Inline Image */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 rounded-xl ${
                  activeIndex === index ? 'max-h-[250px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                }`}>
                  <img src={feature.image} alt={feature.title} className="w-full h-[250px] object-cover" />
                </div>
                {/* Active Indicator */}
                <div className={`h-1 mt-4 rounded-full transition-all duration-500 ${
                  activeIndex === index ? 'bg-white/30 w-full' : 'bg-transparent w-0'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
