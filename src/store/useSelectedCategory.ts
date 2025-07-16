// store/useSelectedCategory.ts
import { create } from 'zustand';

interface CategoryState {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useSelectedCategory = create<CategoryState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
