'use client';

import { Product } from '@/types';
import React from 'react';
import { BASE_URL } from '../../../url';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    console.log(product.image)
  return (
    <div className="product-card bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-start space-x-4 space-x-reverse">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16  bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-xs text-center px-1">
            <div className="relative w-12 h-12">
              <Image
                src={
                  product.image
                    ? `${BASE_URL}/uploads/${product.image}`
                    : 'https://www.kasraeminence.com/wp-content/uploads/2024/12/cropped-cropped-2.png'
                }
                alt={product.name}
                fill
                quality={100}
                className="object-contain p-1 bg-gray-50 rounded"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <h3 className="font-bold text-gray-900 text-sm mb-1">
              {product.name}
            </h3>
            <div className="text-xs text-gray-500 mb-1">
              شناسه: {product.code}
            </div>
            <div className="text-xs text-blue-600 mb-2">
              {product.category_name}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">همکار ۲:</span>
              <span className="price-tag px-2 py-1 rounded text-xs font-medium">
                {product.price2.toLocaleString()} تومان
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">همکار ۱:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {product.price1.toLocaleString()} تومان
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">فروش عادی:</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                {product.price_customer.toLocaleString()} تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
