'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import { SearchIcon } from '@/components/Icons';
import ProductSlider from '@/components/ProductSlider';
import { Product, Category } from '@/types';
import FloatingActions from '@/components/FloatingActions';
import PrintableView from '@/components/PrintableView';
import ProductCard from '../ProductCard';
import ImageModal from '../ImageModal';

type PriceSortType = 'asc' | 'desc' | null;
export type ViewMode = 'slider' | 'list';

interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  categories,
}) => {
  // State ها در یکجا
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceSort, setPriceSort] = useState<PriceSortType>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('slider');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const stabilizerProducts = useMemo(() => {
    return products.filter((product) => product.category_name === 'استابلایزر');
  }, [products]);
  // فیلتر و مرتب سازی محصولات
  const filteredProducts = useMemo(() => {
    let result = stabilizerProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === null || product.category_id === selectedCategory;
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      if (!normalizedSearchTerm) {
        return matchesCategory;
      }
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearchTerm) ||
        product.code.toLowerCase().includes(normalizedSearchTerm);
      return matchesCategory && matchesSearch;
    });

    if (priceSort) {
      result = [...result].sort((a, b) => {
        if (priceSort === 'asc') {
          return a.price_customer - b.price_customer;
        } else {
          return b.price_customer - a.price_customer;
        }
      });
    }

    return result;
  }, [searchTerm, selectedCategory, products, priceSort]);

  // هندل چاپ
  const handleTogglePrintView = (state: boolean) => {
    if (state) {
      window.scrollTo(0, 0);
    }
    setIsPrinting(state);
  };

  // هندل کلیک عکس (باز کردن مودال)
  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // اگر در حالت چاپ هستیم، نمایش PrintableView
  if (isPrinting) {
    return (
      <PrintableView
        products={filteredProducts}
        onExitPrint={() => handleTogglePrintView(false)}
      />
    );
  }

  return (
    <div className="bg-brand-blue-dark min-h-screen font-sans">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        priceSort={priceSort}
        onPriceSortChange={setPriceSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="w-full mx-auto px-4">
        {stabilizerProducts.length > 0 ? (
          viewMode === 'slider' ? (
            <ProductSlider
              products={filteredProducts}
              onImageClick={handleImageClick}
            />
          ) : (
            <div className="flex flex-col space-y-6 py-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onImageClick={handleImageClick}
                  className=""
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 px-6 max-w-3xl mx-auto">
            <div className="flex justify-center items-center mx-auto w-20 h-20 bg-brand-slate rounded-full mb-6 border border-brand-blue-sky/20">
              <SearchIcon className="w-10 h-10 text-brand-blue-sky" />
            </div>
            <h2 className="text-2xl font-bold text-brand-gray-light">
              محصولی یافت نشد
            </h2>
            <p className="text-brand-gray mt-3 max-w-md mx-auto">
              ما نتوانستیم محصولی مطابق با جستجو و فیلترهای شما پیدا کنیم. لطفاً
              دوباره تلاش کنید.
            </p>
          </div>
        )}
      </main>

      <footer className="text-center py-8 mt-4 border-t border-white/10 noprint">
        <p className="text-xs px-2 text-brand-gray h-20">
          کاتالوگ محصولات امیننس | طراحی و توسعه توسط محمد محمودی
        </p>
      </footer>

      <FloatingActions onTogglePrintView={handleTogglePrintView} />

      {/* مودال نمایش تصویر */}
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

export default ProductCatalog;
