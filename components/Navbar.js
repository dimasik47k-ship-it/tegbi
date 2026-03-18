
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Компонент навигационного меню с кнопкой поддержки
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Отслеживание скролла для изменения стиля навбара
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Логотип/название проекта */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <img
                src="/favicon.ico"
                alt="Tegbi"
                className="w-10 h-10 rounded-lg transform group-hover:scale-110 transition-transform duration-300"
              />
              {/* Декоративный градиентный фон */}
              <div className="absolute -inset-1 bg-gradient-to-r from-tg-primary to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-semibold text-tg-text group-hover:text-tg-primary transition-colors">
              tegbi
            </span>
          </Link>

          {/* Кнопка поддержки для десктопа */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://tegbi-support.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-tg-primary to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Анимированный градиент при наведении */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-tg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              {/* Контент кнопки */}
              <span className="relative z-10 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="font-medium">Поддержка</span>
              </span>
            </a>
          </div>

          {/* Кнопка меню для мобильных устройств */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tg-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slideDown absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50">
            <div className="flex flex-col space-y-3">
              <a
                href="https://tegbi-support.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-tg-text hover:text-tg-primary transition-colors py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Поддержка</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
