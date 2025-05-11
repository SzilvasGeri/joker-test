import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface RecentlyViewedContextType {
  items: Product[];
  addItem: (product: Product) => void;
  clearItems: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};

export const RecentlyViewedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const MAX_ITEMS = 8;

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recently viewed from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems(current => {
      const filtered = current.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <RecentlyViewedContext.Provider value={{ items, addItem, clearItems }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};