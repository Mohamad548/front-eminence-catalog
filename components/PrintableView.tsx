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
    <div className="bg-gray-100 text-black min-h-screen font-sans printable-area p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 noprint">
          <div className="text-center sm:text-right mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-black">پیش‌نمایش لیست محصولات</h1>
            <p className="text-gray-700">این لیست برای چاپ بهینه شده است.</p>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={onExitPrint}
              className="px-5 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              بازگشت به کاتالوگ
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              چاپ لیست
            </button>
          </div>
        </header>
        
        {/* --- Main container for list and table --- */}
        <div className="w-full">

            {/* --- Responsive List/Card View (for SCREEN display on mobile) --- */}
            <div className="md:hidden space-y-4">
                {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex space-x-4 space-x-reverse p-4">
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0" loading="lazy" />
                    <div className="flex-grow">
                        <h3 className="font-bold text-md text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1"><span className="font-semibold">کد:</span> {product.code}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">دسته:</span> {product.category_name}</p>
                    </div>
                    </div>
                    {product.description && (
                    <div className="px-4 pb-3 text-xs text-gray-600 border-t border-gray-200 pt-2">
                        {product.description}
                    </div>
                    )}
                    <div className="bg-gray-50 px-4 py-2 text-left border-t border-gray-200">
                    <span className="text-lg font-bold text-blue-700">{product.price_customer.toLocaleString('fa-IR')}</span>
                    <span className="text-xs text-gray-500 mr-1">تومان</span>
                    </div>
                </div>
                ))}
            </div>

            {/* --- Table View (for SCREEN on desktop AND for PRINT output) --- */}
            <div className="hidden md:block print:block">
                <table className="min-w-full text-sm bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                    <th className="p-3 text-center font-semibold text-gray-700">ردیف</th>
                    <th className="p-3 text-center font-semibold text-gray-700">تصویر</th>
                    <th className="p-3 text-right font-semibold text-gray-700">نام محصول</th>
                    <th className="p-3 text-right font-semibold text-gray-700">کد</th>
                    <th className="p-3 text-right font-semibold text-gray-700">دسته‌بندی</th>
                    <th className="p-3 text-left font-semibold text-gray-700">قیمت (تومان)</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {products.map((product, index) => (
                    <React.Fragment key={product.id}>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 align-middle text-center">{index + 1}</td>
                        <td className="p-3 align-middle">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md mx-auto" loading="lazy" />
                        </td>
                        <td className="p-3 align-middle font-medium">{product.name}</td>
                        <td className="p-3 align-middle font-mono">{product.code}</td>
                        <td className="p-3 align-middle">{product.category_name}</td>
                        <td className="p-3 align-middle font-semibold text-left">{product.price_customer.toLocaleString('fa-IR')}</td>
                        </tr>
                        {product.description && (
                        <tr className="bg-gray-50/70 border-b border-gray-200">
                            <td colSpan={6} className="p-2 px-4 text-gray-600 text-xs">
                            <strong className="font-semibold">توضیحات:</strong> {product.description}
                            </td>
                        </tr>
                        )}
                    </React.Fragment>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableView;