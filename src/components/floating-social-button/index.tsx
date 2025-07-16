'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaTelegramPlane,
  FaInstagram,
  FaWhatsapp,
  FaTimes,
  FaShareAlt,
} from 'react-icons/fa';

const FloatingSocialButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* وقتی مودال باز است، یک div کل صفحه را می‌پوشاند */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-500/40 bg-opacity-80 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed right-3 bottom-1 flex flex-col items-center gap-2 z-50">
        {/* آیکن‌های شبکه اجتماعی */}
        {isOpen && (
          <div className="flex flex-col items-center gap-2 mb-2 transition-all duration-300 z-50 relative">
            <Link
              href="/social/telegram"
              className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:scale-110 transition"
              aria-label="تلگرام"
            >
              <FaTelegramPlane size={18} />
            </Link>
            <Link
              href="/social/instagram"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:scale-110 transition"
              aria-label="اینستاگرام"
            >
              <FaInstagram size={18} />
            </Link>
            <Link
              href="https://wa.me/9122434557"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:scale-110 transition"
              aria-label="واتساپ"
            >
              <FaWhatsapp size={18} />
            </Link>
          </div>
        )}

        {/* دکمه اصلی */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-all duration-300 z-50"
          aria-label="اشتراک‌گذاری"
        >
          {isOpen ? (
            <FaTimes size={20} className="text-white" />
          ) : (
            <FaShareAlt size={20} className="text-white" />
          )}
        </button>
      </div>
    </>
  );
};

export default FloatingSocialButton;
