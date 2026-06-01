import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Calendar } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', scale: 1.2 },
        { 
          clipPath: 'circle(150% at 50% 50%)', 
          scale: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          delay: 0.2
        }
      );

      // Title animation - word by word
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            stagger: 0.15,
            ease: 'back.out(1.7)',
            delay: 0.5
          }
        );
      }

      // Content fade in
      const fadeItems = contentRef.current?.querySelectorAll('.fade-item');
      if (fadeItems && fadeItems.length > 0) {
        gsap.fromTo(
          fadeItems,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.1,
            ease: 'power2.out',
            delay: 1
          }
        );
      }

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <img
          src="/images/hero-clinic.jpg"
          alt="Modern Dental Clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding w-full py-20">
        <div className="max-w-2xl" ref={contentRef}>
          {/* Badge */}
          <div className="fade-item inline-flex items-center gap-2 bg-[#c9d9ff]/50 text-[var(--dental-dark)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[var(--dental-blue)] rounded-full animate-pulse" />
            First NABH Accredited Dental Clinic in Nandyal
          </div>

          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--dental-dark)] leading-tight mb-6"
          >
            <span className="word inline-block">Your</span>{' '}
            <span className="word inline-block">Smile,</span>
            <br />
            <span className="word inline-block text-[var(--dental-blue)]">Our</span>{' '}
            <span className="word inline-block text-[var(--dental-blue)]">Passion</span>
          </h1>

          {/* Description */}
          <p className="fade-item text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
            Experience world-class dental care at Dr. Sudhakar's Dental World, the first NABH accredited 
            dental clinic in Nandyal. Serving beautiful smiles since 2010 with advanced technology.
          </p>

          {/* CTA Buttons */}
          <div className="fade-item flex flex-wrap gap-4">
            <a
              href="https://wa.me/919550022877"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-lg animate-pulse-glow"
            >
              <Calendar size={20} />
              Book Appointment
              <ArrowRight size={18} />
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 border-2 border-[var(--dental-blue)] text-[var(--dental-blue)] rounded-md font-medium transition-all duration-300 hover:bg-[var(--dental-blue)] hover:text-white flex items-center gap-2"
            >
              Our Services
            </a>
          </div>

          {/* Stats */}
          <div className="fade-item flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
            <div>
              <div className="text-3xl font-bold text-[var(--dental-blue)]">Since 2010</div>
              <div className="text-sm text-gray-500">Established</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--dental-blue)]">27.9K</div>
              <div className="text-sm text-gray-500">Insta Followers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--dental-blue)]">1,519</div>
              <div className="text-sm text-gray-500">Posts Shared</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default Hero;
