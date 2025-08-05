import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import { SearchIcon } from './components/Icons';
import ProductSlider from './components/ProductSlider';
import { Product, Category } from './types';
import { api } from './services/api';
import FloatingActions from './components/FloatingActions';
import PrintableView from './components/PrintableView';

type PriceSortType = 'asc' | 'desc' | null;

const LoadingScreen: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-brand-blue-dark overflow-hidden">
      <div className="whale-background"></div>
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-brand-blue-sky/50 rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20 + 10}px`,
              animation: `move-particles ${
                Math.random() * 20 + 10
              }s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              // @ts-ignore
              '--x-end': `${Math.random() * 40 - 20}vw`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 animate-fadeIn">
        <div className="relative inline-block p-4">
          <h1
            className="text-5xl md:text-7xl font-extrabold text-white tracking-widest uppercase"
            style={{ textShadow: '0 0 25px rgba(245, 232, 132, 0.7)' }}
          >
            EMINENCE
          </h1>
        </div>
        <p className="text-brand-gray-light text-xl mt-6 font-semibold animate-pulse">
          در حال بارگذاری کاتالوگ...
        </p>
      </div>
    </div>
  );
};

const AITools: React.FC = () => {
  return (
    <div className="py-20 px-4 noprint">
      <div
        className="text-center mb-16 animate-fadeIn"
        style={{ animationDelay: '200ms' }}
      >
        <h2 className="text-4xl font-extrabold text-brand-gray-light">
          Multiple AI Tools Integration
        </h2>
        <p className="text-brand-gray mt-2 max-w-2xl mx-auto">
          Powered by the latest generation of AI to deliver an unparalleled
          digital catalog experience.
        </p>
      </div>
      <div className="relative max-w-sm mx-auto flex items-center justify-center h-64">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-brand-blue-sky/30 to-transparent"></div>
        <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-brand-blue-sky/30 to-transparent"></div>

        <div className="absolute w-32 h-32 bg-brand-slate rounded-full flex items-center justify-center shadow-lg animate-subtle-glow border-2 border-brand-blue-sky/50">
          <div className="w-24 h-24 bg-brand-blue-dark rounded-full flex items-center justify-center">
            <span
              className="text-5xl animate-pulse"
              style={{ filter: `drop-shadow(0 0 10px #64ffda)` }}
            >
              💎
            </span>
          </div>
        </div>

        <div className="absolute w-72 h-72 opacity-80">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 p-4 bg-brand-slate rounded-full shadow-lg border border-brand-blue-sky/20">
            ✨
          </div>
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 p-4 bg-brand-slate rounded-full shadow-lg border border-brand-blue-sky/20">
            S
          </div>
          <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 p-4 bg-brand-slate rounded-full shadow-lg border border-brand-blue-sky/20">
            W
          </div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 p-4 bg-brand-slate rounded-full shadow-lg border border-brand-blue-sky/20">
            🤖
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -left-12 -translate-x-1/2 p-4 bg-brand-slate rounded-full shadow-lg border border-brand-blue-sky/20">
            🔊
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-12 translate-x-1/2 p-4 bg-brand-slate rounded-full shadow-lg border border-brand-blue-sky/20">
            S
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceSort, setPriceSort] = useState<PriceSortType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await api.getProducts();
      setProducts(fetchedProducts);

      const uniqueCategoriesMap = new Map<number, string>();
      fetchedProducts.forEach((p) => {
        if (!uniqueCategoriesMap.has(p.category_id)) {
          uniqueCategoriesMap.set(p.category_id, p.category_name);
        }
      });
      const dynamicCategories = Array.from(uniqueCategoriesMap.entries()).map(
        ([id, name]) => ({ id, name })
      );
      setCategories(dynamicCategories);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('متاسفانه در دریافت اطلاعات از سرور مشکلی پیش آمد.');
    } finally {
      // Simulate a longer load time to enjoy the animation
      setTimeout(() => setLoading(false), 1500);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === null || product.category_id === selectedCategory;
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
        } else {
          // 'desc'
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

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-blue-dark">
        <div className="text-center p-8 bg-brand-slate rounded-lg shadow-lg max-w-sm mx-auto border border-red-500/30">
          <h2 className="text-2xl font-bold text-red-400">
            خطا در ارتباط با سرور
          </h2>
          <p className="text-brand-gray-light mt-3">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-6 px-6 py-2 bg-brand-blue-sky text-brand-blue-dark font-bold rounded-lg hover:bg-white transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  if (isPrinting) {
    return (
      <PrintableView
        products={products}
        onExitPrint={() => handleTogglePrintView(false)}
      />
    );
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
            <h2 className="text-2xl font-bold text-brand-gray-light">
              محصولی یافت نشد
            </h2>
            <p className="text-brand-gray mt-3 max-w-md mx-auto">
              ما نتوانستیم محصولی مطابق با جستجو و فیلترهای شما پیدا کنیم. لطفاً
              دوباره تلاش کنید.
            </p>
          </div>
        )}
      </main>

      <AITools />

      <footer className="text-center py-12 mt-4 border-t h-12 border-white/10 noprint">
        <p className="text-sm text-brand-gray">
          کاتالوگ محصولات امیننس | طراحی و توسعه توسط محمد محمودی
        </p>
      </footer>
      <FloatingActions onTogglePrintView={handleTogglePrintView} />
    </div>
  );
};

export default App;
