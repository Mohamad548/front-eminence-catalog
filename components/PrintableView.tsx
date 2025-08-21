'use client';

import React from 'react';
import { Product } from '../types';

interface PrintableViewProps {
  products: Product[];
  onExitPrint: () => void;
}

const PrintableView: React.FC<PrintableViewProps> = ({ products, onExitPrint }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#E5E5E5] text-[#191919] min-h-screen font-sans printable-area p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 noprint">
          <div className="text-center sm:text-right mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-[#066194]">پیش‌نمایش لیست محصولات</h1>
            <p className="text-[#B0B0B0]">این لیست برای چاپ بهینه شده است.</p>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={onExitPrint}
              className="px-5 py-2 bg-[#191919] text-[#f5e884] font-semibold rounded-lg hover:bg-[#b85335] transition-colors"
            >
              بازگشت به کاتالوگ
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-[#066194] text-white font-semibold rounded-lg hover:bg-[#23a9e1] transition-colors"
            >
              چاپ لیست
            </button>
          </div>
        </header>

        {/* جدول دسکتاپ و چاپ */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#23a9e1] text-white">
              <tr>
                <th className="p-3 text-center font-semibold border-r border-[#abe1fa]">ردیف</th>
                <th className="p-3 text-center font-semibold border-r border-[#abe1fa]">عکس محصول</th>
                <th className="p-3 text-right font-semibold border-r border-[#abe1fa]">نام محصول</th>
                <th className="p-3 text-right font-semibold border-r border-[#abe1fa]">مدل</th>
                <th className="p-3 text-right font-semibold border-r border-[#abe1fa]">بازه ولتاژی</th>
                <th className="p-3 text-left font-semibold border-r border-[#abe1fa]">قیمت (تومان)</th>
                <th className="p-3 text-center font-semibold border-r border-[#abe1fa]">ابعاد (W*D*H)mm</th>
                <th className="p-3 text-center font-semibold">وزن (کیلوگرم)</th>
              </tr>
            </thead>
            <tbody className="text-[#191919]">
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b border-[#abe1fa] ${
                    index % 2 === 0 ? 'bg-[#f5e884]/20' : 'bg-white'
                  } hover:bg-[#d2ab67]/40 transition-colors`}
                >
                  <td className="p-3 text-center align-middle">{index + 1}</td>
                  <td className="p-3 text-center align-middle">
                    <img
                      src={Array.isArray(product.image) ? product.image[0] : product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md mx-auto"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-3 text-right align-middle font-medium">{product.name}</td>
                  <td className="p-3 text-right align-middle font-mono">{product.code}</td>
                  <td className="p-3 text-right align-middle">{product.voltage_range || product['بازه ولتاژی'] || '—'}</td>
                  <td className="p-3 text-left align-middle font-semibold text-[#b85335]">
                    {product.price_customer.toLocaleString('fa-IR')}
                  </td>
                  <td className="p-3 text-center align-middle">{product.dimensions || product['ابعاد'] || '—'}</td>
                  <td className="p-3 text-center align-middle">{product.weight || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintableView;
