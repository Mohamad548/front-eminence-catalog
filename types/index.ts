
export interface Product {
  id: number;
  image: string;
  code: string;
  name: string;
  category_id: number;
  length: number;
  width: number;
  price_customer: number;
  description: string;
  height: number;
  weight: string;
  category_name: string;
}

export interface Category {
  id: number;
  name: string;
}
