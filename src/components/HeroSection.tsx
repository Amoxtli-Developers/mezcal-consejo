'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onVideoLoad: () => void;
}

export default function HeroSection({ onVideoLoad }: HeroSectionProps) {
  const { t } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const scrollToProduct = () => {
    const element = document.getElementById('product');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Load Vimeo Player script and handle video load
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    
    script.onload = () => {
      // Simulate video loading time
      setTimeout(() => {
        setVideoLoaded(true);
        onVideoLoad();
      }, 2000);
    };
    
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [onVideoLoad]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video - Vimeo */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe 
          src="https://player.vimeo.com/video/1091673803?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '177.78vh', // 16:9 aspect ratio adjustment
            height: '100vh',
            minWidth: '100vw',
            minHeight: '56.25vw', // 16:9 aspect ratio
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          title="MEZCAL CONSEJO"
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-navy-900/60"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto container-padding">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          {t('hero.title')}
        </h1>
        
        <p className="text-base md:text-lg mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          {t('hero.subtitle')}
        </p>
        
        <Button
          onClick={scrollToProduct}
          size="lg"
          className="bg-white text-navy-900 hover:bg-navy-50 px-6 py-3 text-base font-semibold animate-slide-up normal-case"
        >
            <span className="flex items-center gap-2">
              {t('hero.buyButton')}
              {/* Lucide ShoppingBag Icon */}
              <ShoppingBag className="w-4 h-4" />
            </span>
        </Button>
      </div>
    </section>
  );
}
