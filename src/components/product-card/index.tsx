'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { BASE_URL } from '../../../url';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);

  const imageUrl = product.image
    ? `${BASE_URL}/uploads/${product.image}`
    : 'https://www.kasraeminence.com/wp-content/uploads/2024/12/cropped-cropped-2.png';

  return (
    <>
      {/* Product Card */}
      <div className="product-card  bg-gradient-to-br from-white via-blue-50 to-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
        <div className="flex flex-col items-start gap-4">
          <div className='flex w-full gap-2'>
            {' '}
            {/* Product Image */}
            <div className="flex-shrink-0 text-center">
              <div
                className="cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <div className="relative w-20 h-20">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      quality={100}
                      className="object-contain p-1 bg-white rounded"
                    />
                  </div>
                </div>
                <button className="text-blue-600 text-[10px] md:text-xs mt-1 hover:underline transition">
                  مشاهده عکس
                </button>
              </div>
            </div>
            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between w-full">
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {product.name}
                </h3>
                <h3 className="text-xs text-blue-600 mb-2">
                  {product.category_name}
                </h3>
              </div>
              <div className="text-xs text-gray-500 mb-1">
                شناسه: {product.code}
              </div>
              <div className="text-xs text-gray-500 mb-1">
                ابعاد:
                {product.length || product.width || product.height
                  ? ` ${product.length ?? '—'} × ${product.width ?? '—'} × ${
                      product.height ?? '—'
                    } سانتی‌متر`
                  : ' —'}
              </div>

              {/* Pricing */}
              <div className="flex justify-between items-center text-xs mt-3">
                <span className="text-gray-600">فروش :</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-medium">
                  {product.price_customer?.toLocaleString() ?? '—'} تومان
                </span>
              </div>
            </div>
          </div>
          {/* Description with more button */}
          <div className="text-xs text-gray-600 leading-relaxed line-clamp-4 h-20 pb-6 relative">
            {product.description}

            {product.description.length > 100 && (
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-start px-1">
                <button
                  onClick={() => setIsDescModalOpen(true)}
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 transition"
                >
                  مشاهده کامل
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-md w-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto rounded-md object-contain"
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              بستن
            </button>
          </div>
        </div>
      )}

      {/* Description Modal */}
      {isDescModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setIsDescModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg p-6 max-w-lg w-[90%] max-h-[80vh] overflow-y-auto text-sm leading-loose text-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl}
              alt={product.name}
              width={100}
              height={100}
              className="w-full h-auto rounded-md object-contain"
            />
            <h2 className="font-bold text-base mb-4 text-gray-700">
              توضیحات محصول
            </h2>
            <p>{product.description}</p>
            <button
              onClick={() => setIsDescModalOpen(false)}
              className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
