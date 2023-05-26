import { Product } from './product.type';

interface Meal {
  _id: string;
  name: string;
  category: string;
  estimatedCookingTimeMinutes?: number;
  complexity?: string;
  images?: string[];
  videos?: string[];
  stepByStepGuide: string;
  ingredients: Product[];
  nutritionScore: any;
  linkToOriginal: string;
  tags?: string[];
}

export type { Meal };
