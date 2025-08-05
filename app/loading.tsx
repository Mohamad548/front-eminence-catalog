import React from 'react';

export default function Loading() {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-brand-blue-dark overflow-hidden">
      <div className="whale-background"></div>
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-brand-blue-sky/50 rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20 + 10}px`,
              animation: `move-particles ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              // @ts-ignore
              '--x-end': `${Math.random() * 40 - 20}vw`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 animate-fadeIn">
        <div 
          className="relative inline-block p-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-widest uppercase" style={{ textShadow: '0 0 25px rgba(245, 232, 132, 0.7)' }}>
            EMINENCE
          </h1>
        </div>
        <p className="text-brand-gray-light text-xl mt-6 font-semibold animate-pulse">
          در حال بارگذاری کاتالوگ...
        </p>
      </div>
    </div>
  );
};
