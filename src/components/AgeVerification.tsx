'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Cookies from 'js-cookie';
import Image from 'next/image';
import logo from '@/assets/logo/logo.png';
import backgroundImage from '@/assets/gallery/4.jpg';

interface AgeVerificationProps {
  onVerified: () => void;
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const { t } = useTranslation();
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const checkVerification = useCallback(() => {
    const isVerified = Cookies.get('age-verified');
    if (isVerified === 'true') {
      onVerified();
    }
  }, [onVerified]);

  useEffect(() => {
    checkVerification();
  }, [checkVerification]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!day || !month || !year) {
      setError(t('ageVerification.fillAllFields'));
      return;
    }

    const birth = new Date(`${month}/${day}/${year}`);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age >= 18) {
      Cookies.set('age-verified', 'true', { expires: 30 });
      onVerified();
    } else {
      setError(t('ageVerification.underAge'));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <div className="bg-white p-6 sm:p-8 max-w-3xl w-full mx-4 shadow-2xl transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100 rounded-lg flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        {/* Logo arriba en móvil, izquierda en desktop */}
        <div className="flex flex-col items-center justify-center text-center w-full sm:w-auto mr-0 sm:mr-8">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={70}
          />
          <p className="text-center text-sm mt-2 font-medium text-navy-900 w-full">
            Mezcal Consejo
          </p>
        </div>
  
        {/* Formulario */}
        <div className="w-full">
          <div className="text-center sm:text-left mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy-900 mb-2">{t('ageVerification.title')}</h2>
            <p className="text-navy-700 mb-4 font-light">{t('ageVerification.subtitle')}</p>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4 justify-center sm:justify-start">
              <Input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
                placeholder="dd"
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
              <Input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
                placeholder="mm"
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
              <Input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                placeholder="yyyy"
                className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-navy-900"
              />
            </div>
  
            {error && <p className="text-red-600 text-sm">{error}</p>}
  
            <Button
              type="submit"
              className="w-full bg-navy-900 text-white hover:bg-navy-700 transition-all duration-200"
            >
              {t('ageVerification.enter')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );  
}
