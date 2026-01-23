export interface Subcategory {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  subcategories: Subcategory[];
}
