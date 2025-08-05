import { api } from '@/services/api';
import { Product, Category } from '@/types';
import ProductCatalog from '@/components/client/ProductCatalog';

// تابع دریافت اطلاعات از API با fallback در صورت خطا
async function getCatalogData(): Promise<{
  products: Product[];
  categories: Category[];
}> {
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

    return { products: fetchedProducts, categories };
  } catch (error) {
    console.error('❌ خطا در دریافت اطلاعات از سرور:', error);

    // جلوگیری از throw برای جلوگیری از کرش در مرورگر
    return {
      products: [],
      categories: [],
    };
  }
}

// صفحه اصلی کاتالوگ
export default async function HomePage() {
  const { products, categories } = await getCatalogData();

  return (
    <ProductCatalog products={products} categories={categories} />
  );
}
