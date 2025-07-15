// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext'; // آدرس دقیق خودت رو جایگزین کن

export const metadata: Metadata = {
  title: 'کاتالوگ محصولات امیننس',
  description: 'کاتالوگ محصولات امیننس با قابلیت جستجو و خروجی PDF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
