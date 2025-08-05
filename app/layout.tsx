import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'], // 'arabic' subset includes Persian characters
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'کاتالوگ لوکس',
  description: 'یک کاتالوگ دیجیتال حرفه‌ای برای نمایش، جستجو و فیلتر کردن محصولات. این برنامه با رابط کاربری مدرن و واکنش‌گرا طراحی شده است.',
  icons: {
      icon: '/vite.svg', // Assumes vite.svg is moved to the /public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-brand-blue-dark text-brand-gray-light font-sans">
        {children}
      </body>
    </html>
  )
}
