'use client' 

import React from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-brand-blue-dark">
      <div className="text-center p-8 bg-brand-slate rounded-lg shadow-lg max-w-sm mx-auto border border-red-500/30">
        <h2 className="text-2xl font-bold text-red-400">خطا در ارتباط با سرور</h2>
        <p className="text-brand-gray-light mt-3">{error.message || "متاسفانه مشکلی پیش آمد."}</p>
        <button
          onClick={() => reset()}
          className="mt-6 px-6 py-2 bg-brand-blue-sky text-brand-blue-dark font-bold rounded-lg hover:bg-white transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  )
}
