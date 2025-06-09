import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mezcal Consejo - Tradición Artesanal',
  description: 'Una fuente de inspiración, porque hay momentos en que sólo necesitas un buen consejo para atreverte a hacer lo que te apasiona. Mezcal artesanal de Oaxaca.',
  keywords: 'mezcal, artesanal, oaxaca, agave, tradición, méxico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
