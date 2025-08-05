import { api } from '@/services/api';
import { Product, Category } from '@/types';
import ProductCatalog from '@/components/client/ProductCatalog';

async function getCatalogData(): Promise<{ products: Product[], categories: Category[] }> {
  try {
    const fetchedProducts = await api.getProducts();
    
    const uniqueCategoriesMap = new Map<number, string>();
    fetchedProducts.forEach(p => {
      if (!uniqueCategoriesMap.has(p.category_id)) {
        uniqueCategoriesMap.set(p.category_id, p.category_name);
      }
    });
    const categories = Array.from(uniqueCategoriesMap.entries()).map(([id, name]) => ({ id, name }));
    
    return { products: fetchedProducts, categories };
  } catch (error) {
    console.error("Failed to fetch initial data:", error);
    // In case of error, throw it to be caught by Next.js's error boundary
    throw new Error("متاسفانه در دریافت اطلاعات از سرور مشکلی پیش آمد. لطفا بعدا دوباره تلاش کنید.");
  }
}

export default async function HomePage() {
  const { products, categories } = await getCatalogData();

  return <ProductCatalog products={products} categories={categories} />;
}
