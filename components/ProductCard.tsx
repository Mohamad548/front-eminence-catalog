import React from 'react';
import { Product } from '../types';
import { CheckCircleIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onImageClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick }) => {
    const specifications = [
        { label: 'کد محصول', value: product.code },
        { label: 'دسته‌بندی', value: product.category_name },
        { label: 'ابعاد (cm)', value: `${product.length}×${product.width}×${product.height}` },
        { label: 'وزن (kg)', value: product.weight },
    ];

  return (
    <div className="flex items-center justify-center w-full py-8 px-4">
      <div className="w-full max-w-6xl mx-auto bg-brand-slate/70 backdrop-blur-lg rounded-2xl border border-brand-blue-sky/20 shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300 hover:shadow-glow-cyan hover:border-brand-blue-sky/40">
        <div className="w-full md:grid md:grid-cols-2 gap-0 md:gap-8 items-center">
          
          {/* Image Column */}
          <div className="w-full md:order-last flex justify-center items-center bg-black/20 p-4 md:p-6">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-auto max-h-80 md:max-h-[500px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => onImageClick(product)}
            />
          </div>

          {/* Details Column */}
          <div className="w-full flex flex-col justify-center text-right p-6 sm:p-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-gray-light leading-tight">
              {product.name}
            </h2>
            
            <p className="text-base text-brand-gray my-4 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="my-4">
              <span className="text-4xl font-bold text-brand-gold-light" style={{textShadow: '0 0 10px rgba(245, 232, 132, 0.5)'}}>{product.price_customer.toLocaleString('fa-IR')}</span>
              <span className="text-sm text-brand-gold-dark/80 mr-2">تومان</span>
            </div>
            
            <div className="border-t border-brand-blue-sky/20 my-4"></div>

            <h3 className="text-lg lg:text-xl font-bold text-brand-blue-sky mb-4">
              مشخصات فنی
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specifications.map((spec) => (
                <div key={spec.label} className="bg-brand-blue-dark/50 rounded-lg p-3 flex items-start">
                    <CheckCircleIcon className="w-5 h-5 ml-3 text-brand-blue-sky flex-shrink-0 mt-1" />
                    <div>
                        <span className="font-semibold text-brand-gray-light block text-sm">{spec.label}</span>
                        <span className="text-brand-gray text-sm">{spec.value}</span>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;