import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../../url';

// 🧾 تایپ محصول و دسته‌بندی
export interface Product {
  [x: string]: string;
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
}
export interface Category {
  id: number;
  name: string;
}

// ✅ تعریف نوع سفارشی با متد اضافه
interface CustomApiInstance extends AxiosInstance {
  getProducts: () => Promise<Product[]>;
}

// 🔧 ساخت نمونه axios با متد اضافه‌شده
const baseApi = axios.create({
  baseURL: BASE_URL,
}) as CustomApiInstance;

// ✳️ افزودن متد به api
baseApi.getProducts = async function () {
  const response = await this.get('api/products');
  return response.data;
};

export const api = baseApi;
