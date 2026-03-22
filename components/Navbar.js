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

  // Навигационные ссылки
  const navLinks = [
  { 
    href: '/updates', 
    label: 'Обновления', 
    color: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ) 
  },
  { 
    href: '/download', 
    label: 'Скачать', 
    color: 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ) 
  },
];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg dark:bg-gray-800/90' : 'bg-white dark:bg-gray-800'
}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <img
                src="/favicon.ico"
                alt="Tegbi"
                className="w-10 h-10 rounded-lg transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-tg-primary to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-semibold text-tg-text group-hover:text-tg-primary transition-colors dark:text-white">
              tegbi
            </span>
          </Link>

          {/* Десктоп: навигация + поддержка */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Навигационные ссылки */}
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
  <Link
    key={link.href}
    href={link.href}
    className={`group flex items-center space-x-1.5 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${link.color} hover:bg-gray-100 dark:hover:bg-gray-700`}
  >
    <span className="transform group-hover:scale-110 transition-transform duration-200">
      {link.icon}
    </span>
    <span className="text-sm">{link.label}</span>
  </Link>
))}
            </div>

            {/* Кнопка поддержки */}
            <a
              href="https://tegbi-support.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-tg-primary to-purple-600 text-white px-5 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-tg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="text-sm font-medium">Поддержка</span>
              </span>
            </a>
          </div>

          {/* Мобильная кнопка меню */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Меню"
          >
            <svg className="w-6 h-6 text-tg-text dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700 animate-slideDown absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg z-50">
            <div className="flex flex-col space-y-1 px-4">
              {/* Навигация */}
              {navLinks.map((link) => (
  <Link
    key={link.href}
    href={link.href}
    onClick={() => setIsMobileMenuOpen(false)}
    className={`flex items-center space-x-3 py-3 px-2 rounded-lg font-medium transition-colors ${link.color} hover:bg-gray-50 dark:hover:bg-gray-700`}
  >
    {link.icon}
    <span>{link.label}</span>
  </Link>
))}
              
              {/* Поддержка */}
              <a
                href="https://tegbi-support.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 py-3 px-2 rounded-lg text-tg-text hover:text-tg-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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