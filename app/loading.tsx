'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-brand-blue-dark overflow-hidden">
      {/* زمینه متحرک در صورت نیاز */}
      <div className="whale-background" />

      {/* لایه تاریک کننده */}
      <div className="absolute inset-0 bg-black/50" />

      {/* ذرات شناور */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const bottom = -(Math.random() * 20 + 10);
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 10;
          const xEnd = Math.random() * 40 - 20;

          return (
            <div
              key={i}
              className="absolute bg-brand-blue-sky/50 rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                bottom: `${bottom}px`,
                animation: `move-particles ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
                transform: `translateX(${xEnd}vw)`,
              }}
            />
          );
        })}
      </div>

      {/* متن و برند */}
      <div className="text-center z-10 animate-fadeIn">
        <div className="relative inline-block p-4">
          <h1
            className="text-5xl md:text-7xl font-extrabold text-white tracking-widest uppercase"
            style={{ textShadow: '0 0 25px rgba(245, 232, 132, 0.7)' }}
          >
            EMINENCE
          </h1>
        </div>
        <p className="text-brand-gray-light text-xl mt-6 font-semibold animate-pulse">
          در حال بارگذاری کاتالوگ...
        </p>
      </div>
    </div>
  );
}
