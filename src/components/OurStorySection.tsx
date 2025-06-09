'use client';

import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import images
import oaxacaImage from '@/assets/about/oaxaca.jpg';
import maestroImage from '@/assets/about/master.jpg';
import regionImage from '@/assets/about/san.jpg';
import procesoImage from '@/assets/about/process.jpg';
import imagenImage from '@/assets/about/product.jpg';

export default function OurStorySection() {
  const { t } = useTranslation();

  const slides = [
    {
      subtitle: t('ourStory.slides.0.subtitle'),
      title: t('ourStory.slides.0.title'),
      description: t('ourStory.slides.0.description'),
      image: oaxacaImage
    },
    {
      subtitle: t('ourStory.slides.1.subtitle'),
      title: t('ourStory.slides.1.title'),
      description: t('ourStory.slides.1.description'),
      image: maestroImage
    },
    {
      subtitle: t('ourStory.slides.2.subtitle'),
      title: t('ourStory.slides.2.title'),
      description: t('ourStory.slides.2.description'),
      image: regionImage
    },
    {
      subtitle: t('ourStory.slides.3.subtitle'),
      title: t('ourStory.slides.3.title'),
      description: t('ourStory.slides.3.description'),
      image: procesoImage
    },
    {
      subtitle: t('ourStory.slides.4.subtitle'),
      title: t('ourStory.slides.4.title'),
      description: t('ourStory.slides.4.description'),
      image: imagenImage
    }
  ];

  return (
    <section id="our-story" className="section-padding bg-navy-50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-medium text-navy-900 mb-6">
            {t('ourStory.title')}
          </h2>
        </div>

        <div className="relative">
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg flex items-center justify-center text-navy-900 hover:bg-navy-900 hover:text-white transition-all duration-300 -ml-16 hidden lg:flex">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg flex items-center justify-center text-navy-900 hover:bg-navy-900 hover:text-white transition-all duration-300 -mr-16 hidden lg:flex">
            <ChevronRight className="w-6 h-6" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="h-auto"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
                  {/* Content Column */}
                  <div className={`space-y-6 ${index % 2 === 0 ? 'order-1' : 'order-2 lg:order-1'}`}>
                    <div>
                      <p className="text-navy-600 font-normal text-xs mb-2">
                        {slide.subtitle}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-medium text-navy-900 mb-6">
                        {slide.title}
                      </h3>
                    </div>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-navy-700 leading-relaxed text-justify text-sm font-light">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Image Column */}
                  <div className={`relative ${index % 2 === 0 ? 'order-2' : 'order-1 lg:order-2'}`}>
                    <div className="relative aspect-square overflow-hidden shadow-xl">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
