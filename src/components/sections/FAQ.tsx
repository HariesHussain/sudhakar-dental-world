import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How long do dental implants last?',
    answer: 'Dental implants are designed to be a permanent solution and can last a lifetime with proper care. They have a longer life than any other tooth replacement option, with success rates of over 95% even after 10 years.',
  },
  {
    question: 'Is it safe to get dental treatments?',
    answer: 'Yes, dental treatments at our clinic are completely safe. We follow strict sterilization protocols and use international standard equipment. Our clinic is certified and all procedures are performed by experienced professionals.',
  },
  {
    question: 'How to choose the best dentist?',
    answer: "Look for qualifications, experience, safety accreditations, and patient trust. Dr. Sudhakar has been serving Nandyal since 2010. His clinic, Dr. Sudhakar's Dental World, is the first NABH accredited dental clinic in Nandyal, maintaining premium patient safety standards and backed by a trusted community of over 27.9K followers.",
  },
  {
    question: 'What services do you offer?',
    answer: 'We offer a comprehensive range of dental services including dental fillings, root canal treatment, teeth extraction, braces and aligners, dental implants, dentures, teeth whitening, and bridges and crowns.',
  },
  {
    question: 'What are the costs of common dental procedures?',
    answer: 'The cost varies depending on the procedure and complexity. We offer affordable pricing and transparent quotes before any treatment. Contact us for a free consultation to get an accurate estimate for your specific needs.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const faqItems = sectionRef.current?.querySelectorAll('.faq-animate');
      if (faqItems && faqItems.length > 0) {
        gsap.fromTo(
          faqItems,
          { y: 30, opacity: 0 },
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="faq-animate inline-block text-[var(--dental-blue)] font-medium text-sm uppercase tracking-wider mb-3">
              FAQ
            </span>
            <h2 className="faq-animate text-3xl lg:text-4xl font-bold text-[var(--dental-dark)]">
              Frequently Asked Questions
            </h2>
            <p className="faq-animate text-gray-600 mt-4">
              Find answers to common questions about our dental services
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-animate border border-gray-200 rounded-xl overflow-hidden hover:border-[#0063dd]/30 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[var(--dental-blue)] flex-shrink-0" />
                    <span className="font-medium text-gray-800">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.34, 1.56, 0.64, 1] // Spring physics
                      }}
                    >
                      <div className="px-5 pb-5 pl-13">
                        <p className="text-gray-600 leading-relaxed pl-8">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="faq-animate mt-10 text-center p-6 bg-[#c9d9ff]/20 rounded-xl">
            <p className="text-gray-700 mb-4">
              Still have questions? We're here to help!
            </p>
            <a
              href="https://wa.me/919550022877"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--dental-blue)] font-medium hover:underline"
            >
              Contact Us
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
