import { ArrowUp, Facebook, Youtube, Instagram, Phone, Clock, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Doctor', href: '#doctor' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[var(--dental-dark)] text-white border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold tracking-tight">
              Dr. <span className="text-[var(--dental-sky)]">Sudhakar's</span><br />
              Dental World
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Dr. Sudhakar's Dental World — Nandyal's first NABH accredited dental clinic. Serving beautiful smiles with advanced technology since 2010.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-white/10 w-24">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--dental-sky)] text-sm transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[var(--dental-sky)]" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info & Helplines */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-white/10 w-32">
              Contact Info
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[var(--dental-sky)] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Helpline Numbers</span>
                  <a href="tel:+919550022877" className="text-white hover:text-[var(--dental-sky)] text-sm transition-colors font-semibold">
                    +91 95500 22877
                  </a>
                  <a href="tel:+919603714415" className="text-white hover:text-[var(--dental-sky)] text-sm transition-colors font-semibold">
                    +91 96037 14415
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--dental-sky)] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Clinic Timings</span>
                  <span className="text-gray-400 text-sm">
                    Mon - Sun: 10:00 AM - 8:00 PM
                  </span>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                    Open All 7 Days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Location & Social */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-white/10 w-28">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--dental-sky)] flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  Opp. Municipal Office,<br />
                  Nandyal, Andhra Pradesh
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 mt-2">
                <a
                  href="https://www.facebook.com/DentalWorld.Nandyal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:scale-105 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCMh5ScuV55SrIZ7EJJMxqjg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF0000] hover:scale-105 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/dr_sudhakars_dental_world/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#FCAF45] hover:via-[#FD1D1D] hover:to-[#833AB4] hover:scale-105 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 w-full my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Dr. Sudhakar's Dental World. All Rights Reserved. Designed to modern healthcare standards.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[var(--dental-blue)] flex items-center justify-center hover:bg-[var(--dental-light)] transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
