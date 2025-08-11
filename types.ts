
export interface Product {
  voltage_range: any;
  dimensions: any;
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
  'بازه ولتاژی'?: string;
  'ابعاد'?: string;
}



export interface Category {
  id: number;
  name: string;
}
