"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import aboutImage from '@/assets/mezcal/about.jpg';

export default function AboutSection() {
    const { t } = useTranslation();

    return (
        <section id="about" className="section-padding bg-white">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Column */}
                    <div className="order-2 lg:order-1">
                        <div className="relative aspect-square overflow-hidden shadow-xl">
                            <Image
                                src={aboutImage.src}
                                alt="Agave plants in Oaxaca"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <div>
                            <h3 className="text-navy-600 font-medium text-sm mb-2">
                                {t("about.subtitle")}
                            </h3>
                            <h2 className="text-3xl lg:text-4xl font-medium text-navy-900 mb-6">
                                {t("about.title")}
                            </h2>
                        </div>

                        <p className="text-base text-navy-700 leading-relaxed font-light">
                            {t("about.description")}
                        </p>

                        {/* <div className="flex items-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900">100%</div>
                <div className="text-sm text-navy-600">Artesanal</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900">5</div>
                <div className="text-sm text-navy-600">Generaciones</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-navy-900">8-12</div>
                <div className="text-sm text-navy-600">Años de Agave</div>
              </div>
            </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
