'use client';
import { useRouter } from 'next/navigation';

export default function FAQPage() {
  const router = useRouter();

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
      <div className="fixed top-0 left-0 right-0 z-50 p-4 md:px-24 md:py-10 flex justify-between items-center">
        <div 
          onClick={() => router.push('/')} 
          className="text-white text-2xl cursor-pointer"
        >
          Prime<span className="text-yellow-500">Capital</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/')}
            className="text-white hover:text-yellow-500 transition-colors duration-300"
          >
            Home
          </button>
        </div>
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h1>
          <div className="space-y-6">
            <div className="p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">What is PrimeCapital?</h2>
              <p className="text-white">PrimeCapital is a leading investment platform that helps you build and manage your wealth effectively.</p>
            </div>
            <div className="p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">How do I get started?</h2>
              <p className="text-white">Simply create an account, complete the verification process, and you can start investing right away.</p>
            </div>
            <div className="p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Is my investment safe?</h2>
              <p className="text-white">Yes, we use industry-standard security measures to protect your investments and personal information.</p>
            </div>
            <div className="p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">What are the fees?</h2>
              <p className="text-white">Our fee structure is transparent and competitive. Please check our pricing page for detailed information.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 