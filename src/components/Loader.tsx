'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo/logo.png';

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        // El loader se ocultará cuando el video esté listo
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Image
        src={logo}
        alt="Mezcal Consejo"
        width={60}
        height={48}
        className="heartbeat"
        priority
      />
      
      <style jsx global>{`
        .heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
