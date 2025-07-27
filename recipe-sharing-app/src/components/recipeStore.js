import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [
    { id: 1, title: 'Pasta Carbonara', description: 'Classic Italian pasta dish' },
    { id: 2, title: 'Chicken Curry', description: 'Spicy chicken curry' }
  ],
  // Existing actions from current task
  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, { ...recipe, id: Date.now() }]
  })),
  updateRecipe: (id, updatedRecipe) => 
    set((state) => ({
      recipes: state.recipes.map(recipe => 
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    })),
  deleteRecipe: (id) => 
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
  // New action for previous task requirement
  setRecipes: (newRecipes) => set({ recipes: newRecipes })
}));

export default useRecipeStore;