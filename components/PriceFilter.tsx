import React from 'react';

type PriceSortType = 'asc' | 'desc' | null;

interface PriceFilterProps {
  priceSort: PriceSortType;
  onPriceSortChange: (value: PriceSortType) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ priceSort, onPriceSortChange }) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onPriceSortChange(value === 'default' ? null : (value as 'asc' | 'desc'));
  };

  const baseStyle = "whitespace-nowrap cursor-pointer pl-4 pr-8 py-2 text-sm font-medium transition-all duration-300 ease-in-out border-b-2";
  const selectStyle = "bg-transparent text-brand-gray-light border-transparent hover:text-white hover:border-brand-blue-sky/50 focus:outline-none focus:ring-0 focus:border-brand-blue-sky";

  return (
    <div className="relative">
      <select
        value={priceSort || 'default'}
        onChange={handleSelectChange}
        className={`${baseStyle} ${selectStyle} appearance-none`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238892b0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'left 0.1rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em',
        }}
        aria-label="فیلتر بر اساس قیمت"
      >
        <option value="default" className="bg-brand-slate text-white">فیلتر براساس قیمت</option>
        <option value="asc" className="bg-brand-slate text-white">ارزان‌ترین</option>
        <option value="desc" className="bg-brand-slate text-white">گران‌ترین</option>
      </select>
    </div>
  );
};

export default PriceFilter;
