'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import TrustIndicators from '@/components/TrustIndicators';
import { useTextReveal } from '@/hooks/useTextReveal';
import Link from 'next/link';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const titleVisible = useTextReveal(500);
  const subtitleVisible = useTextReveal(1000);
  const buttonVisible = useTextReveal(1500);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url(/bg.jpg)',
          imageRendering: 'crisp-edges',
          WebkitImageRendering: 'crisp-edges'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <Navbar />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className={`text-white mt-10 md:mt-34 text-6xl md:text-8xl font-bold transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Prime<span className="text-yellow-500">Capital</span>.
          </h1>
          <p className={`text-white md:text-2xl mb-8 transition-all duration-1000 ${subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Build wealth, securing future.
          </p>
          <Link href="/login">
            <button 
              className={`bg-white text-black px-8 py-3 cursor-pointer rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-1000 ${buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              Get Started
            </button>
          </Link>
        </div>
        <TrustIndicators />

        <div className="flex items-center space-x-4  p-4 mt-20 rounded-lg backdrop-blur-sm">
            <img src="/sec.png" alt="SEC Logo" className="h-12 w-auto" />
            <p className="text-white text-sm">Licensed and regulated by the U.S. Securities and Exchange Commission (SEC)</p>
        </div>

       
      </div>
    </main>
  );
}
