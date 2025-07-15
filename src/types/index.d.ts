// types/index.d.ts
export interface Product {
  [x: string]: any;
  id: string;
  name: string;
  category: string;
  image: string; // این برای ایموجی محصول استفاده می‌شود
  description: string;
  pricePartner2: string;
  pricePartner1: string;
  priceRegular: string;
}