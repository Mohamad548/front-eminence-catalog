import { useEffect, useState } from 'react';
import { useSelectedCategory } from '@/store/useSelectedCategory';

interface SearchFilterProps {
  categories?: string[];
  onFilter: (category: string, searchTerm: string) => void;
  onClear: () => void;
}

export default function SearchFilter({
  categories = [],
  onFilter,
  onClear,
}: SearchFilterProps) {
  const { selectedCategory, setSelectedCategory } = useSelectedCategory();

  const [category, setCategory] = useState(selectedCategory ?? '');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedCategory !== null && selectedCategory !== category) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    onFilter(category, searchTerm);
  }, [category, searchTerm, onFilter]);

  const handleClear = () => {
    setCategory('');
    setSearchTerm('');
    setSelectedCategory(null); // ریست شدن Zustand
    onClear();
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setCategory(newValue);

    // اگر کاربر دستی مقدار را عوض کرد و با مقدار فعلی Zustand فرق داشت، ریست کن
    if (selectedCategory !== null && newValue !== selectedCategory) {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="bg-white p-4 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center">
      <select
        className="border rounded px-4 py-2 text-sm"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">همه دسته‌ها</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        className="border rounded px-4 py-2 flex-grow text-sm"
        type="text"
        placeholder="جستجو بر اساس نام یا کد..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="bg-gray-200 px-4 py-2 rounded text-sm"
        onClick={handleClear}
        type="button"
      >
        پاک‌سازی
      </button>
    </div>
  );
}
