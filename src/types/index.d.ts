// types/index.d.ts
export interface Category {
    id: number;
    name?: string;
}

export interface Product {
  id: number;
  image: string;
  code: string;
  name: string;
  categoryId: number;
  price1: number;
  price2: number;
  priceCustomer: number;
  description: string;
  category?: Category;

  // اگر میخوای کلیدهای اضافی با مقدار string داشته باشی:
  [key: string]: number | string | Category | undefined;
}