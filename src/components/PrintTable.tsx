'use client';

import Image from 'next/image';
import React from 'react';
import { BASE_URL } from '../../url';
import { Product } from '@/types';



interface PrintTableProps {
  products: Product[];
}
export default function PrintTable({ products }: PrintTableProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow print:shadow-none print:p-0 print:bg-white max-w-[794px] mx-auto">
      
      {/* 🔰 Header ویژه چاپ */}
      <div className="text-center mb-6 border-b pb-4 print:block hidden">
        <h1 className="text-xl font-bold text-gray-800">کاتالوگ محصولات امیننس</h1>
        <h2 className="text-sm mt-1 text-gray-600">Eminence Product Catalog</h2>
        <div className="text-xs mt-2 text-gray-500">۴۰ سال اعتبار • کیفیت تضمینی</div>
      </div>

      {/* ✅ جدول محصولات */}
      <table className="w-full border-collapse text-sm text-gray-700 print:text-black">
        <thead className="bg-gray-100 print:bg-transparent border-b border-gray-300">
          <tr className="text-center">
            <th className="py-3 px-2 border">ردیف</th>
            <th className="py-3 px-2 border">عکس</th>
            <th className="py-3 px-2 border">نام محصول</th>
            <th className="py-3 px-2 border">قیمت مشتری</th>
            <th className="py-3 px-2 border">کد محصول</th>
            <th className="py-3 px-2 border">توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`text-center align-middle ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} print:bg-transparent`}
            >
              <td className="py-2 px-2 border">{index + 1}</td>
              <td className="py-2 px-2 border">
                <div className="relative w-14 h-14 mx-auto rounded bg-white border border-gray-200">
                  <Image
                    src={
                      product.image
                        ? `${BASE_URL}/uploads/${product.image}`
                        : 'https://www.kasraeminence.com/wp-content/uploads/2024/12/cropped-cropped-2.png'
                    }
                    alt={product.name}
                    fill
                    quality={100}
                    className="object-contain p-1 rounded"
                  />
                </div>
              </td>
              <td className="py-2 px-2 border text-right">{product.name}</td>
              <td className="py-2 px-2 border font-bold text-green-600 print:text-black">
             {product.priceCustomer?.toLocaleString('fa-IR') ?? '—'} تومان
              </td>
              <td className="py-2 px-2 border">{product.code}</td>
              <td className="py-2 px-2 border text-right whitespace-pre-line">
                {product.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
