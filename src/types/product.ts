// src/types/product.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating?: number;
  ingredients?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  deliveryTime?: string;
  category: 'corporate' | 'festive' | 'birthday' | 'catering';
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  ingredients: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  deliveryTime: string;
  category: 'corporate' | 'festive' | 'birthday' | 'catering';
  inStock: boolean;
  featured: boolean;
}