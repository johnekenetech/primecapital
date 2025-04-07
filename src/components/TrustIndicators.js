'use client';
import { useCountAnimation } from '@/hooks/useCountAnimation';
import { useEffect, useRef, useState } from 'react';

export default function TrustIndicators() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const activeUsers = useCountAnimation(10000);
  const clientSatisfaction = useCountAnimation(98);
  const assetsManaged = useCountAnimation(500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`flex flex-row justify-center items-center gap-5 md:gap-10 text-white text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="transform transition-all duration-1000" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
        <h4 className="text-3xl font-bold">
          {activeUsers.toLocaleString()}+
        </h4>
        <p className="text-sm md:text-base">Active Users</p>
      </div>
      <div className="transform transition-all duration-1000 delay-200" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
        <h4 className="text-3xl font-bold">
          {clientSatisfaction}%
        </h4>
        <p className="text-sm md:text-base">Client Satisfaction</p>
      </div>
      <div className="transform transition-all duration-1000 delay-400" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
        <h4 className="text-3xl font-bold">
          ${assetsManaged}M+
        </h4>
        <p className="text-sm md:text-base">Assets Managed</p>
      </div>
    </div>
  );
} 