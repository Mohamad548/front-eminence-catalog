import React, { useState, useEffect, useRef } from 'react';
import {
  PrintIcon,
  PhoneIcon,
  CloseIcon,
  WhatsAppIcon,
  InstagramIcon,
  TelegramIcon,
} from './Icons';

interface FloatingActionsProps {
  onTogglePrintView: (state: boolean) => void;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({
  onTogglePrintView,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handlePrintClick = () => {
    onTogglePrintView(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const socialLinks = [
    {
      Icon: WhatsAppIcon,
      href: 'https://wa.me/989122434557?text=سلام،%20وقت%20بخیر',
      name: 'WhatsApp',
    },
    {
      Icon: InstagramIcon,
      href: 'https://instagram.com/kasra_eminence',
      name: 'Instagram',
    },
    {
      Icon: TelegramIcon,
      href: 'https://t.me/FARZADHAMIDI192',
      name: 'Telegram',
    },
  ];

  return (
    <div className="noprint">
      {/* Print Button */}
      <button
        onClick={handlePrintClick}
        aria-label="چاپ لیست محصولات"
        className="fixed bottom-6 left-6 z-30 w-14 h-14 bg-brand-slate/50 backdrop-blur-md border border-brand-blue-sky/20 text-brand-blue-sky rounded-full flex items-center justify-center shadow-lg hover:bg-brand-slate/80 hover:text-white hover:shadow-glow-cyan transition-all"
      >
        <PrintIcon className="w-7 h-7" />
      </button>

      {/* Contact Button & Menu */}
      <div
        ref={menuRef}
        className="fixed bottom-4 right-6 z-30 flex flex-col items-center"
      >
        {/* Social Icons that appear when menu is open */}
        <div
          className={`flex flex-col items-center space-y-3 transition-all duration-300 ease-in-out mb-3 ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-slate/50 backdrop-blur-md border border-brand-blue-sky/20 text-brand-blue-sky shadow-md transition-all duration-200 hover:bg-brand-slate/80 hover:text-white hover:shadow-glow-cyan"
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
              }}
            >
              <social.Icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Main toggle button */}
        <button
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو تماس'}
          className="w-14 h-14 border  backdrop-blur-md text-brand-blue-sky border-brand-blue-sky/20  bg-brand-slate/50  rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
        >
          <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
            <span
              className={`absolute transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? 'opacity-0 rotate-45 scale-50'
                  : 'opacity-100 rotate-0 scale-100'
              }`}
            >
              <PhoneIcon className="w-4 h-4 " />
            </span>
            <span
              className={`absolute transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? 'opacity-100 rotate-0 scale-100'
                  : 'opacity-0 -rotate-45 scale-50'
              }`}
            >
              <CloseIcon className="w-7 h-7" />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FloatingActions;
