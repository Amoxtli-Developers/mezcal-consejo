'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Cookies from 'js-cookie';

interface AgeVerificationProps {
  onVerified: () => void;
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const isVerified = Cookies.get('age-verified');
    if (isVerified === 'true') {
      onVerified();
    }
  }, [onVerified]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!birthDate) return;

    const birth = new Date(birthDate);
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
    <div className="fixed inset-0 bg-navy-900 bg-opacity-95 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">
            {t('ageVerification.title')}
          </h2>
          <p className="text-navy-700 mb-4">
            {t('ageVerification.subtitle')}
          </p>
          <p className="text-sm text-navy-600">
            {t('ageVerification.description')}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-2">
              {t('ageVerification.birthDate')}
            </label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          
          <Button type="submit" className="w-full">
            {t('ageVerification.enter')}
          </Button>
        </form>
      </div>
    </div>
  );
}
