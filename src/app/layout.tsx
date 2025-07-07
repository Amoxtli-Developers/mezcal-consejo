import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Mezcal Consejo - Tradición Artesanal',
    template: '%s | Mezcal Consejo',
  },
  description:
    'Una fuente de inspiración para atreverte a hacer lo que te apasiona. Mezcal artesanal de Oaxaca hecho con respeto y tradición.',
  keywords: [
    'mezcal',
    'artesanal',
    'Oaxaca',
    'agave',
    'tradición',
    'México',
    'bebida',
    'rural',
    'comunidad',
  ],
  authors: [
    { name: 'Mezcal Consejo', url: 'https://mezcalconsejo.com/' },
  ],
  creator: 'Mezcal Consejo',
  openGraph: {
    title: 'Mezcal Consejo - Tradición Artesanal',
    description:
      'Mezcal artesanal de Oaxaca: tradición, sabor e identidad. Descubre nuestra historia y proceso.',
    url: 'https://mezcalconsejo.com/',
    siteName: 'Mezcal Consejo',
    images: [
      {
        url: 'https://mezcalconsejo.com/assets/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'Logotipo de Mezcal Consejo',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mezcal Consejo - Tradición Artesanal',
    description: 'Mezcal artesanal de Oaxaca: tradición, sabor e identidad.',
    creator: '@MezcalConsejo',
    images: ['https://mezcalconsejo.com/assets/logo/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  icons: {
    icon: { url: '/assets/logo/logo.png', type: 'image/png', sizes: 'any' },
    apple: { url: '/assets/logo/logo.png', type: 'image/png', sizes: 'any' },
    shortcut: '/assets/logo/logo.png',
  },
  themeColor: '#ffffff',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  alternates: {
    canonical: 'https://mezcalconsejo.com',
    languages: {
      'es-MX': 'https://www.mezcalconsejo.com/',
      'en-US': 'https://www.mezcalconsejo.com/en',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}<Toaster position="top-right" /></body>
    </html>
  )
}
