export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  discount: number;
  inStock: boolean;
  ageRecommendation: string;
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  bgColor?: string;
  subcategories?: {
    id: string;
    name: string;
    slug: string;
  }[];
}