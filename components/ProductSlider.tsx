'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, EffectFlip } from 'swiper/modules';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ImageModal from './ImageModal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-flip';

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Key برای جلوگیری از باگ هنگام فیلتر مجدد
  const swiperKey = products.map(p => p.id).join('-');

  return (
    <div className="w-full relative">
      <Swiper
        key={swiperKey}
        modules={[Navigation, A11y, EffectFlip]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        effect="flip"
        grabCursor={true}
        loop={products.length > 1}
        className="w-full"
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <div className="w-full h-full flex justify-center items-center">
              <ProductCard product={product} onImageClick={handleImageClick} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedProduct && (
        <ImageModal
          isOpen={!!selectedProduct}
          onClose={closeModal}
          imageUrl={selectedProduct.image}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
};

export default ProductSlider;
