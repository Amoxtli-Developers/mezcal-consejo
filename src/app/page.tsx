'use client';

import { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';

import LanguageInitializer from '@/components/LanguageInitializer';
import AgeVerification from '@/components/AgeVerification';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import OurStorySection from '@/components/OurStorySection';
import ProductSection from '@/components/ProductSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    // Check if age verification is already done
    const checkAgeVerification = () => {
      const isVerified = document.cookie.includes('age-verified=true');
      setIsAgeVerified(isVerified);
    };

    checkAgeVerification();
  }, []);

  const handleAgeVerified = () => {
    setIsAgeVerified(true);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoading(false);
  };

  // Show nothing while checking age verification
  if (isAgeVerified === null) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageInitializer>
        <main className="min-h-screen">
          {!isAgeVerified && <AgeVerification onVerified={handleAgeVerified} />}
          
          {isAgeVerified && (
            <>
              <Loader isLoading={isVideoLoading} />
              <div className={isVideoLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
                <Navbar />
                <HeroSection onVideoLoad={handleVideoLoaded} />
                <AboutSection />
                <OurStorySection />
                <ProductSection />
                <GallerySection />
                <ContactSection />
                <Footer />
              </div>
            </>
          )}
        </main>
      </LanguageInitializer>
    </I18nextProvider>
  );
}
