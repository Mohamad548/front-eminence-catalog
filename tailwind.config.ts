// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // اگر از Pages Router استفاده می‌کنید
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ['var(--font-vazirmatn)', 'sans-serif'], // تعریف فونت محلی
        montserrat: ['Montserrat', 'sans-serif'], // اگر برای عناصر خاصی استفاده می‌کنید
      },
      // ... سایر تنظیمات extend
    },
  },
  plugins: [],
};
export default config;