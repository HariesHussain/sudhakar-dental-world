import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Pacsreddy Csreddy',
    rating: 5,
    text: 'My damaged tooth was saved with RCT and a crown. The procedure was painless and the crown looks just like my natural tooth. Highly satisfied with the quality treatment and low cost.',
    initials: 'PC'
  },
  {
    name: 'Hussian Bee Dudekula',
    rating: 5,
    text: 'The doctors explained everything clearly and used the latest equipment. The treatment was painless and the cost was very affordable. Now my smile looks completely natural.',
    initials: 'HD'
  },
  {
    name: 'Batthula Adisenkaraiah',
    rating: 5,
    text: 'The staff were friendly, and the clinic atmosphere was calm and peaceful. The doctor treated me like family and ensured I was comfortable throughout the procedure.',
    initials: 'BA'
  },
  {
    name: 'Khaja Kiran',
    rating: 5,
    text: 'My RCT was done without any pain. The modern machines and gentle approach made a huge difference. Quality treatment at a low cost. Highly recommended.',
    initials: 'KK'
  },
  {
    name: 'Neeli Savitri',
    rating: 5,
    text: 'Good treatment, reasonable price. Best clinic in Rayalaseema.',
    initials: 'NS'
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      const animateItems = sectionRef.current?.querySelectorAll('.testimonial-animate');
      if (animateItems && animateItems.length > 0) {
        gsap.fromTo(
          animateItems,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate reviews to create a seamless infinite loop
  const marqueeReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="py-20 lg:py-28 bg-white overflow-hidden relative"
    >
      {/* Decorative background shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9d9ff]/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="section-padding text-center mb-16 testimonial-animate">
          <span className="inline-flex items-center gap-2 bg-[#c9d9ff]/50 text-[var(--dental-blue)] px-4 py-2 rounded-full text-sm font-semibold mb-3">
            <span className="w-2 h-2 bg-[var(--dental-blue)] rounded-full animate-pulse" />
            Patient Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--dental-dark)]">
            What Our Patients Say
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Read real Google reviews from patients who experienced our professional, affordable, and painless dental care.
          </p>
        </div>

        {/* Infinite Scrolling Marquee Row - Moves Right to Left */}
        <div className="testimonial-animate w-full overflow-hidden relative py-4 mb-16 mask-gradient">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.333%); }
            }
            .animate-marquee-track {
              display: flex;
              gap: 1.5rem;
              width: max-content;
              animation: marquee 45s linear infinite;
            }
            .animate-marquee-track:hover {
              animation-play-state: paused;
            }
            .mask-gradient {
              mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
              -webkit-mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
            }
          `}</style>
          
          <div className="animate-marquee-track">
            {marqueeReviews.map((review, idx) => (
              <div 
                key={idx}
                className="w-[320px] sm:w-[380px] bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 flex flex-col justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-600 italic leading-relaxed mb-6 text-sm sm:text-base">
                    "{review.text}"
                  </p>
                </div>

                {/* Patient Profile */}
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--dental-blue)] to-[var(--dental-light)] text-white flex items-center justify-center text-sm font-bold shadow-md">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--dental-dark)] text-sm sm:text-base">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <span>Verified Google Review</span>
                      <span className="inline-block w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-[var(--dental-blue)] font-medium">5.0 Star</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Stats and View All Button */}
        <div className="section-padding testimonial-animate">
          <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto p-8 bg-gray-50/50 rounded-2xl border border-gray-100 shadow-sm">
            {/* Google Icon and Badge */}
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="font-bold text-[var(--dental-dark)] text-lg">Google Rating</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="text-2xl font-black text-[var(--dental-dark)]">4.9</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <p className="text-sm font-medium text-gray-500 mb-6">
              Rated 4.9/5 on Google &middot; 980+ Happy Patients
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://www.google.com/search?q=dr+sudhakar+dental+world&rlz=1C1CHBF_enIN1120IN1120&oq=d&gs_lcrp=EgZjaHJvbWUqBggCECMYJzIGCAAQRRg5MgYIARBFGDwyBggCECMYJzIGCAMQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODQxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3bb5ad56fdfb6b93:0xa43f91725143d034,1,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--dental-blue)] text-white font-bold rounded-xl shadow-md hover:bg-[var(--dental-dark)] hover:-translate-y-0.5 transition-all duration-300"
              >
                View All Reviews
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <a
                href="https://www.google.com/search?q=dr+sudhakar+dental+world&rlz=1C1CHBF_enIN1120IN1120&oq=d&gs_lcrp=EgZjaHJvbWUqBggCECMYJzIGCAAQRRg5MgYIARBFGDwyBggCECMYJzIGCAMQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzODQxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x3bb5ad56fdfb6b93:0xa43f91725143d034,3,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[var(--dental-dark)] border border-gray-200 font-bold rounded-xl shadow-sm hover:border-[var(--dental-blue)] hover:text-[var(--dental-blue)] hover:-translate-y-0.5 transition-all duration-300"
              >
                ★ Write a Review
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
