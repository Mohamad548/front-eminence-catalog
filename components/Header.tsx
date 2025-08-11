import React from 'react';
import type { Category } from '@/types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import { ViewMode } from './client/ProductCatalog';

type PriceSortType = 'asc' | 'desc' | null;

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
  priceSort: PriceSortType;
  onPriceSortChange: (value: PriceSortType) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const SliderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="3" y1="14" x2="21" y2="14" />
  </svg>
);

const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="3" cy="6" r="1" />
    <circle cx="3" cy="12" r="1" />
    <circle cx="3" cy="18" r="1" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onSelectCategory,
  priceSort,
  onPriceSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <header className="bg-brand-blue/50 backdrop-blur-md sticky top-0 z-20 py-2 mb-3 px-4 md:px-8 border-b border-white/10 shadow-lg noprint">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-xl md:text-4xl font-extrabold text-brand-gray-light tracking-tight">
            کاتالوگ محصولات امیننس
          </h1>
          <p className="text-sm text-brand-blue-sky/80 mt-1.5 font-normal tracking-wider">
            ۴۰ سال اعتبار، کیفیت تضمینی
          </p>
        </div>
        <div className="space-y-5">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-1">
            {/* <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            /> */}
            <PriceFilter
              priceSort={priceSort}
              onPriceSortChange={onPriceSortChange}
            />

            {/* دکمه‌های تغییر حالت نمایش */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => onViewModeChange('slider')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition 
                  ${
                    viewMode === 'slider'
                      ? 'bg-brand-blue-sky text-brand-blue-dark shadow-glow-cyan'
                      : 'bg-brand-slate text-brand-gray-light hover:bg-brand-blue-slate hover:text-brand-blue-light'
                  }
                `}
                aria-label="نمایش اسلایدر"
                type="button"
              >
                <SliderIcon className="w-5 h-5" />
                <span>اسلایدر</span>
              </button>

              <button
                onClick={() => onViewModeChange('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition 
                  ${
                    viewMode === 'list'
                      ? 'bg-brand-blue-sky text-brand-blue-dark shadow-glow-cyan'
                      : 'bg-brand-slate text-brand-gray-light hover:bg-brand-blue-slate hover:text-brand-blue-light'
                  }
                `}
                aria-label="نمایش کارت‌ها"
                type="button"
              >
                <ListIcon className="w-5 h-5" />
                <span>لیست</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
