import React from 'react';
import { SearchIcon } from './Icons';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="relative  w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="جستجوی نام یا کد محصول..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-3 pr-9 pl-4 text-xs text-brand-gray-light bg-brand-slate/80 border border-brand-blue-sky/20 rounded-full focus:ring-2 focus:ring-brand-blue-sky focus:border-brand-blue-sky transition-all duration-300 ease-in-out placeholder-brand-gray shadow-lg"
        aria-label="جستجوی محصول"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <SearchIcon className="w-4 h-4 text-brand-gray group-focus-within:text-brand-blue-sky" />
      </div>
    </div>
  );
};

export default SearchBar;
