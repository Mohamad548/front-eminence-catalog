'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import { SearchIcon } from '@/components/Icons';
import ProductSlider from '@/components/ProductSlider';
import { Product, Category } from '@/types';
import FloatingActions from '@/components/FloatingActions';
import PrintableView from '@/components/PrintableView';

type PriceSortType = 'asc' | 'desc' | null;



interface ProductCatalogProps {
  products: Product[];
  categories: Category[];
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceSort, setPriceSort] = useState<PriceSortType>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
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
        } else { // 'desc'
            return b.price_customer - a.price_customer;
        }
      });
    }

    return result;
  }, [searchTerm, selectedCategory, products, priceSort]);
  
  const handleTogglePrintView = (state: boolean) => {
    if (state) {
        window.scrollTo(0, 0);
    }
    setIsPrinting(state);
  };
  
  if (isPrinting) {
      return <PrintableView products={filteredProducts} onExitPrint={() => handleTogglePrintView(false)} />
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
      />

      <main className="w-full mx-auto">
        {filteredProducts.length > 0 ? (
          <ProductSlider products={filteredProducts} />
        ) : (
          <div className="text-center py-20 px-6 max-w-3xl mx-auto">
            <div className="flex justify-center items-center mx-auto w-20 h-20 bg-brand-slate rounded-full mb-6 border border-brand-blue-sky/20">
              <SearchIcon className="w-10 h-10 text-brand-blue-sky" />
            </div>
            <h2 className="text-2xl font-bold text-brand-gray-light">محصولی یافت نشد</h2>
            <p className="text-brand-gray mt-3 max-w-md mx-auto">ما نتوانستیم محصولی مطابق با جستجو و فیلترهای شما پیدا کنیم. لطفاً دوباره تلاش کنید.</p>
          </div>
        )}
      </main>

  

      <footer className="text-center py-8 mt-4 border-t border-white/10 noprint">
        <p className="text-sm text-brand-gray">
          کاتالوگ محصولات امیننس | طراحی و توسعه توسط محمد محمودی
        </p>
      </footer>
      <FloatingActions onTogglePrintView={handleTogglePrintView} />
    </div>
  );
};

export default ProductCatalog;
