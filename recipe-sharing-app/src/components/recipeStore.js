import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [], // Stores all recipes
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, { ...newRecipe, id: Date.now() }] 
    })),
  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;