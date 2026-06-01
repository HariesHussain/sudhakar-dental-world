import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Target, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Eye,
    title: 'Vision',
    description: 'Leading dental healthcare provider with high ethics & work quality.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Target,
    title: 'Mission',
    description: 'Providing optimum oral health through the best of dental care.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Cpu,
    title: 'Technology',
    description: 'Advanced machinery to provide our patients with best solutions.',
    color: 'from-indigo-500 to-indigo-600',
  },
];

const VisionMission = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards 3D unfold animation
      gsap.fromTo(
        cardsRef.current,
        { rotateX: 15, opacity: 0, y: 50 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Individual card stagger
      const cardElements = cardsRef.current?.querySelectorAll('.vision-card');
      if (cardElements) {
        gsap.fromTo(
          cardElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
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
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="section-padding">
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: '1000px' }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="vision-card group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <card.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[var(--dental-dark)] mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>

              {/* Decorative Corner */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
