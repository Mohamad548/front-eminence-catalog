'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ReactDOMServer from 'react-dom/server';

const BASE_URL = 'https://eminencecatalog-backend.onrender.com';

interface Product {
  id: number;
  image: string;
  code: string;
  name: string;
  price_customer: number;
  description: string;
}

const sampleProducts: Product[] = [
  {
    id: 4,
    image: '1752561107172-321331939.jpeg',
    code: 'UVS-10KVA',
    name: 'استابلایرزهاینورم مدل10KVA',
    price_customer: 12580000,
    description: 'خیلی خوبه بخرین',
  },
  {
    id: 5,
    image: '1752561995334-302985867.jpeg',
    code: 'UVC-15KVA',
    name: 'استابلایزر هوشمند دیجیتال 15KVA',
    price_customer: 57600000,
    description:
      'استابلایزر دیجیتال UVC-15KVA از برند معتبر Hinorms، با طراحی مدرن و نمایشگر LCD، مناسب برای محافظت از تجهیزات حساس خانگی و اداری در برابر نوسانات شدید برق.\n✅ ظرفیت 15kVA واقعی\n✅ کنترل هوشمند ولتاژ با دقت بالا\n✅ محافظت کامل در برابر نوسان، نوسانات فرکانس، اضافه بار و اتصال کوتاه',
  },
];

// کامپوننت جدول چاپ
const PrintTable: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div dir="rtl" style={{ fontFamily: `'Vazir', Tahoma, Arial, sans-serif`, padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>لیست محصولات</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={tableHeaderStyle}>ردیف</th>
            <th style={tableHeaderStyle}>عکس</th>
            <th style={tableHeaderStyle}>نام محصول</th>
            <th style={tableHeaderStyle}>قیمت مشتری</th>
            <th style={tableHeaderStyle}>کد محصول</th>
            <th style={tableHeaderStyle}>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={product.id} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={tableCellStyleCenter}>{i + 1}</td>
              <td style={{ ...tableCellStyleCenter, padding: 4 }}>
                <div style={{ position: 'relative', width: 50, height: 50, margin: 'auto' }}>
                  <Image
                    src={
                      product.image
                        ? `${BASE_URL}/uploads/${product.image}`
                        : 'https://www.kasraeminence.com/wp-content/uploads/2024/12/cropped-cropped-2.png'
                    }
                    alt={product.name}
                    fill
                    quality={100}
                    style={{ objectFit: 'contain', borderRadius: 6, backgroundColor: '#f9f9f9', padding: 4 }}
                  />
                </div>
              </td>
              <td style={tableCellStyle}>{product.name}</td>
              <td style={tableCellStyleCenter}>{product.price_customer.toLocaleString()} تومان</td>
              <td style={tableCellStyleCenter}>{product.code}</td>
              <td style={tableCellStyle}>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: 8,
  textAlign: 'center',
  fontWeight: 'bold',
};

const tableCellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: 8,
  textAlign: 'right',
};

const tableCellStyleCenter: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: 8,
  textAlign: 'center',
};

export default function Page() {
  const [products] = useState<Product[]>(sampleProducts);

  // تابع چاپ
  function exportProductsToPrint(products: Product[]) {
    const printWindow = window.open('', '', 'width=900,height=700');
    if (!printWindow) return;

    const htmlContent = ReactDOMServer.renderToStaticMarkup(<PrintTable products={products} />);

    printWindow.document.write(`
      <html lang="fa" dir="rtl">
        <head>
          <title>چاپ محصولات</title>
          <link
            href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
            rel="stylesheet"
            type="text/css"
          />
          <style>
            body {
              font-family: 'Vazir', Tahoma, Arial, sans-serif;
              margin: 20px;
              background: #fff;
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 14px;
            }
            th,
            td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            th {
              background-color: #f0f0f0;
              font-weight: bold;
              text-align: center;
            }
            td {
              vertical-align: middle;
            }
            img {
              max-width: 50px;
              max-height: 50px;
              border-radius: 6px;
              background-color: #f9f9f9;
              padding: 4px;
              object-fit: contain;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    // printWindow.close(); // اگر می‌خواهی پنجره خودکار بسته شود
  }


