import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetCkBTC: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetCkBTC }) => {
  return (
    <section className="bg-white text-black py-12 sm:py-20 text-center relative overflow-hidden mt-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-center bg-no-repeat bg-cover"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center items-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-24 h-24 sm:w-32 sm:h-32"
            aria-label="ckBoost logo"
          >
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: '#4a90e2', stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: '#2c3e50', stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <polygon
              points="50,10 20,90 50,70 80,90"
              fill="url(#grad2)"
              stroke="#2c3e50"
              strokeWidth="2"
            />
            <polygon
              points="50,10 35,50 50,40 65,50"
              fill="#ffffff"
              stroke="#2c3e50"
              strokeWidth="1"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
          Don't wait, get a boost
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
          ckBoost connects users with boosters to provie a fast path to ckBTC and a way for boosters to earn some yield on their ckBTC
        </p>
        <Button
          size="lg"
          className="font-semibold bg-blue-600 hover:bg-blue-700 text-white border-none"
          onClick={onGetCkBTC}
        >
          Get ckBTC now
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;