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
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
console.log(products)
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
            <ProductCard product={product} onImageClick={handleImageClick} />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedProduct && (
        <ImageModal
          isOpen={!!selectedProduct}
          onClose={closeModal}
         imageUrl={[selectedProduct.image]}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
};

export default ProductSlider;
