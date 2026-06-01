import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, BookOpen, Stethoscope, Sparkles, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  { icon: Award, text: 'First NABH Accredited Clinic in Nandyal' },
  { icon: BookOpen, text: 'Serving Nandyal Since 2010' },
  { icon: Sparkles, text: '27.9K+ Instagram Community' },
  { icon: Stethoscope, text: '1,519 Educational & Case Posts' },
];

const stats = [
  { value: 16, suffix: '+', label: 'Years Experience' },
  { value: 27900, suffix: '+', label: 'Insta Followers' },
];

const Counter = ({ end, suffix, duration = 2 }: { end: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={counterRef} className="text-4xl lg:text-5xl font-bold text-[var(--dental-blue)]">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const MeetDoctor = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circle mask expand animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(30% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // Content animations
      const contentItems = sectionRef.current?.querySelectorAll('.content-animate');
      if (contentItems && contentItems.length > 0) {
        gsap.fromTo(
          contentItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
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
    <section id="doctor" ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="content-animate inline-block text-[var(--dental-blue)] font-medium text-sm uppercase tracking-wider mb-3">
            Meet Doctor
          </span>
          <h2 className="content-animate text-3xl lg:text-4xl font-bold text-[var(--dental-dark)]">
            Dr. Sudhakar
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Placeholder */}
          <div 
            ref={imageRef}
            className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-[#f0f4f8] border-2 border-dashed border-[var(--dental-blue)]/30 flex flex-col items-center justify-center p-6 gap-3 text-center"
            style={{ clipPath: 'circle(30% at 50% 50%)' }}
          >
            <div className="text-4xl">👨‍⚕️</div>
            <div className="text-[var(--dental-blue)] text-sm font-bold tracking-wider uppercase max-w-[250px]">
              Dr. Sudhakar's Photo Coming Soon
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="content-animate text-gray-600 leading-relaxed mb-6">
              Dr. Sudhakar is an expert dentist with a rich history of serving Nandyal since 2010. 
              Known for his exceptional clinical skills and empathetic patient care, Dr. Sudhakar has built a highly 
              credible reputation, backed by a community of over 27.9K Instagram followers who follow his journey of delivering beautiful smiles.
            </p>
            <p className="content-animate text-gray-600 leading-relaxed mb-8">
              Under his expert leadership, Dr. Sudhakar's Dental World became the first NABH accredited dental clinic in Nandyal, 
              reflecting his unwavering commitment to safety, quality, and clinical excellence.
            </p>

            {/* Certifications */}
            <div className="content-animate grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <cert.icon className="w-5 h-5 text-[var(--dental-blue)] flex-shrink-0" />
                  <span className="text-sm text-gray-700">{cert.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="content-animate flex gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <Counter end={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/919550022877"
              target="_blank"
              rel="noopener noreferrer"
              className="content-animate inline-flex items-center gap-2 btn-primary"
            >
              <CheckCircle className="w-5 h-5" />
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetDoctor;
