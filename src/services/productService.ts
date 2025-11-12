// src/services/productService.ts

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';
import { Product, ProductFormData } from '../types/product';

const PRODUCTS_COLLECTION = 'products';

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(productsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate()
  })) as Product[];
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(
    productsRef,
    where('category', '==', category),
    where('inStock', '==', true)
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate()
  })) as Product[];
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  const q = query(
    productsRef,
    where('featured', '==', true),
    where('inStock', '==', true)
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate()
  })) as Product[];
};

// Get single product
export const getProduct = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate()
    } as Product;
  }
  return null;
};

// Add new product
export const addProduct = async (productData: ProductFormData): Promise<string> => {
  const productsRef = collection(db, PRODUCTS_COLLECTION);
  
  const ingredients = productData.ingredients
    .split(',')
    .map(i => i.trim())
    .filter(i => i);
  
  const newProduct = {
    name: productData.name,
    price: productData.price,
    image: productData.image,
    description: productData.description,
    rating: productData.rating,
    ingredients,
    nutritionalInfo: {
      calories: productData.calories,
      protein: productData.protein,
      carbs: productData.carbs,
      fat: productData.fat
    },
    deliveryTime: productData.deliveryTime,
    category: productData.category,
    inStock: productData.inStock,
    featured: productData.featured,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  };
  
  const docRef = await addDoc(productsRef, newProduct);
  return docRef.id;
};

// Update product
export const updateProduct = async (
  id: string,
  productData: Partial<ProductFormData>
): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  
  const updateData: any = {
    ...productData,
    updatedAt: Timestamp.now()
  };
  
  if (productData.ingredients) {
    updateData.ingredients = productData.ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i);
  }
  
  if (productData.calories || productData.protein || productData.carbs || productData.fat) {
    updateData.nutritionalInfo = {
      calories: productData.calories,
      protein: productData.protein,
      carbs: productData.carbs,
      fat: productData.fat
    };
  }
  
  await updateDoc(docRef, updateData);
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
};

// Upload image
export const uploadProductImage = async (file: File): Promise<string> => {
  const timestamp = Date.now();
  const fileName = `products/${timestamp}_${file.name}`;
  const storageRef = ref(storage, fileName);
  
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return downloadURL;
};

// Toggle stock status
export const toggleStock = async (id: string, inStock: boolean): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    inStock,
    updatedAt: Timestamp.now()
  });
};

// Toggle featured status
export const toggleFeatured = async (id: string, featured: boolean): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    featured,
    updatedAt: Timestamp.now()
  });
};