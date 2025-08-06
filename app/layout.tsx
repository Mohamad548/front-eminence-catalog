import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'], // 'arabic' subset includes Persian characters
  display: 'swap',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'کاتالوگ امیننس',
  description: 'کسرا امیننس یک برند باسابقه و معتبر ایرانی در صنعت صوتی و تصویری است که با بیش از ۴۰ سال تجربه، ترکیبی از کیفیت برتر، اصالت فرهنگی و فناوری روز دنیا را ارائه می‌دهد. این برند با الهام از میراث موسیقی ایران و با نگاهی جهانی، محصولاتی را طراحی می‌کند که هم نیاز فنی کاربران را برآورده می‌کند و هم هویت فرهنگی آن‌ها را منعکس می‌سازد.',
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
