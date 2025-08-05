import React from 'react';
import type { Category } from '@/types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';

type PriceSortType = 'asc' | 'desc' | null;

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term:string) => void;
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
  priceSort: PriceSortType;
  onPriceSortChange: (value: PriceSortType) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onSelectCategory,
  priceSort,
  onPriceSortChange
}) => {
  return (
    <header className="bg-brand-blue/50 backdrop-blur-md sticky top-0 z-20 py-2 mb-3 px-4 md:px-8 border-b border-white/10 shadow-lg noprint">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-xl md:text-4xl font-extrabold text-brand-gray-light tracking-tight">
            کاتالوگ محصولات امیننس
          </h1>
          {/* <p className="text-sm text-brand-blue-sky/80 mt-1.5 font-normal tracking-wider">
            Eminence Product Catalog
          </p> */}
          <p className="text-sm text-brand-blue-sky/80 mt-1.5 font-normal tracking-wider">
            ۴۰ سال اعتبار، کیفیت تضمینی
          </p>
        </div>
        <div className="space-y-5">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <div className="flex  flex-row flex-wrap items-center justify-center gap-x-6 gap-y-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
            <PriceFilter 
              priceSort={priceSort}
              onPriceSortChange={onPriceSortChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
