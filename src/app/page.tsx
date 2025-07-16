'use client';

import { useCallback, useEffect, useState } from 'react';
import SearchFilter from '@/components/search-filter';
import ProductCard from '@/components/product-card';
import { api } from '@/api/inedex';
import { Product } from '@/types';
import { useToast } from '@/context/ToastContext';
import PrintTable from '@/components/PrintTable';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();
console.log(products)
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const dataFromApi = await api.getProducts();

      // داده‌ها را به نوع مورد نظر تبدیل کن
      const data: Product[] = dataFromApi.map((item) => ({
        ...item,
        category_name: item.category_name|| '1', // فرض مثال
      }));

      setProducts(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast('خطا در دریافت محصولات', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilter = useCallback(
    (category: string, searchTerm: string) => {
      const lowerSearch = searchTerm.trim().toLowerCase();

      const newFiltered = products.filter((product) => {
        const matchCategory = !category || product.category_name === category;
        const matchSearch =
          !lowerSearch ||
          product.name.toLowerCase().includes(lowerSearch) ||
          product.description.toLowerCase().includes(lowerSearch) ||
          product.code.toLowerCase().includes(lowerSearch);
        return matchCategory && matchSearch;
      });

      setFilteredProducts(newFiltered);
    },
    [products]
  );

  const handleClearFilters = useCallback(() => {
    setFilteredProducts(products);
  }, [products]);

  // اصلاح تعریف categories که فقط رشته‌ها باشه
  const categories = Array.from(
    new Set(
      products
        .map((p) => p.category_name)
        .filter((c): c is string => typeof c === 'string' && c.trim() !== '')
    )
  );

  const exportProductsToPrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header - فقط در حالت نمایش */}
      <div className="gradient-bg text-white p-6 text-center print:hidden">
        <h1 className="text-2xl font-bold mb-2">کاتالوگ محصولات امیننس</h1>
        <p className="text-sm opacity-90">Eminence Product Catalog</p>
        <div className="mt-3 text-xs opacity-80">
          40 سال اعتبار • کیفیت تضمینی
        </div>
      </div>

      {/* Filters - فقط در حالت نمایش */}
      <div className="print:hidden">
        <SearchFilter
          categories={categories}
          onFilter={handleFilter}
          onClear={handleClearFilters}
        />
      </div>

      {/* لیست محصولات */}
      <div
        id="productsList"
        className="p-4 space-y-4 flex-grow overflow-auto print:hidden"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm">در حال بارگذاری محصولات...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <p>محصولی یافت نشد</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* دکمه چاپ - فقط در حالت نمایش */}
      <div className=" p-2 text-center btn-primary bg-white print:hidden  rounded-b-full fixed left-3 bottom-0">
        <button
          onClick={exportProductsToPrint}
          className=" text-white  flex flex-col rounded-lg font-medium text-lg"
        ><span>📄</span>
          <span className='text-xs font-sans'>چاپ</span> 
        </button>
      </div>
      {/* جدول چاپ - فقط در حالت چاپ */}
      <div className="hidden print:block">
        <PrintTable products={filteredProducts} />
      </div>
    </div>
  );
}
