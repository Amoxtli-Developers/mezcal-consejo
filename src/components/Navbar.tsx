'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cambiar cuando se sale del hero section (aproximadamente la altura de la ventana)
      setScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    // Guardar preferencia de idioma en localStorage
    localStorage.setItem('preferred-language', newLang);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { key: 'home', section: 'hero' },
    { key: 'about', section: 'about' },
    { key: 'shop', section: 'product' },
    { key: 'gallery', section: 'gallery' },
    { key: 'contact', section: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className={`max-w-7xl mx-auto container-padding transition-all duration-300 ${
        scrolled ? 'pt-0' : 'pt-2'
      }`}>
        <div className={`flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/logo/logo.png"
                alt="Mezcal Consejo Logo"
                width={scrolled ? 28 : 38}
                height={scrolled ? 22 : 30}
                className="transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <span className={`ml-2.5 text-base font-bold transition-all duration-300 leading-tight self-center ${
              scrolled ? 'text-navy-900' : 'text-white'
            }`}>Mezcal Consejo</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.section)}
                className={`font-medium text-sm transition-colors duration-200 ${
                  scrolled 
                    ? 'text-navy-700 hover:text-navy-900' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
            
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/mezcal_consejo/" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 ${
                scrolled 
                  ? 'text-navy-700 hover:text-navy-900' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <Instagram className="w-5 h-5" />
            </a>
            
            <Button
              onClick={changeLanguage}
              variant={scrolled ? "outline" : "secondary"}
              size="sm"
              className={`ml-4 transition-all duration-300 ${
                scrolled 
                  ? 'border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              <Globe className="w-4 h-4 mr-2" />
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </Button>
          </div>

          {/* Mobile menu button and language selector */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href="https://instagram.com/mezcalconsejo" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-200 ${
                scrolled ? 'text-navy-700 hover:text-navy-900' : 'text-white hover:text-white/80'
              }`}
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Button
              onClick={changeLanguage}
              variant={scrolled ? "outline" : "secondary"}
              size="sm"
              className={`transition-all duration-300 ${
                scrolled 
                  ? 'border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white' 
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              <Globe className="w-4 h-4" />
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-200 ${
                scrolled ? 'text-navy-700 hover:text-navy-900' : 'text-white hover:text-white/80'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden border-t transition-colors duration-300 ${
            scrolled ? 'bg-white border-navy-200' : 'bg-black/20 backdrop-blur-sm border-white/20'
          }`}>
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.section)}
                  className={`block w-full text-left px-4 py-2 transition-colors duration-200 ${
                    scrolled 
                      ? 'text-navy-700 hover:text-navy-900 hover:bg-navy-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
