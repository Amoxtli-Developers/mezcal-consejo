'use client';

import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/mezcal_consejo/', label: 'Instagram' },
  ];

  const navLinks = [
    { label: t('nav.home'), section: 'hero' },
    { label: t('nav.about'), section: 'about' },
    { label: t('nav.shop'), section: 'product' },
    { label: t('nav.gallery'), section: 'gallery' },
    { label: t('nav.contact'), section: 'contact' },
  ];

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Slogan */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/assets/logo/logo.png"
                alt="Mezcal Consejo Logo"
                width={50}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-bold">Mezcal Consejo</span>
            </div>
            <p className="text-navy-300 mb-6">
              {t('footer.slogan')}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.sections')}</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-navy-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-navy-400" />
                <a
                  href={`mailto:${t('footer.email')}`}
                  className="text-navy-300 hover:text-white transition-colors duration-200"
                >
                  {t('footer.email')}
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-navy-400" />
                <a
                  href={`tel:${t('footer.phone')}`}
                  className="text-navy-300 hover:text-white transition-colors duration-200"
                >
                  {t('footer.phone')}
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.social')}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-navy-700 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-navy-800 py-6 text-center ">
          <p className="text-navy-400 text-sm">
            {t('footer.copyright')} <a href="https://www.amoxtli.tech" target='_blank' className="text-navy-300 hover:text-white transition-colors duration-200">Amoxtli Web Developers</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
