import axios, { AxiosInstance } from 'axios';
import type { Product } from '@/types';
import { BASE_URL } from './config';

interface CustomApiInstance extends AxiosInstance {
  getProducts: () => Promise<Product[]>;
}

const baseApi = axios.create({
  baseURL: BASE_URL,
});

const api = baseApi as CustomApiInstance;
api.getProducts = async () => {
  const response = await baseApi.get<Product[]>('api/products');
  return response.data;
};

export { api };
