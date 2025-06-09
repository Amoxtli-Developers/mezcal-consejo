'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import storeImage from '@/assets/mezcal/store.jpg'; 

export default function ProductSection() {
  const { t } = useTranslation();

  const handleBuyClick = () => {
    // Aquí puedes agregar la lógica para redirigir a la tienda o abrir un modal de compra
    alert('Redirigiendo a la tienda...');
  };

  return (
    <section id="product" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative">
            <div className="relative h-[650px] w-full max-w-md mx-auto">
              <Image
                src={storeImage}
                alt="Mezcal Consejo Bottle"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
                {t('product.title')}
              </h2>
              <p className="text-base text-navy-700 leading-relaxed">
                {t('product.description')}
              </p>
            </div>
            
            {/* Price */}
            <div className="text-2xl font-bold text-navy-900">
              {t('product.price')}
            </div>
            
            {/* Buy Button */}
            <Button
              onClick={handleBuyClick}
              size="lg"
              className="bg-navy-900 hover:bg-navy-800 px-6 py-3 text-base font-semibold"
            >
            <span className="flex items-center gap-2">
              {t('product.buyButton')}
              <ShoppingBag className="w-4 h-4" />
            </span>
            </Button>

            {/* Product Details */}
            <div className="bg-navy-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-navy-900 mb-4">
                {t('product.details.title')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-navy-700 text-sm">{t('product.details.agave').split(':')[0]}:</span>
                  <span className="font-medium text-navy-900 text-sm">{t('product.details.agave').split(':')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-700 text-sm">{t('product.details.region').split(':')[0]}:</span>
                  <span className="font-medium text-navy-900 text-sm">{t('product.details.region').split(':')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-700 text-sm">{t('product.details.alcohol').split(':')[0]}:</span>
                  <span className="font-medium text-navy-900 text-sm">{t('product.details.alcohol').split(':')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-700 text-sm">{t('product.details.production').split(':')[0]}:</span>
                  <span className="font-medium text-navy-900 text-sm">{t('product.details.production').split(':')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-700 text-sm">{t('product.details.aging').split(':')[0]}:</span>
                  <span className="font-medium text-navy-900 text-sm">{t('product.details.aging').split(':')[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
