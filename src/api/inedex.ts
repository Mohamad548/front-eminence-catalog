import axios, { AxiosInstance } from 'axios';
import { Product } from '@/types';
import { BASE_URL } from '../../url';


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
