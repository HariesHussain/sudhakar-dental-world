import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Why Choose Us', href: '#why-us' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
            : 'bg-transparent py-4 mt-10'
        }`}
      >
        <div className="section-padding">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="flex items-center gap-2.5 flex-shrink-0"
            >
              <img 
                src="/images/logo.jpg" 
                alt="Dr. Sudhakar's Dental World Logo" 
                className="h-[40px] sm:h-[45px] lg:h-[50px] w-auto object-contain rounded-full flex-shrink-0"
              />
              <div className={`text-sm sm:text-base lg:text-lg xl:text-xl font-bold font-['Poppins'] transition-colors duration-300 ${
                isScrolled ? 'text-[var(--dental-blue)]' : 'text-[var(--dental-blue)]'
              }`}>
                Dr. Sudhakar's <span className="text-[var(--dental-dark)] block sm:inline">Dental World</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`text-xs xl:text-sm font-semibold transition-colors duration-300 hover:text-[var(--dental-blue)] relative group whitespace-nowrap ${
                    isScrolled ? 'text-gray-700' : 'text-gray-800'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--dental-blue)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block flex-shrink-0">
              <a
                href="https://wa.me/919550022877"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-1.5 animate-pulse-glow text-xs xl:text-sm py-2 px-3 xl:px-4"
              >
                <Phone size={16} />
                Book Appointment
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--dental-blue)] flex-shrink-0"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 lg:hidden"
          >
            <div className="section-padding flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-lg font-medium text-gray-800 py-2 border-b border-gray-100 hover:text-[var(--dental-blue)] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href="https://wa.me/919550022877"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 mt-4"
              >
                <Phone size={18} />
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
