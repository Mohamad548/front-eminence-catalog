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
  priceCustomer: number;
  description: string;
  category?: Category;
  image?: string;
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
  category_name?: string;
  // اگر میخوای کلیدهای اضافی با مقدار string داشته باشی:
  [key: string]: number | string | Category | undefined;
}
