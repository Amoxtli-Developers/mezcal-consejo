'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageInitializerProps {
  children: React.ReactNode;
}

export default function LanguageInitializer({ children }: LanguageInitializerProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Asegurar que el idioma por defecto sea español
    if (i18n.language !== 'es') {
      i18n.changeLanguage('es');
    }
    
    // Cargar idioma guardado si existe
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return <>{children}</>;
}
