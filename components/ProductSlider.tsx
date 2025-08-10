'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, EffectFlip } from 'swiper/modules';
import type { Product } from '@/types';
import ProductCard from './ProductCard';
import ImageModal from './ImageModal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-flip';

interface ProductSliderProps {
  products: Product[];
  onImageClick: (product: Product) => void;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, onImageClick }) => {
  // حذف selectedProduct از اینجا (کنترل در والد است)
  return (
    <div className="w-full relative noprint">
      <Swiper
        modules={[Navigation, A11y, EffectFlip]}
        spaceBetween={0}
        slidesPerView={1}
        grabCursor={true}
        loop={products.length > 1}
        simulateTouch={true}
        touchRatio={1}
        touchStartPreventDefault={false}
        navigation
        effect="slide"
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} onImageClick={onImageClick} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
