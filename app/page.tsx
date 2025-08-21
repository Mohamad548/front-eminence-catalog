'use client'; // اضافه کنید در بالای فایل

import { api } from '@/services/api';
import { Product, Category } from '@/types';
import ProductCatalog from '@/components/client/ProductCatalog';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProducts = await api.getProducts();
        const uniqueCategoriesMap = new Map<number, string>();
        fetchedProducts.forEach((p) => {
          if (!uniqueCategoriesMap.has(p.category_id)) {
            uniqueCategoriesMap.set(p.category_id, p.category_name);
          }
        });

        const categories = Array.from(uniqueCategoriesMap.entries()).map(
          ([id, name]) => ({ id, name })
        );

        setProducts(fetchedProducts);
        setCategories(categories);
      } catch (error) {
        console.error('❌ خطا در دریافت اطلاعات از سرور:', error);
      }
    }

    fetchData();
  }, []);

  return <ProductCatalog products={products} categories={categories} />;
}
