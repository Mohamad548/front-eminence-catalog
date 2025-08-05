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
    <div className="bg-white text-black min-h-screen font-sans printable-area p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 noprint">
          <div className="text-center sm:text-right mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-black">لیست محصولات</h1>
            <p className="text-gray-700">آماده برای چاپ</p>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={onExitPrint}
              className="px-5 py-2 bg-brand-gray text-brand-black font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              بازگشت به کاتالوگ
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-light transition-colors"
            >
              چاپ لیست
            </button>
          </div>
        </header>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-brand-gray-light">
              <tr>
                <th className="p-4 text-right font-semibold border border-brand-gray text-black">ردیف</th>
                <th className="p-4 text-right font-semibold border border-brand-gray text-black">تصویر</th>
                <th className="p-4 text-right font-semibold border border-brand-gray text-black">نام محصول</th>
                <th className="p-4 text-right font-semibold border border-brand-gray text-black">کد</th>
                <th className="p-4 text-right font-semibold border border-brand-gray text-black">دسته‌بندی</th>
                <th className="p-4 text-right font-semibold border border-brand-gray text-black">قیمت (تومان)</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {products.map((product, index) => (
                <React.Fragment key={product.id}>
                    <tr>
                      <td className="p-4 align-middle border border-brand-gray">{index + 1}</td>
                      <td className="p-4 align-middle border border-brand-gray">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                      </td>
                      <td className="p-4 align-middle font-medium border border-brand-gray">{product.name}</td>
                      <td className="p-4 align-middle border border-brand-gray">{product.code}</td>
                      <td className="p-4 align-middle border border-brand-gray">{product.category_name}</td>
                      <td className="p-4 align-middle border border-brand-gray">{product.price_customer.toLocaleString('fa-IR')}</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td colSpan={6} className="p-4 text-black text-xs border border-brand-gray">
                           <strong className="font-semibold block mb-1">توضیحات:</strong> {product.description}
                        </td>
                    </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintableView;