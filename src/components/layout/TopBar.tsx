import { Phone, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-[var(--dental-dark)] text-white py-2">
      <div className="section-padding">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a 
              href="https://www.facebook.com/DentalWorld.Nandyal/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--dental-sky)] transition-colors duration-300"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://www.youtube.com/channel/UCMh5ScuV55SrIZ7EJJMxqjg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--dental-sky)] transition-colors duration-300"
            >
              <Youtube size={18} />
            </a>
            <a 
              href="https://www.instagram.com/dr_sudhakars_dental_world/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--dental-sky)] transition-colors duration-300"
            >
              <Instagram size={18} />
            </a>
          </div>

          {/* Emergency Helpline */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[var(--dental-sky)] hidden sm:inline">Helpline:</span>
              <a 
                href="tel:+919550022877" 
                className="flex items-center gap-1 hover:text-[var(--dental-sky)] transition-colors duration-300 font-medium"
              >
                <Phone size={16} />
                <span>95500 22877</span>
              </a>
              <span className="text-white/40">|</span>
              <a 
                href="tel:+919603714415" 
                className="flex items-center gap-1 hover:text-[var(--dental-sky)] transition-colors duration-300 font-medium"
              >
                <span>96037 14415</span>
              </a>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[var(--dental-sky)]">
              <MapPin size={16} />
              <span>Nandyal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
