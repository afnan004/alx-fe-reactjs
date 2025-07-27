import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [], // Must initialize with empty array
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
}));

export default useRecipeStore; // Must export default