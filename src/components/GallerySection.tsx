"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import gal1 from "@/assets/gallery/1.jpg";
import gal2 from "@/assets/gallery/2.jpg";
import gal3 from "@/assets/gallery/3.jpg";
import gal4 from "@/assets/gallery/4.jpg";
import gal5 from "@/assets/gallery/5.jpg";
import gal6 from "@/assets/gallery/6.jpg";

export default function GallerySection() {
    const { t } = useTranslation();

    const galleryImages = [
        {
            src: gal1,
            alt: "Agave plantation",
        },
        {
            src: gal2,
            alt: "Traditional mezcal production",
        },
        {
            src: gal3,
            alt: "Mezcal distillery",
        },
        {
            src: gal4,
            alt: "Mezcal bottles",
        },
        {
            src: gal5,
            alt: "Mezcal production process",
        },
        {
            src: gal6,
            alt: "Traditional copper stills",
        },
    ];

    return (
        <section id="gallery" className="section-padding bg-navy-50">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-medium text-navy-900 mb-6">
                        {t("gallery.title")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className="relative h-64 overflow-hidden shadow-lg group"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-all duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
